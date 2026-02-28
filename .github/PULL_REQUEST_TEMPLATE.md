# 🚀 NeoCard Pull Request Template

## 📝 Description

Provide a concise summary of the changes and the rationale behind them.

**Key Changes:**

- [x] Refactored `App.tsx` into modular components.
- [x] Implemented PWA support (manifest + service worker).
- [x] Fixed mobile responsiveness for AI Chat Modal.
- [x] Enhanced Accessibility with ARIA labels and semantic roles.
- [x] Migrated inline styles to `index.css`.
- [x] Sanitized environment variables and updated `.env.example`.

## 📌 Related Tickets (Backlog/Audit)

- ARC-001 (PWA Implementation)
- ARC-002 (Component Refactor)
- SEC-001 (Security Sanitization)
- UX-001 (Chat Height Fix)
- A11Y-001 (Accessibility Labels)
- STY-001 (CSS Migration)

## 🧪 Testing Performed

- [ ] Manual verification of mobile responsiveness (iPhone SE simulation).
- [ ] PWA installation check (Chrome DevTools Lighthouse).
- [ ] Screen reader check for icon buttons.
- [ ] AI Chat functionality verification with new environment key logic.

## 📸 Screenshots / Demos

(Optional: Add screenshots of the improved UI/PWA install prompt)

## ✅ Checklist

- [ ] Code follows project coding standards.
- [ ] Documentation (README/BACKLOG) updated.
- [ ] No hardcoded secrets committed.
- [ ] Lint and Typecheck scripts passing (`npm run lint`, `npm run typecheck`).

---
*Created by [Antigravity AI](https://coqui.cloud)*
