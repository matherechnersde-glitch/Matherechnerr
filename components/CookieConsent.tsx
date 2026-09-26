'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'matherechner-consent-v1';
// Increment this version and update the disclosed providers, purposes and durations whenever optional services change.
const CONSENT_VERSION = 1;
const CONSENT_LIFETIME_MS = 365 * 24 * 60 * 60 * 1000;

type ConsentPreferences = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  version: number;
  savedAt: string;
  expiresAt: string;
};

type ConsentChoice = Pick<ConsentPreferences, 'analytics' | 'marketing'>;

function readPreferences(): ConsentPreferences | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<ConsentPreferences>;
    if (
      parsed.version !== CONSENT_VERSION ||
      parsed.necessary !== true ||
      typeof parsed.analytics !== 'boolean' ||
      typeof parsed.marketing !== 'boolean' ||
      typeof parsed.expiresAt !== 'string' ||
      Date.parse(parsed.expiresAt) <= Date.now()
    ) {
      window.localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return parsed as ConsentPreferences;
  } catch {
    return null;
  }
}

function publishPreferences(preferences: ConsentPreferences) {
  document.documentElement.dataset.consentAnalytics = String(preferences.analytics);
  document.documentElement.dataset.consentMarketing = String(preferences.marketing);
  window.dispatchEvent(new CustomEvent('matherechner:consentchange', { detail: preferences }));
}

export default function CookieConsent() {
  // Render the notice in the initial HTML so it is not inserted late after hydration.
  const [visible, setVisible] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [hasDecision, setHasDecision] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const stored = readPreferences();
    if (stored) {
      setAnalytics(stored.analytics);
      setMarketing(stored.marketing);
      setHasDecision(true);
      setVisible(false);
      publishPreferences(stored);
    }

    const openSettings = () => {
      delete document.documentElement.dataset.consentKnown;
      const current = readPreferences();
      setAnalytics(current?.analytics ?? false);
      setMarketing(current?.marketing ?? false);
      setHasDecision(Boolean(current));
      setShowSettings(true);
      setVisible(true);
    };

    window.addEventListener('matherechner:open-consent', openSettings);
    return () => window.removeEventListener('matherechner:open-consent', openSettings);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      if (showSettings && !hasDecision) {
        setShowSettings(false);
      } else if (hasDecision) {
        setVisible(false);
        setShowSettings(false);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [visible, showSettings, hasDecision]);

  const save = (choice: ConsentChoice) => {
    const now = new Date();
    const preferences: ConsentPreferences = {
      necessary: true,
      analytics: choice.analytics,
      marketing: choice.marketing,
      version: CONSENT_VERSION,
      savedAt: now.toISOString(),
      expiresAt: new Date(now.getTime() + CONSENT_LIFETIME_MS).toISOString(),
    };

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    } catch {
      // The choice still applies for the current page even if storage is unavailable.
    }
    setAnalytics(choice.analytics);
    setMarketing(choice.marketing);
    setHasDecision(true);
    publishPreferences(preferences);
    setVisible(false);
    setShowSettings(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-consent-layer">
      <section
        className={`cookie-consent${showSettings ? ' cookie-consent--settings' : ''}`}
        role="dialog"
        aria-modal="false"
        aria-labelledby="cookie-consent-title"
        aria-describedby="cookie-consent-description"
      >
        <div className="cookie-consent-head">
          <span className="cookie-consent-icon" aria-hidden="true">🍪</span>
          <div>
            <span className="cookie-consent-kicker">Datenschutz</span>
            <h2 id="cookie-consent-title" tabIndex={-1}>
              {showSettings ? 'Cookie-Einstellungen' : 'Ihre Privatsphäre, Ihre Entscheidung'}
            </h2>
          </div>
          {hasDecision && (
            <button
              className="cookie-consent-close"
              type="button"
              onClick={() => { setVisible(false); setShowSettings(false); }}
              aria-label="Cookie-Einstellungen schließen"
            >
              ×
            </button>
          )}
        </div>

        {!showSettings ? (
          <>
            <p id="cookie-consent-description" className="cookie-consent-copy">
              Wir verwenden technisch notwendige lokale Speicherungen für Ihre Einwilligungswahl und den Rechnerverlauf. Optionale Analyse- und Marketingdienste sind derzeit nicht aktiv. Falls sich das ändert, informieren wir Sie konkret und fragen erneut nach Ihrer Einwilligung.
            </p>
            <p className="cookie-consent-links">
              Weitere Informationen finden Sie in unserer <Link href="/datenschutz/" prefetch={false}>Datenschutzerklärung</Link>.
            </p>
            <div className="cookie-consent-actions">
              <button type="button" className="cookie-button cookie-button--primary" onClick={() => save({ analytics: false, marketing: false })}>
                Nur notwendige
              </button>
              <button type="button" className="cookie-button cookie-button--secondary" onClick={() => setShowSettings(true)}>
                Einstellungen
              </button>
              <button type="button" className="cookie-button cookie-button--primary" onClick={() => save({ analytics: true, marketing: true })}>
                Alle akzeptieren
              </button>
            </div>
          </>
        ) : (
          <>
            <p id="cookie-consent-description" className="cookie-consent-copy">
              Wählen Sie selbst. Optionale Kategorien bleiben deaktiviert, bis Sie diese ausdrücklich einschalten. Ihre Auswahl gilt zwölf Monate und kann jederzeit geändert oder widerrufen werden.
            </p>

            <div className="cookie-categories">
              <div className="cookie-category">
                <div>
                  <strong>Technisch notwendig</strong>
                  <p>Speichert Ihre Einwilligungswahl und auf Wunsch den lokalen Rechnerverlauf. Keine Weitergabe an Dritte.</p>
                </div>
                <span className="cookie-required" aria-label="Technisch notwendig, immer aktiv">Immer aktiv</span>
              </div>

              <label className="cookie-category" htmlFor="consent-analytics">
                <div>
                  <strong>Analyse</strong>
                  <p>Derzeit nicht eingesetzt. Vor einer künftigen Reichweitenmessung informieren wir Sie über Anbieter, Zweck und Speicherdauer und fragen erneut.</p>
                </div>
                <span className="cookie-switch">
                  <input id="consent-analytics" type="checkbox" checked={analytics} onChange={(event) => setAnalytics(event.target.checked)} />
                  <span aria-hidden="true" />
                </span>
              </label>

              <label className="cookie-category" htmlFor="consent-marketing">
                <div>
                  <strong>Marketing</strong>
                  <p>Derzeit nicht eingesetzt. Vor künftigen Werbe- oder Profilingdiensten informieren wir Sie über Anbieter, Zweck und Speicherdauer und fragen erneut.</p>
                </div>
                <span className="cookie-switch">
                  <input id="consent-marketing" type="checkbox" checked={marketing} onChange={(event) => setMarketing(event.target.checked)} />
                  <span aria-hidden="true" />
                </span>
              </label>
            </div>

            <p className="cookie-consent-links cookie-consent-links--settings">
              Details zu Speicherdauer, Zweck und Widerruf: <Link href="/datenschutz/" prefetch={false}>Datenschutzerklärung</Link>
            </p>
            <div className="cookie-consent-actions cookie-consent-actions--settings">
              <button type="button" className="cookie-button cookie-button--primary" onClick={() => save({ analytics: false, marketing: false })}>
                Nur notwendige
              </button>
              <button type="button" className="cookie-button cookie-button--primary" onClick={() => save({ analytics, marketing })}>
                Auswahl speichern
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  );
}