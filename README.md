# Tekkiestack — Browser-native, offline-first coding education for school-age learners

**Status:** Live | **Completion:** 80% | **Last updated:** 2026-04-10

## About

TekkieStack is a browser-native, offline-first coding education platform for school-age learners from Year 3 to Year 11. It provides a progressive journey from computational thinking to AI engineering, designed to run entirely in the browser without any installation or teacher setup. The platform makes high-quality coding education accessible to every child regardless of device, internet reliability, or institutional IT infrastructure.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Language | JavaScript |
| Runtime | Browser-native (no Node.js required by learner) |
| Storage | IndexedDB (offline progress) |
| Styling | CSS custom properties |
| AI integration | Anthropic Claude API |
| Infrastructure | Static hosting (GitHub Pages / Vercel) |

## Features

| Feature | Description | Status |
|---------|-------------|--------|
| Year 3–6 curriculum | Computational thinking modules with block/visual coding | ✅ Built |
| Year 7–9 curriculum | Transition from visual to text-based Python/JS | ✅ Built |
| Year 10–11 curriculum | Full-stack and AI engineering track | ✅ Built |
| Offline mode | Lessons load and save progress without internet | ✅ Built |
| Progress tracker | Student dashboard showing completed modules | ✅ Built |
| Code sandbox | In-browser code editor with live preview | ✅ Built |
| AI tutor | Claude-powered hints and explanations per lesson | ✅ Built |
| Progressive Web App | Installable PWA with service worker for offline functionality | ✅ Built |
| AI Lab | Three-tool safety system (Code Helper, Code Detective, Prompt Trainer) | ✅ Built |
| Multi-provider AI fallback | Four-provider chain: Claude, Gemini, OpenRouter, Hugging Face | ✅ Built |
| Age-appropriate AI safety | Input/output guards and mode restrictions by year group | ✅ Built |
| XP and badge system | Reward system with completion certificates | ✅ Built |
| Teacher dashboard | Class progress view and lesson assignment | 📋 Planned |
| Certificate generator | Completion badges and printable certificates | 📋 Planned |
| Parent portal | Progress summary emails to parents | 📋 Planned |

## Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/osiabu/tekkiestack.git

# Navigate to project directory
cd tekkiestack

# Open in browser (no build step required)
open index.html
```

### Usage

```bash
# For development with live server
npx serve .

# Visit http://localhost:3000 to start learning
```

## Roadmap

### Phase 1 — MVP (Year 3–6 track)
- 5 computational thinking modules with visual coding
- Offline-first architecture
- In-browser code sandbox
- Student progress tracker

### Phase 2 — Expansion (Year 7–11 tracks)
- Text-based coding track
- AI tutor integration (Claude)
- Teacher dashboard

### Phase 3 — Scale
- Parent portal
- Certificate generator
- Multi-school deployment
- Curriculum content partnerships

---

**Osi Abu** — Full Stack AI Engineer | https://osiabu.vercel.app