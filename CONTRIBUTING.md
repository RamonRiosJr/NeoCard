# Contributing to NeoCard

Thank you for your interest in contributing to NeoCard! This guide will help you get started with our development process.

## 🌿 Branching Strategy

We follow a simplified **GitHub Flow** strategy to keep our repository clean and organized.

### 🌳 Main Branch (`main`)

- The `main` branch is always stable and production-ready.
- Never commit directly to `main`. All changes must be made via Pull Requests.

### 🚀 Feature Branches (`feature/`)

- For new features or enhancements.
- Example: `feature/new-seasonal-theme`, `feature/improved-ai-logic`.

### 🐛 Fix Branches (`fix/`)

- For bug fixes and urgent patches.
- Example: `fix/vcard-encoding`, `fix/mobile-responsive-header`.

### 📖 Documentation Branches (`docs/`)

- For updates to README, CONTRIBUTING, or other documentation.
- Example: `docs/add-api-usage-guide`.

---

## 🛠️ Development Setup

1. **Fork the repository** to your own account.
2. **Clone your fork**:

    ```bash
    git clone https://github.com/YOUR_USERNAME/NeoCard.git
    ```

3. **Install dependencies**:

    ```bash
    npm install
    ```

4. **Create your branch**:

    ```bash
    git checkout -b feature/your-awesome-feature
    ```

5. **Make your changes** and ensure they follow our coding standards.
6. **Verify your build**:

    ```bash
    npm run build
    ```

---

## 🎨 Coding Standards

- **TypeScript**: Use strict typing. Avoid `any`.
- **React**: Use functional components and hooks.
- **Tailwind**: Avoid inline styles; use utility classes. Favor component-level abstractions for repetitive styles.
- **Consistency**: Follow the existing file structure and naming conventions (`PascalCase` for components, `camelCase` for utilities).

---

## 📝 Pull Request Process

1. Push your changes to your feature branch.
2. Open a Pull Request against our `main` branch.
3. Provide a clear description of the change, including:
    - Motivation for the change.
    - Screenshot/Screen recording (if UI-related).
    - How to test the change.
4. Ensure CI/CD checks pass.
5. Request a review from a maintainer.

---

## ⚖️ License

By contributing to this repository, you agree that your contributions will be licensed under its MIT License.
