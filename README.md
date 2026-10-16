# YutDim (粵掂) — Cantonese Learning Playground

> Don’t just memorize—play your way to Cantonese.  
> 唔使死背，玩吓就識 · jyut6 dim6

YutDim is a lightweight, static website for learning Cantonese through mini-games, Jyutping practice, tone training, and mistake review. The homepage acts as a hub linking to all learning activities. It uses Traditional Chinese by default and includes a one-click Traditional/Simplified Chinese toggle.

## Features

- 🎮 Three Cantonese mini-games, from beginner to challenge level
- 📖 Jyutping crash course covering initials, finals, and tones
- 🎵 Six-tone trainer for practising Cantonese tones
- 🔁 Review list for questions answered incorrectly in games
- 🌐 Traditional / Simplified Chinese character toggle
- 📱 Responsive, mobile-friendly layout
- 🧭 Simple top navigation with card-based homepage
- 🔍 SEO and Open Graph meta tags for sharing

## Pages & Activities

### Games

| Activity | File | English Name | Description |
|---|---|---|---|
| 粵語看圖配配對 | `picture-match.html` | Cantonese Picture Match | Beginner-friendly picture-to-word matching. Learn animals, fruits, and everyday vocabulary. |
| 粵拼詞句連連拼 | `word-match.html` | Cantonese Jyutping Match | Intermediate practice with daily greetings, Jyutping, and example sentences. |
| 粵闖粵掂 | `slang-challenge.html` | Cantonese Slang Challenge | Challenge levels for Cantonese slang and idioms. Test whether you can really say them. |

### Learning Tools

| Tool | File | English Name | Description |
|---|---|---|---|
| 粵拼速成 | `jyutping.html` | Jyutping Crash Course | Initials, finals, and the six tones explained in one page. Essential for beginners. |
| 聲調練習 | `tones.html` | Tone Trainer | The six tones are hard? Practise until you can tell them apart. |
| 錯題複習 | `review.html` | Review List | Review the questions you got wrong while playing the games. |

## Tech Stack

- Static HTML, CSS, and JavaScript
- `assets/style.css` — site styling
- `assets/app.js` — app helpers, including `YutDim.setCharMode()` and `YutDim.charMode()` for the Traditional/Simplified toggle
- `assets/analytics.js` — analytics script
- Meta tags in `index.html` for SEO and social sharing

## Getting Started

No build step or dependencies are mentioned. You can open `index.html` directly in a browser, or serve the folder locally:

```bash
python3 -m http.server 8000
```

Then visit:

```text
http://localhost:8000
```

## Project Structure

```text
.
├── index.html
├── picture-match.html
├── word-match.html
├── slang-challenge.html
├── jyutping.html
├── tones.html
├── review.html
└── assets/
    ├── style.css
    ├── app.js
    └── analytics.js
```

## Navigation

- 入門 / Beginner → `picture-match.html`
- 詞彙 / Vocabulary → `word-match.html`
- 闖掂 / Challenge → `slang-challenge.html`
- 粵拼 / Jyutping → `jyutping.html`
- 聲調 / Tones → `tones.html`
- 複習 / Review → `review.html`
- 繁 button → toggles between Traditional and Simplified Chinese

## Design Notes

- Tram-green minimal aesthetic
- Card-based homepage layout
- Red and gold accent colours
- Traditional Chinese by default, with a Simplified Chinese toggle
- Footer: “粵掂 · 為粵語學習者而做” / “YutDim · Made for Cantonese learners”

## License

No license is specified in the provided source files. Add a license before distributing or publishing the project.
