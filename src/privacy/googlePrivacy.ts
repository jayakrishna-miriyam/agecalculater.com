// This is an adapter to Google's certified CMP, not a consent platform itself.
// It never creates consent strings, grants consent, or loads advertising tags.
type TcData = { gdprApplies?: boolean; listenerId?: number };
type TcCallback = (data: TcData | null, success: boolean) => void;
type TcfApi = (command: string, version: number, callback: TcCallback | (() => void), parameter?: number) => void;
type GoogleFc = {
    callbackQueue?: { push: (callback: Record<string, () => void>) => unknown };
    showRevocationMessage?: () => void;
    usstatesoptout?: { getInitialUsStatesOptOutStatus?: () => number };
};

declare global {
    interface Window {
        googlefc?: GoogleFc;
        __tcfapi?: TcfApi;
    }
}

export type PrivacyAvailability = { eu: boolean; us: boolean; ready: boolean };
export const initialPrivacyAvailability: PrivacyAvailability = { eu: false, us: false, ready: false };

export function observeGooglePrivacy(onChange: (state: PrivacyAvailability) => void): () => void {
    const fc = window.googlefc ??= {};
    const queue = fc.callbackQueue ??= [];
    let active = true;
    let listenerId: number | undefined;
    let tcf: TcfApi | undefined;
    let state = { ...initialPrivacyAvailability };
    const update = (changes: Partial<PrivacyAvailability>) => {
        if (!active) return;
        state = { ...state, ...changes };
        onChange(state);
    };
    const removeListener = (id: number) => {
        try { tcf?.('removeEventListener', 0, () => {}, id); } catch { /* CMP may have unloaded. */ }
    };

    queue.push({ CONSENT_API_READY: () => {
        if (!active) return;
        update({ ready: true });
        tcf = window.__tcfapi;
        try {
            tcf?.('addEventListener', 0, (data, success) => {
                if (data?.listenerId !== undefined) {
                    listenerId = data.listenerId;
                    if (!active) { removeListener(listenerId); return; }
                }
                // Readiness and regional applicability are NOT evidence of consent.
                update({ eu: success === true && data?.gdprApplies === true && typeof window.googlefc?.showRevocationMessage === 'function' });
            });
        } catch { update({ eu: false }); }
    } });
    queue.push({ INITIAL_US_STATES_OPT_OUT_DATA_READY: () => {
        if (!active) return;
        try {
            const status = window.googlefc?.usstatesoptout?.getInitialUsStatesOptOutStatus?.();
            // Used only to describe availability, never as the current opt-out decision.
            // Keep Google's automatic Do Not Sell or Share link; do not override it.
            update({ ready: true, us: status === 2 || status === 3 });
        } catch { update({ us: false }); }
    } });
    return () => {
        active = false;
        if (listenerId !== undefined) removeListener(listenerId);
    };
}

export function reopenGooglePrivacy(): Promise<boolean> {
    return new Promise(resolve => {
        const fc = window.googlefc;
        if (!fc?.callbackQueue || typeof fc.showRevocationMessage !== 'function') { resolve(false); return; }
        let finished = false;
        const finish = (result: boolean) => {
            if (finished) return;
            finished = true;
            clearTimeout(timeout);
            resolve(result);
        };
        const timeout = window.setTimeout(() => finish(false), 3000);
        try {
            fc.callbackQueue.push({ CONSENT_API_READY: () => {
                if (finished) return; // Never open a delayed dialog after reporting failure.
                try {
                    if (typeof window.googlefc?.showRevocationMessage !== 'function') { finish(false); return; }
                    window.googlefc.showRevocationMessage();
                    finish(true); // The request ran; only the CMP can confirm a saved choice.
                } catch { finish(false); }
            } });
        } catch { finish(false); }
    });
}
