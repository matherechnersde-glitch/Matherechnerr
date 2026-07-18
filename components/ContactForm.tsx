'use client';

export default function ContactForm() {
  return (
    <form
      className="contact-form"
      onSubmit={(e) => { e.preventDefault(); alert('Vielen Dank! Wir melden uns bald bei Ihnen.'); }}
    >
      <label>
        Ihr Name
        <input type="text" name="name" placeholder="Max Mustermann" autoComplete="name" required />
      </label>
      <label>
        E-Mail-Adresse
        <input type="email" name="email" placeholder="max@beispiel.de" autoComplete="email" required />
      </label>
      <label>
        Betreff
        <input type="text" name="subject" placeholder="z. B. Feedback, Fehlermeldung, Datenschutz" />
      </label>
      <label>
        Ihre Nachricht
        <textarea name="message" placeholder="Schreiben Sie Ihre Nachricht hier..." required />
      </label>
      <button type="submit" className="btn-primary">Nachricht absenden</button>
    </form>
  );
}
