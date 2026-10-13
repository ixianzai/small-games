# 粤掂 YutDim · Cantonese Learning Playground

A collection of lightweight web-based mini-games and tools designed specifically for **Cantonese learners, teachers, and parents**. Built purely with front-end technologies, these games can be played directly in your browser without any backend or build tools.

> **唔使死背，玩吓就识。**  
> Don't memorize blindly—learn by playing.

---

## 🎮 Features

### Games (遊戲)
- **Baby Cantonese Match** (`粤语宝宝消消乐.html`): Learn words from pictures, starting with animals and fruits. Perfect for beginners and kids.
- **Cantonese Word Match** (`粤语词汇消消乐.html`): Learn greetings and daily vocabulary with Jyutping and example sentences.
- **Cantonese Slang Challenge** (`粤闯粤掂.html`): Challenge yourself with Cantonese slang and idioms through level-based gameplay.

### Learning Tools (學習工具)
- **Jyutping Crash Course** (`jyutping.html`): Initials, finals, and the six tones explained on one page. Essential for absolute beginners.
- **Tone Trainer** (`tones.html`): Practice distinguishing the six Cantonese tones.
- **Review List** (`review.html`): Collect questions you got wrong and review them later.

### Other Features
- **Traditional/Simplified Chinese Toggle**: Switch between Traditional and Simplified Chinese using the "简" button in the navigation bar.
- **Responsive Design**: Works on desktop, tablet, and mobile devices.
- **Pure Static Site**: No server-side code required.

---

## 📁 Project Structure

```text
.
├── index.html                # Homepage / Entry point
├── 粤语宝宝消消乐.html       # Baby Cantonese Match (Games)
├── 粤语词汇消消乐.html       # Cantonese Word Match (Games)
├── 粤闯粤掂.html             # Cantonese Slang Challenge (Games)
├── jyutping.html             # Jyutping Crash Course (Tools)
├── tones.html                # Tone Trainer (Tools)
├── review.html               # Review List (Tools)
└── assets/
    ├── style.css             # Global styles and CSS variables
    └── app.js                # Core logic and utility functions
```

---

## 🚀 Quick Start

### Option 1: Open Locally
No dependencies needed. Simply clone the repository and open `index.html` in your browser:

```bash
git clone https://github.com/ixianzai/small-games.git
cd small-games
open index.html   # macOS
# or
start index.html  # Windows
```

### Option 2: Run a Local Server
For the best experience (especially if loading assets), you can run a lightweight local server:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080` in your browser.

---

## 🌐 Deployment (GitHub Pages)

This project is hosted on GitHub Pages. To deploy your own version:

1. Push your code to a GitHub repository.
2. Go to **Settings** > **Pages**.
3. Under **Build and deployment**, select `Deploy from a branch`.
4. Choose the `main` branch and `/ (root)` folder.
5. Click **Save**. Your site will be live at `https://<your-username>.github.io/<repository-name>/`.

> **Note**: Some file names in this project contain Chinese characters. GitHub Pages usually handles them well, but if you encounter 404 errors in certain browsers or environments, consider renaming the files to English (e.g., `match.html`, `match3.html`, `dim.html`) and updating the links in `index.html`.

---

## 🛠️ Implementation Notes

### Navigation & Links
The homepage (`index.html`) links to the game pages using their Chinese file names:
- Baby Match → `粤语宝宝消消乐.html`
- Word Match → `粤语词汇消消乐.html`
- Slang Challenge → `粤闯粤掂.html`

### Traditional/Simplified Toggle
Elements with a `data-sc` attribute store their Simplified Chinese text. The navigation button toggles display mode via:

```html
<button
  class="lang-toggle"
  type="button"
  onclick="YutDim.setCharMode(YutDim.charMode()==='tc'?'sc':'tc')"
>
  简
</button>
```

### Theming
Colors and typography are controlled via CSS variables in `assets/style.css` (e.g., `--paper`, `--ink`, `--neon-red`, `--neon-gold`).

---

## 🤝 Contributing

Contributions are welcome! Whether you want to add new vocabulary, fix a bug, or improve the UI, feel free to open an Issue or submit a Pull Request.

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes (`git commit -m 'Add some amazing feature'`).
4. Push to the branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request.

---

## 📄 License

This project is currently unlicensed. If you plan to open-source it, consider adding an MIT License.

---

## 🙏 Acknowledgements

Built with ❤️ for Cantonese learners around the world.  
粤掂 · 為粤語學習者而做。
