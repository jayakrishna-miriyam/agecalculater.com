import test from 'node:test';
import assert from 'node:assert/strict';
import { observeGooglePrivacy, reopenGooglePrivacy } from '../../src/privacy/googlePrivacy.ts';

test('CMP readiness never grants consent; region controls and listener cleanup follow the CMP', () => {
    const callbacks = [];
    const states = [];
    let tcListener;
    let removed;
    globalThis.window = {
        googlefc: { callbackQueue: callbacks, showRevocationMessage() {}, usstatesoptout: { getInitialUsStatesOptOutStatus: () => 2 } },
        __tcfapi(command, version, callback, id) {
            assert.equal(version, 0);
            if (command === 'addEventListener') tcListener = callback;
            if (command === 'removeEventListener') removed = id;
        },
    };
    const stop = observeGooglePrivacy(state => states.push(state));
    callbacks[0].CONSENT_API_READY();
    assert.deepEqual(states.at(-1), { ready: true, eu: false, us: false });
    tcListener({ gdprApplies: true, listenerId: 8 }, true);
    assert.equal(states.at(-1).eu, true);
    tcListener({ gdprApplies: false, listenerId: 8 }, true);
    assert.equal(states.at(-1).eu, false);
    tcListener({ gdprApplies: true, listenerId: 8 }, false);
    assert.equal(states.at(-1).eu, false);
    callbacks[1].INITIAL_US_STATES_OPT_OUT_DATA_READY();
    assert.equal(states.at(-1).us, true);
    assert.equal(window.googlefc.usstatesoptout.overrideDnsLink, undefined, 'keep the certified CMP US link');
    stop();
    assert.equal(removed, 8);
    const count = states.length;
    tcListener({ gdprApplies: true, listenerId: 8 }, true);
    assert.equal(states.length, count, 'unmounted observer stays inactive');
    delete globalThis.window;
});

test('missing, throwing, and delayed CMP APIs cannot report a saved consent choice', async () => {
    globalThis.window = { setTimeout: (callback) => setTimeout(callback, 10) };
    assert.equal(await reopenGooglePrivacy(), false);
    let calls = 0;
    let pending;
    window.googlefc = {
        showRevocationMessage: () => { calls++; },
        callbackQueue: { push: entry => { pending = entry.CONSENT_API_READY; } },
    };
    assert.equal(await reopenGooglePrivacy(), false, 'timeout');
    pending();
    assert.equal(calls, 0, 'timed-out callbacks cannot open a late dialog');
    window.googlefc.callbackQueue.push = entry => entry.CONSENT_API_READY();
    assert.equal(await reopenGooglePrivacy(), true);
    assert.equal(calls, 1);
    window.googlefc.showRevocationMessage = () => { throw new Error('blocked'); };
    assert.equal(await reopenGooglePrivacy(), false);
    delete globalThis.window;
});

test('late CMP availability after observer disposal adds no listeners', () => {
    globalThis.window = {};
    let count = 0;
    const stop = observeGooglePrivacy(() => count++);
    stop();
    window.googlefc.callbackQueue.forEach(entry => Object.values(entry).forEach(callback => callback()));
    assert.equal(count, 0);
    delete globalThis.window;
});
