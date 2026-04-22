# TekkieStack: An offline-first coding education platform

> **Status:** Live &nbsp;&nbsp;&nbsp; **Completion:** 80% &nbsp;&nbsp;&nbsp; **Last Updated:** 2026-04-22

## About

TekkieStack is a browser-native, offline-first coding education platform for school-age learners from Year 3 to Year 11. It is structured as a progressive journey from computational thinking to AI engineering, designed to run entirely in the browser without any installation or teacher setup. Our goal is to make high-quality coding education accessible to every school-age child regardless of device or internet reliability.

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Language | JavaScript |
| Runtime | Browser-native (no Node.js) |
| Storage | IndexedDB (offline progress) |
| Styling | CSS custom properties |
| AI integration | Anthropic Claude API |
| Infrastructure | Static hosting (GitHub Pages / Vercel) |

## ✨ Features

| Feature | Description | Status |
|---|---|---|
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

**Status key:**
- ✅ Built — Feature is functional
- 📋 Planned — Feature is in the vision stage

## 🚀 Getting Started

As this project is designed to be browser-native, there is no complex build setup required.

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/osiabu/tekkiestack.git
    ```
2.  **Navigate to the directory:**
    ```sh
    cd tekkiestack
    ```
3.  **Run the application:**
    Simply open the `index.html` file in your web browser. For features requiring API calls, a local server may be needed to avoid CORS issues.

## 🗺️ Roadmap

### Phase 1: MVP (Year 3–6 Track)
*   Develop 5 core computational thinking modules with visual coding.
*   Implement the offline-first architecture using Service Workers and IndexedDB.
*   Build the secure, in-browser code sandbox and student progress tracker.

### Phase 2: Expansion (Year 7–11 Tracks)
*   Create the text-based coding track (Python/JS).
*   Integrate the AI Tutor using the Anthropic Claude API.
*   Develop the initial version of the Teacher Dashboard for class management.

### Phase 3: Scale
*   Build the Parent Portal for progress notifications.
*   Implement the certificate and badge generation system.
*   Establish curriculum content partnerships and prepare for multi-school deployment.

---

**Osi Abu – Full Stack AI Engineer** | **https://osiabu.vercel.app**