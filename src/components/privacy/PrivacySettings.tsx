import React, { useEffect, useState } from 'react';
import { Button } from '../ui/Button';
import { initialPrivacyAvailability, observeGooglePrivacy, reopenGooglePrivacy } from '../../privacy/googlePrivacy';

export const PrivacySettings: React.FC = () => {
    const [availability, setAvailability] = useState(initialPrivacyAvailability);
    const [message, setMessage] = useState('');
    const [busy, setBusy] = useState(false);
    useEffect(() => observeGooglePrivacy(setAvailability), []);

    const reopen = async () => {
        setBusy(true);
        setMessage('');
        const requested = await reopenGooglePrivacy();
        setBusy(false);
        setMessage(requested
            ? 'The privacy message has been requested. Review and save your choices in that message. If it does not appear, reload this page and try again.'
            : 'The privacy message could not be opened. No new choice was saved by this control. Reload this page and try again, or contact us for help.');
    };

    return <section id="privacy-settings" className="privacy-settings" aria-labelledby="privacy-settings-title" tabIndex={-1}>
        <h2 id="privacy-settings-title">Privacy and cookie settings</h2>
        <div className="prose-copy">
            <p>This version of AgeCalculater.com does not load advertising or analytics scripts. You can use every calculator without accepting optional tracking. Your light or dark theme preference is stored in your browser.</p>
            <p>If Google privacy messages are available, the controls below let you revisit the choices that apply to you. Opening this page, calculating an age, or following a link does not give consent.</p>
            {availability.eu && <Button variant="outline" onClick={reopen} disabled={busy}>{busy ? 'Opening privacy message…' : 'Change or withdraw consent'}</Button>}
            {availability.us && <p>For US state privacy choices, use Google’s “Do Not Sell or Share My Personal Information” link on this page. It opens the opt-out message and lets you submit your choice.</p>}
            {!availability.eu && !availability.us && <p className="privacy-settings-note">{availability.ready
                ? 'No regional advertising choices are available here for this visit.'
                : 'No advertising consent message is loaded in this version. There are no optional advertising or analytics settings to turn on here.'}</p>}
            <p role="status" aria-live="polite">{message}</p>
            <p>Need help with a privacy choice? <a className="text-link" href="mailto:support.agecalculater@gmail.com?subject=Privacy%20inquiry">Contact us about privacy</a>. For Google’s messages, your choices are managed by Google’s consent platform; this page does not create or store a separate consent record.</p>
            <noscript><p>JavaScript is needed to open an interactive consent message. You can still read this policy and contact us by email.</p></noscript>
        </div>
    </section>;
};
