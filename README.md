# Abhyasi - AI Interviewer 🤖🎤
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)<br>
Abhyasi is an AI-powered interviewer built with modern web technologies. It uses the **Gemini API** to simulate real interview experiences—generating intelligent questions, model answers, providing feedback, and scoring performance. The app integrates **Clerk** for authentication and **Firebase** to persist chat data.
---
## 📑 Table of Contents

- [✨ Features](#-features)  
- [🛠️ Technologies Used](#️-technologies-used)  
- [🚀 Getting Started](#-getting-started)  
  - [📋 Prerequisites](#-prerequisites)  
  - [⚙️ Installation](#-installation)  
  - [💻 Backend Setup](#-backend-setup)  
  - [🌐 Frontend Setup](#-frontend-setup)  
  - [🔐 Environment Variables](#-environment-variables)  
- [📂 Project Structure](#-project-structure)  
- [🤝 Contributing](#-contributing)  
- [📜 License](#-license)  
- [👤 Authors](#-authors)

---
## ✨ Features
🎯 AI-generated interview questions using Gemini API
- 🔥 Real-time data storage with Firebase Database
- 🎙️ Voice recording and transcription capabilities
- 📊 Performance analysis and ratings stored in Firebase
- 📝 Detailed feedback on answers
- 🔐 User authentication with Clerk
- 🏷️ Support for multiple interview domains
- 📈 Progress tracking over time with Firebase persistence
- 🎨 Modern, responsive UI with Tailwind CSS

---

## 🛠️ Technologies Used

### Frontend
- ⚡ Vite (Build Tool)
- 🟦 React.js with TypeScript
- 🎨 Tailwind CSS
- 🧩 ShadCN UI Components (Radix UI-based components)
- 🛣️ React Router (v6)
- 🔑 Clerk Authentication
- 🔥 Firebase Realtime Database

---
- **APIs & Logic**  
  - Gemini API (for AI responses)
  - Firebase (chat history & storage)
---

### Additional Packages
- `firebase` - Firebase SDK
- `react-icons` - Icon library
- `react-webcam` - For video recording
- `react-audio-recorder` - For voice recording
- `zod` - Schema validation
- `react-hook-form` – form handling
- `tailwind-variants` – utility-based Tailwind variants
---

 **Tooling**  
  - `pnpm` – blazing fast package manager  
  - TypeScript + ESLint + Prettier

---

## 🚀 Getting Started

### 📋 Prerequisites

- Node.js ≥ 16  
- `pnpm` globally installed  
- Gemini API Key  
- Firebase Project & Config  
- Clerk Project (frontend + backend keys)

---

### ⚙️ Installation

```bash
git clone https://github.com/Gcvishwas/Abhyasi.git
cd Abhyasi
pnpm install

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
