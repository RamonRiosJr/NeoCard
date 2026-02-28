# 📋 NeoCard Audit & Backlog

**Auditor:** Senior Arch/DevOps & Security Associate  
**Date:** 2026-02-27  
**Scope:** Architecture, Security, Performance, Accessibility, & Code Quality

> **Executive Summary:**  
> The NeoCard application has a visually appealing UI and an interesting core concept, but under the hood, it is functionally incomplete, structurally flawed, and completely insecure. The README makes several false claims about the app's capabilities (PWA, offline support) that are not implemented. The architecture fundamentally misunderstands how client-side API keys work, exposing the Gemini key to the public.

---

## 🚨 CRITICAL FINDINGS (Must Fix Immediately)

### 1. SEC-001: Compromised AI API Key (Frontend Exposure)

* **Description:** The application injects `GEMINI_API_KEY` directly into the Vite build via `vite.config.ts`. Because this is a client-side React application, the API key is fully exposed in the plaintext JavaScript bundle for anyone to scrape and abuse. This will lead to catastrophic billing issues or account suspension.
* **Fix:** **IMMEDIATE REMEDIATION REQUIRED.** Remove frontend injection. Implement a lightweight Node/Express/Cloudflare Worker backend or Serverless Function (Vercel/Netlify) to proxy all Gemini requests securely. The client should never hold the key.

### 2. ARC-001: False "PWA Ready" Claims

* **Description:** The project claims to be "Installable as a progressive web app for offline access" in `README.md` and `metadata.json`. This is blatantly false. There is no `manifest.json`, no pre-caching, no `serviceWorker.js` registration, and no offline fallback.
* **Fix:** Either remove the false marketing from the documentation immediately OR implement standard PWA features (Vite PWA plugin, `manifest.json`, Apple Touch Icons, Workbox service worker).

---

## 🔴 HIGH PRIORITY FINDINGS

### 3. UX-001: Broken Mobile Responsiveness in AI Chat

* **Description:** `AvatarChat.tsx` uses a hardcoded `h-[600px]` height constraint. On smaller mobile devices (e.g., iPhone SE, older Androids), this modal will overflow the viewport, making it impossible to see the input field or close the modal.
* **Fix:** Use relative viewport units (e.g., `h-[80vh]` or `max-h-screen`) and flexbox `flex-1` correctly to ensure it stays fully within the screen boundaries.

### 4. A11Y-001: Severe Accessibility Violations

* **Description:** Icon-only buttons (like Social Icons, Close buttons, QR code button) have absolutely no text or `aria-label` attributes. Screen readers will read these as blank or gibberish links. Complex overlays (Modals) do not implement Focus Trapping, nor do they apply `aria-hidden` to the background, trapping visually impaired users in a navigation loop.
* **Fix:** Add descriptive `aria-label`s to all icon buttons. Use an established accessible modal library (like Headless UI or Radix) or manually implement standard focus-trapping logic.

---

## 🟡 MEDIUM PRIORITY FINDINGS

### 5. ARC-002: Monolithic and Bloated App.tsx

* **Description:** The `App.tsx` file is 330+ lines long and contains multiple inline components (`LeadFormModal`, `QRModal`, `SocialIcon`) and complex parent logic. This violates standard React separation of concerns.
* **Fix:** Break down `App.tsx` into smaller chunks. Extract the `LeadFormModal`, `QRModal`, and `SocialIcon` into their own files inside the `src/components/` directory.

### 6. PRF-001: Frontend Bundle Bloat

* **Description:** Including `@google/genai` inside the frontend React application significantly inflates the client bundle size, impacting Load Time (LCP) and Time to Interactive (TTI), which are critical for digital business cards.
* **Fix:** Moving the AI execution to a Backend/Serverless Function (as required by SEC-001) will inherently resolve this by removing the bulky SDK from the client build.

### 7. ENG-001: Zero Testing Infrastructure

* **Description:** The project has absolutely no unit tests, integration tests, or end-to-end tooling. The CI pipeline runs `typecheck` and `build`, but there is zero verification that the utilities (`generateVCard`, `getSeasonalTheme`) actually work.
* **Fix:** Install `vitest` and `@testing-library/react`. Write core tests for the `cardUtils.ts` output logic and basic component rendering.

---

## 🟢 LOW PRIORITY / TECH DEBT

### 8. UX-002: Incomplete Features (Mock Data)

* **Description:** The "Book a Meeting" lead form just throws an `alert()` and "Add to Apple Wallet" throws an `alert()`. While okay for a prototype, this feels extremely unpolished for a "v1.0.0" repo.
* **Fix:** Hook the form up to a basic free Email/API provider (Formspree or EmailJS). Add a note that Apple PKPASS generation is a premium backend feature to manage user expectations.

### 9. STY-001: CSS Mixed in index.html

* **Description:** Custom scrollbar styling is dumped directly into `<style>` tags in `index.html`. This bypasses Tailwind's post-processing scope.
* **Fix:** Move standard CSS into a `src/index.css` file and import it globally like standard Vite React apps do. Use Tailwind's `@layer utilities` for custom scrollbar hiding.

---

## 🎯 BACKLOG TRACKER

| Ticket ID | Title                                             | Severity | Status      |
| --------- | ------------------------------------------------- | -------- | ----------- |
| SEC-001   | Migrate Gemini API to Backend Proxy               | CRITICAL | IN PROGRESS |
| ARC-001   | Implement True PWA (manifest + ServiceWorker)     | CRITICAL | DONE        |
| UX-001    | Fix AI Chat Modal Overflow Constraints            | HIGH     | DONE        |
| A11Y-001  | Implement ARIA labels & Modal Focus Traps         | HIGH     | DONE        |
| ARC-002   | Refactor App.tsx into isolated components         | MEDIUM   | DONE        |
| PRF-001   | Remove @google/genai from client bundle           | MEDIUM   | To-Do       |
| ENG-001   | Scaffold Vitest & Core Unit Tests                 | MEDIUM   | To-Do       |
| STY-001   | Migrate inline CSS to index.css                   | LOW      | DONE        |
| UX-002    | Replace Lead Form Alert with Formspree Integration | LOW      | To-Do       |
