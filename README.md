# 📇 NeoCard: The AI-Powered Digital Business Card

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Gemini AI](https://img.shields.io/badge/Gemini_AI-4285F4?style=for-the-badge&logo=google-gemini&logoColor=white)](https://deepmind.google/technologies/gemini/)

**NeoCard** is a modern, mobile-first digital business card application designed for the networking elite. It combines sleek design with a Gemini-powered AI avatar to create an interactive experience that goes beyond static links.

---

## ✨ Key Features

- **🤖 AI Avatar Assistant**: An interactive chat powered by Google Gemini that answers questions about your professional background, expertise, and availability in real-time.
- **🎨 Dynamic Seasonal Themes**: Intelligent theme engine that auto-switches based on holidays (Christmas, Halloween, Pride, etc.) or allows manual selection (Midnight Pro, Professional Light).
- **📇 Smart vCard Generation**: One-tap "Save Contact" button that generates a downloadable `.vcf` file for instant phonebook integration.
- **📱 PWA Ready**: Installable as a progressive web app for offline access and a native-like experience on iOS and Android.
- **📊 Lead Capture**: Built-in simple CRM integration point for booking meetings and collecting contact info.
- **🔗 Social Hub**: Centralized, beautifully styled icons for all your professional social identities.

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A [Google Gemini API Key](https://aistudio.google.com/app/apikey)

### Installation

1. **Clone the Repo**

   ```bash
   git clone https://github.com/RamonRiosJr/NeoCard.git
   cd NeoCard
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Configure Environment**

   Create a `.env` file in the root directory (refer to `.env.example`):

   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Run Development Server**

   ```bash
   npm run dev
   ```

## 🛠️ Customization

Most of the application's content and appearance can be customized in a single file: `src/constants.ts`.

```typescript
// src/constants.ts
export const EMPLOYEE_DATA = {
  name: "Ramon Rios Jr",
  role: "Senior Solutions Architect",
  // ... other details
};
```

## 🏗️ Tech Stack

- **Frontend**: React 18
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **AI**: Google Generative AI (@google/genai)
- **Vite**: Ultra-fast build tool and dev server
- **QR**: qrcode.react

## 📂 Project Structure

A high-level overview of the repository's organization:

```text
NeoCard/
├── .github/workflows/    # CI/CD pipelines
├── public/               # Static assets
├── src/
│   ├── components/       # UI components (AvatarChat, LeadForm, etc.)
│   ├── services/         # API integrations (Google Gemini)
│   ├── utils/           # Helper functions (vCard generation, theme logic)
│   ├── App.tsx          # Main application layout
│   ├── constants.ts     # Configuration for user data and themes
│   ├── types.ts         # TypeScript interfaces
│   └── index.tsx        # Application entry point
├── .env.example          # Environment variable template
├── index.html            # Main HTML document
└── vite.config.ts        # Vite configuration
```

### 🔍 Key Implementation Details

- **Dynamic Themes**: The logic in `src/utils/cardUtils.ts` detects seasonal holidays and system dark mode to apply styling tokens defined in `src/constants.ts`.
- **AI Virtual Assistant**: Powered by the `@google/genai` SDK. The logic resides in `src/services/geminiService.ts`, utilizing a system prompt that injects your profile data for context-aware responses.

## 🌿 Repository Standards

We maintain high repo standards to ensure stability and ease of collaboration.

### Branching Strategy

We use **GitHub Flow**. For all technical details on how to contribute, please refer to [CONTRIBUTING.md](CONTRIBUTING.md).

- `main`: Production-ready code.
- `feature/*`: New features and UI updates.
- `fix/*`: Bug fixes.

### CI/CD

Automated workflows run on every PR to `main`:

- **Build**: Ensures the project compiles and builds correctly.
- **Typecheck**: Verifies TypeScript strictness.
- **Lint**: Ensures consistent code style.

## 📈 Optimization & Sanitization

This repository has been sanitized for public use:

- ✅ Removed hardcoded personal identifiers from logic.
- ✅ Environment-based configuration for API keys.
- ✅ Optimized TypeScript interfaces for strict type checking.
- ✅ Organized project structure into standard `src/` directory.
- ✅ Streamlined Vite configuration for faster HMR.

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

Built with ❤️ by [Coqui Cloud](https://coqui.cloud)
