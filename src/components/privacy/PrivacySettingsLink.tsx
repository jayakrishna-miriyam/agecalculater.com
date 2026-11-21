import React, { useEffect, useState } from 'react';
import { initialPrivacyAvailability, observeGooglePrivacy, reopenGooglePrivacy } from '../../privacy/googlePrivacy';

export const PrivacySettingsLink: React.FC = () => {
    const [availability, setAvailability] = useState(initialPrivacyAvailability);
    const [failed, setFailed] = useState(false);
    const [busy, setBusy] = useState(false);
    useEffect(() => observeGooglePrivacy(setAvailability), []);
    return <div className="footer-privacy">
        <a href="/privacy-policy#privacy-settings" className="text-link" aria-busy={busy || undefined} onClick={async event => {
            // Native navigation remains available without JS, without the CMP,
            // and for modified clicks. EU visitors can reopen on their current page.
            if (!availability.eu || event.button !== 0 || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
            event.preventDefault();
            if (busy) return;
            setBusy(true);
            setFailed(false);
            setFailed(!await reopenGooglePrivacy());
            setBusy(false);
        }}>Privacy and cookie settings</a>
        {failed && <p role="status">The privacy message could not be opened. <a href="/privacy-policy#privacy-settings" className="text-link">Visit privacy settings for help</a>.</p>}
    </div>;
};
