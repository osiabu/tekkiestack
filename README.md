# TekkieStack

TekkieStack is a browser-native, offline-first coding education platform for school-age learners from Year 3 to Year 11, structured as a progressive route from computational thinking through to AI engineering, designed to run entirely in the browser without installation, and built to work whether or not the school's internet is reliable. The goal is to make high-quality coding education accessible to every school-age child regardless of device or connection, and the architecture follows that goal: a static front end, IndexedDB for offline progress, a service worker for offline shell delivery, and a multi-provider AI fallback chain so the AI Lab features keep working even when one provider is rate-limited or down.

`Status: Live · 80% complete · Last updated: 2026-05-07`

## Tech stack

| Layer | Technology |
|---|---|
| Language | JavaScript (vanilla, modular ES modules) |
| Runtime | Browser-native, no Node.js |
| Storage | IndexedDB for offline progress, localStorage for preferences |
| Styling | CSS custom properties |
| AI integration | Anthropic Claude API as primary, with a multi-provider fallback chain |
| PWA | Service worker (`sw.js`), manifest (`manifest.json`), installable |
| Hosting | Static (GitHub Pages or Vercel) |

## Features

| Feature | Description | Status |
|---|---|---|
| Year 3 to 6 curriculum | Computational thinking modules with block and visual coding | Built |
| Year 7 to 9 curriculum | Transition from visual coding to text-based Python and JavaScript | Built |
| Year 10 to 11 curriculum | Full-stack and AI engineering track | Built |
| Offline mode | Lessons load and save progress without internet | Built |
| Progress tracker | Student dashboard showing completed modules | Built |
| Code sandbox | In-browser code editor with live preview | Built |
| AI tutor | Claude-powered hints and explanations per lesson | Built |
| Progressive Web App | Installable PWA with service worker for full offline functionality | Built |
| AI Lab | Three-tool safety system covering Code Helper, Code Detective, and Prompt Trainer, each with input and output guards | Built |
| Multi-provider AI fallback | Four-provider chain across Claude, Gemini, OpenRouter, and Hugging Face so a Lab session never silently fails | Built |
| Age-appropriate AI safety | Input and output guards plus mode restrictions calibrated by year group | Built |
| XP and badge system | Reward system with completion certificates | Built |
| Teacher dashboard | Class progress view and lesson assignment | Planned |
| Certificate generator | Completion badges and printable certificates | Planned |
| Parent portal | Progress summary emails to parents | Planned |

## Why offline-first

A coding education platform that only works on a fast school WiFi connection has already disqualified the schools that need it most, so TekkieStack treats offline as the default rather than the fallback: the service worker pre-caches the shell on first visit, every lesson is stored in IndexedDB on first load, the AI Lab uses an offline mode for prompt-trainer reviews when no provider is reachable, and progress syncs back when the connection returns.

## Getting started

The project is browser-native, so there is no build step beyond serving the static files:

```bash
git clone https://github.com/osiabu/tekkiestack.git
cd tekkiestack
npx serve .
```

Open the served URL in any modern browser. For features that require API calls (the AI Lab tools, the AI Tutor), a local server is required because file:// URLs are blocked by CORS for fetch calls.

## Roadmap

**Phase 1 (MVP, Year 3 to 6 track).** Five core computational thinking modules with visual coding, the offline-first architecture using service workers and IndexedDB, the secure in-browser code sandbox, and the student progress tracker.

**Phase 2 (Expansion, Year 7 to 11 tracks).** The text-based coding track in Python and JavaScript, the AI Tutor integration via the Claude API, and the first version of the Teacher Dashboard for class management.

**Phase 3 (Scale).** The Parent Portal for progress notifications, the certificate and badge generation system, and curriculum content partnerships in preparation for multi-school deployment.

---

Osi Abu, Aperintel · [osiabu.vercel.app](https://osiabu.vercel.app)
