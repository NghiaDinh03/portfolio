# 💻 3D Interactive Portfolio

Welcome to my personal portfolio website. This is an interactive 3D experience built to showcase my projects, skills, and writeups in cybersecurity operations and software development.

👉 **Live Demo:** [nghiadu03.github.io/portfolio/](https://nghiadu03.github.io/portfolio/)

---

## ✨ Highlights

*   **Interactive 3D Space:** A responsive 3D developer workstation powered by **Three.js (WebGL)**.
*   **Smooth Motion:** Fluid page transitions and scroll animations driven by **GSAP (ScrollTrigger)** and **Lenis**.
*   **Audio Feedback:** Lo-fi mechanic click and hover sound effects via **Howler.js**.
*   **Minimalist Markdown Blog:** An on-premises markdown parser built with **Marked** to render cybersecurity writeups and tutorials dynamically.
*   **Real-time Analytics:** Simple profile view counter powered by **Firebase Realtime Database** with local cooldown controls.

---

## 🛠️ Tech Stack

*   **Frontend:** Vue 3 (Composition API), TypeScript, SCSS, Vite
*   **3D / Shaders:** Three.js, GLSL (compiled via `vite-plugin-glsl`)
*   **Animations:** GSAP, Lenis
*   **Audio:** Howler.js
*   **Database:** Firebase

---

## ⚙️ Quick Start

### Local Setup
Ensure you have Node.js installed, then run:
```bash
npm install
npm run dev
```
Access the application at `http://localhost:3000/portfolio/`

### Docker Support
Alternatively, spin up the development container using:
```bash
docker compose up --build
```

*Note: The `/portfolio/` subpath is required in local URLs to align with the production base path.*

---

## 📦 Build & Deployment
The build process compiles TypeScript and assets into the `dist/` directory:
```bash
npm run build
```
Deployments to **GitHub Pages** are handled automatically via GitHub Actions workflow on push to the `main` branch.
