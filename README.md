# Reternia

**Reternia** is a premium software house dedicated to aesthetics, performance, and boundless innovation. We provide flawless execution for your business by crafting elegant digital experiences, AI automation, and custom enterprise solutions tailored for growth.

## 🚀 Services

- **Company Website**: Elegant and responsive digital presence, tailored to reflect your brand's premium identity.
- **AI Automation**: Cutting-edge artificial intelligence integration to streamline workflows and boost operational efficiency.
- **Custom Enterprise Solutions**: Custom-built, scalable software solutions designed specifically to optimize operations and accelerate your business growth.

## 💻 Tech Stack

This project is built using a modern, performant, and lightweight frontend stack:

- **HTML5 & CSS3**: Core structure and base styling.
- **JavaScript (Vanilla)**: For UI logic, dynamic content rendering, and robust localization (i18n) handling.
- **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS framework utilized for rapid, responsive UI development.
- **[Three.js](https://threejs.org/)**: Powerful JavaScript 3D library used to render the interactive WebGL background.
- **[Anime.js](https://animejs.com/)**: Lightweight JavaScript animation engine for orchestrating smooth micro-interactions, scroll reveals, and 3D object manipulation.

## 📁 Project Structure

- `index.html` - The main application entry point containing the layout, localization logic, and 3D background scripts.
- `portfolio.json` - Data source for the dynamically rendered client portfolio section.
- `fonts.css` & `fonts/` - Custom typography assets (Cocogoose font).
- `package.json` - Project metadata and dependencies (`animejs` and `three`).
- `portfolio-images/` - Image assets used in the portfolio section.

## 🛠️ Getting Started

Since this is primarily a static web project, running it locally is straightforward:

1. Clone the repository:
   ```bash
   git clone git@github.com-akunB:reternia/reternia.git
   ```
2. Serve the directory using a local web server to avoid CORS issues with ES modules and fetch APIs. For example, using Node.js:
   ```bash
   npx serve .
   ```
   Or using Python:
   ```bash
   python -m http.server
   ```
3. Open the provided localhost URL in your browser.
