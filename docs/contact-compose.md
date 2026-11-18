# Contact email drafts

The Contact form now runs entirely in the browser. It validates the same fields
and opens a plain-text draft addressed to `info@unifiedworks.net`.

- Subject: `Unified Works | [selected category in the interface language]`
- Body: translated heading, name, email, organization, job title, telephone,
  inquiry category, entered subject, message, and consent
- Gmail uses URL-encoded `to`, `su`, and `body` parameters
- Mailto uses UTF-8 percent encoding and CRLF-encoded line breaks
- Form values remain in the page after opening a draft, including on failure
- Editing a field removes the stale draft links; submitting rebuilds them
- Switching languages updates prepared draft links and labels

No backend, SMTP, email API, account authorization, API keys, or Vercel
environment variables are needed. The old Resend endpoint, Redis limiter,
server-only environment example, and API-specific tests have been removed.
The existing Vercel SPA fallback remains configured for direct page navigation.

## Browser limitations

The compose tab is opened synchronously from the submit gesture to avoid popup
blocking where possible. Its opener is cleared before navigating to Gmail.
If opening the tab fails, the page attempts `mailto:` immediately.

Gmail web compose links are not a guaranteed mobile integration. On iPhone
Safari, an app redirect, login screen, or mobile Gmail inbox may drop the draft
parameters. The website cannot inspect Gmail after navigation to detect this.
Therefore the form always provides explicit **Open email application** and
**Copy email details** actions after validation, plus an **Open Gmail** link.

Mailto opens the user's configured email handler, which may be Gmail if set as
the default. It cannot guarantee a mail application is installed or configured.
Mail clients impose different URL-length limits and may truncate long messages.
The copy action preserves the complete recipient, subject, and body so the user
can paste them manually. Clipboard access requires a secure browser context and
permission; if denied, the form instructs the user to copy its field values.

Opening a draft does not send email. The user must review and send it in Gmail
or their mail application. The site does not claim delivery or clear the form.
There is no server-side delivery tracking or notification.

```sh
npm run test:contact
npm run lint
npm run build
```

Tests verify URL encoding, field/category mapping, both languages, popup
blocking, navigation failures, and long-message preservation without sending
email. Real Gmail account behavior and installed mail handlers require testing
on the user's device; no test email is sent automatically.
