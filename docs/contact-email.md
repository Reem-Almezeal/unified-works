# Contact email delivery

The existing Contact form posts JSON to `/api/contact`. The Vercel Node.js
Function validates it, checks shared rate limits in Upstash Redis, and sends
through the Resend REST API. No additional npm dependencies are required.

The recipient is fixed in server code to **info@unifiedworks.net**. Client input
cannot choose recipients, From, or email headers. The validated sender email is
used as Reply-To. Both plain-text and escaped HTML include all existing fields,
the category, consent, UTC submission time, and Saudi Arabia local time.

## Required configuration

In **Vercel → Project → Settings → Environment Variables**, configure these
server-only values for Production. Configure separate Preview values if testing
preview deployments, and redeploy after changes.

| Variable | Value |
| --- | --- |
| `RESEND_API_KEY` | A Resend sending API key, restricted to the verified sending domain where possible |
| `CONTACT_FROM_EMAIL` | A raw sender address on the domain verified in Resend, without a display name |
| `CONTACT_ALLOWED_ORIGINS` | Comma-separated exact HTTPS origins, for example `https://unifiedworks.net,https://www.unifiedworks.net` |
| `UPSTASH_REDIS_REST_URL` | The HTTPS REST URL of the Upstash Redis database |
| `UPSTASH_REDIS_REST_TOKEN` | Its read/write REST token, not a read-only token |

Do **not** prefix secrets with `VITE_`. No frontend environment variable is
needed. The old `VITE_CONTACT_API_URL` is no longer used. `.env.example` documents
the variables; `.env`, `.env.*` (except the example), and `.vercel` are ignored.
Never put actual credentials in the example file or commit them.

No email provider, credentials, or Redis database was configured in the checked
project/environment. The endpoint returns a service-unavailable error until all
five variables are configured. It also refuses email delivery if Redis is down.

## Sender domain and DNS

1. Add a sending domain you control in [Resend Domains](https://resend.com/docs/dashboard/domains/introduction).
   A dedicated subdomain such as `notifications.unifiedworks.net` can isolate
   transactional sending from the existing mailbox service; this is an example,
   not a domain already configured by this implementation.
2. Obtain the exact DNS names, types, priorities, and values from the Resend
   dashboard. Add its required DKIM and SPF/return-path verification records
   (including return-path MX if requested). Verify the domain in Resend.
3. Set `CONTACT_FROM_EMAIL` to an address on that verified domain. The function
   adds the `Unified Works` display name server-side.
4. Preserve the existing root-domain mailbox MX records for `info@unifiedworks.net`.
   Do not enable Resend inbound receiving or replace existing mailbox records
   merely to enable outbound sending. Do not add a second SPF record at the same
   DNS name; coordinate any required changes with the domain administrator.
5. Review existing DMARC alignment with the domain administrator if needed.

No DNS records have been read, changed, or invented by this implementation.
Resend is the sender; it does not create or provision the destination inbox.
Ensure `info@unifiedworks.net` is an active mailbox.

## Abuse controls and retries

- POST JSON only, with an exact allowed Origin; cross-site browser requests are
  rejected. Origin checks are not a substitute for rate limiting against bots.
- A 32 KiB body limit, bounded field lengths, strict email validation, category
  allowlist, required consent, and server-side honeypot validation are enforced.
- Atomic Redis limits: 10 attempts per IP and 5 per sender per 10 minutes, plus
  100 total attempts per hour. Vercel's trusted `x-forwarded-for` header is used;
  if hosting behind another proxy, review its trusted-IP behavior before use.
- Raw IPs, email addresses, and message bodies are not stored in Redis. IP/email
  keys are HMAC hashes, counters expire, and the first-attempt date expires after
  24 hours. Message contents and secrets are not logged by application code.
- The browser blocks concurrent submissions and keeps its request ID for retries
  of an unchanged draft. The server derives a content-bound idempotency key.
  Redis retains a stable timestamp so retries use an identical email body.
  [Resend idempotency](https://resend.com/docs/dashboard/emails/idempotency-keys)
  protects accepted requests from duplicate sends for 24 hours. A new or changed
  draft gets a new key; this is not indefinite duplicate-content detection.
- Provider calls have timeouts. A failed or uncertain request preserves the form
  values; retrying an unchanged draft retains the same idempotency key.
- Success requires a successful Resend response containing an email ID. A 200
  response containing HTML or an unexpected JSON shape cannot trigger success.

The SPA rewrite in `vercel.json` excludes `/api` so requests reach the Function
instead of receiving `index.html`. Do not replace it with an unconditional
catch-all that captures API paths.

## Local verification and deployment

```sh
npm run test:contact
npm run lint
npm run build
```

The tests mock both external services. They send **no real email**. For full local
Function development, use Vercel CLI `vercel dev` with local environment values;
plain `vite`/`npm run dev` does not itself execute Vercel Functions.

After configuring the services and deploying:

1. Submit a clearly identified test request in Arabic and English through the
   production Contact form, using an address you control for Reply-To.
2. Confirm the provider accepted each request and inspect its event status in
   Resend. Confirm the `delivered` event or receipt in `info@unifiedworks.net`;
   check spam filtering and bounce information if it is not received.
3. Confirm the subject, all field values, Arabic encoding, timestamps, and Reply-To.
4. Verify a repeated click does not generate a second email. Test provider failure
   only in a preview/local environment, not by disrupting production credentials.

Provider acceptance means accepted **for delivery**, not guaranteed inbox
placement. A provider `delivered` event confirms acceptance by the recipient's
mail server; inbox receipt still depends on its mail filtering. No real delivery
has been verified yet. Continue monitoring Resend delivery/bounce events after launch.
