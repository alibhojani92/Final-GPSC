# Telegram Dental Bot (Dental Pulse 18)

Cloudflare Workers based Telegram bot for Dental students.

## Features
- Daily Test (20 MCQs)
- Weekly Test (Sat/Sun – 50 MCQs)
- Practice Test (Anytime, Subject-wise)
- Unlimited attempts
- No-repeat MCQ rule (30 days, logic-based)
- Study hours tracking (unlimited per day)
- Daily & Weekly reports
- Inline keyboard UI
- Permanent data (Cloudflare D1)
- GitHub auto-deploy

## Tech Stack
- Cloudflare Workers
- Cloudflare D1 (SQL)
- Telegram Bot API
- JavaScript (ES Modules)

## Entry
- Worker Entry: `src/index.js`

## Deploy
1. Push code to GitHub (main branch)
2. Cloudflare auto-deploys
3. Set secrets in Cloudflare:
   - `BOT_TOKEN`

## Database
- D1 auto-bound via `wrangler.toml`

## Notes
- No Cloudflare UI code edits
- One-time copy-paste setup
- Structure and features are locked
