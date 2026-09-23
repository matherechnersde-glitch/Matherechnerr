'use client';

export default function CookieSettingsButton() {
  return (
    <button
      type="button"
      className="footer-cookie-settings"
      onClick={() => window.dispatchEvent(new Event('matherechner:open-consent'))}
    >
      Cookie-Einstellungen
    </button>
  );
}