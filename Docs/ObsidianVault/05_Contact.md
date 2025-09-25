---
aliases: [Contact]
tags: [contact]
---

# Contact

## Flow
Form (`/contact`) → POST `/api/contact` → dev logs OK.

Enable email via Resend (uncomment in `route.ts`) and set `RESEND_API_KEY`.

## Validation Rules
- Email: required, regex match
- Message: required, ≥ 10 chars
- Name: optional, if present ≥ 2 chars

Refs: [[01_Setup]] | [[08_Troubleshooting]]


