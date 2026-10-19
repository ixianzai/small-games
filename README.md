# JyutDim · Cantonese Learning Playground

A small website for learning Cantonese by playing games.

Whether you're starting from zero or already know a bit, JyutDim lets you
pick up vocabulary, Jyutping, and tones through short, low-pressure games
instead of rote memorization. Start with pictures and everyday words, then
work your way up to slang and idioms.

## What You Can Do

**Play**
- **Picture Match** — match pictures to Cantonese words. A gentle starting
  point for beginners.
- **Jyutping Match** — match everyday greetings and phrases to their Jyutping
  and example sentences.
- **Slang Challenge** — work through Cantonese slang and idioms level by
  level.

**Study**
- **Jyutping Crash Course** — initials, finals, and the six tones explained
  on a single page.
- **Tone Trainer** — drill the six tones until you can tell them apart.
- **Review List** — every question you get wrong is collected here, so you
  can go back and practice it.

The whole site can be switched between Traditional and Simplified Chinese
with one button in the navigation.

## Getting Started

No installation or build step is needed. Serve the project folder with any
static file server:

bash
python3 -m http.server 8000

Then open `http://localhost:8000`. Opening `index.html` directly in a browser
works too.

## Project Structure

.
├── index.html              # Landing page
├── picture-match.html      # Picture matching game
├── word-match.html         # Jyutping word matching game
├── slang-challenge.html    # Slang challenge game
├── jyutping.html           # Jyutping crash course
├── tones.html              # Tone trainer
├── review.html             # Missed-question review
└── assets/
    ├── style.css
    ├── app.js
    ├── icons.js
    └── analytics.js

## Built With

Plain HTML, CSS, and vanilla JavaScript — no frameworks, no bundler. Styles
are driven by CSS custom properties, and the site is responsive and works on
both desktop and mobile.

## License

Copyright (c) 2026 JyutDim contributors. All rights reserved.

This project may not be used, copied, modified, or distributed without prior
written permission from the copyright holder.
