# Romance Forge: Until the Quiet Breaks

[![Node.js](https://img.shields.io/badge/Node.js-v16+-green)](https://nodejs.org)
[![Replit](https://img.shields.io/badge/Replit-Core-blue)](https://replit.com/@theromanceforge/LoveLore)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-black)](https://vercel.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Romance Forge** is an interactive storytelling platform for choice-driven romance narratives, built with Node.js and deployable on Replit and Vercel. *Until the Quiet Breaks* is its flagship story, a passionate, near-explicit slice-of-life romance set in Somerton, Indiana, where players navigate love, legacy, and redemption.

## 📖 About *Until the Quiet Breaks*
In this 9-layer interactive story, you return to Somerton as [your name], drawn by a letter from your ailing father, Henry. Reconnect with Lainey Shaw, your past love, and uncover the truth about her daughter, Clara. With 46 files, including an expanded `scene1.js` (~550 words) and other scenes (>1500 words), the story offers:
- **Two choices** per non-ending scene (Layers 1–8), no choices for 10 endings (Layer 9).
- **Personalized name and pronouns** (he/him or she/her).
- **Passionate, near-explicit romance** with tasteful, sensory-driven prose.
- **Transformation themes**: redemption, healing, and identity.

## 🚀 Features
- **Interactive Storytelling**: 9-layer branching narrative with 10 endings.
- **Personalization**: Dynamic name and pronoun replacement via `start.js`.
- **Replit Integration**: Auto-import stories using Replit API (`server/import-story.ts`).
- **Vercel Deployment**: Full-stack React frontend and Express API with global CDN.
- **Debugging Tools**: Validate word counts (`debug-wordcount.js`) and choice connectivity (`debug-choices.js`).
- **Viral Potential**: Social sharing-ready for X and TikTok (#RomanceForge).

## 🛠️ Setup Instructions

### Prerequisites
- **Replit Account**: Core plan ($240/year, next payment July 31, 2026) for API access.
- **GitHub Account**: For version control and Vercel integration.
- **Vercel Account**: For production deployment.
- **Node.js**: v16+ for local development.
- **Dependencies**: `axios`, `tsx` (installed via `npm install`).

### Replit Setup
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/until-the-quiet-breaks.git
   cd until-the-quiet-breaks
   ```
   Or use the LoveLore Repl: `replit.com/@theromanceforge/LoveLore`.

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Replit API**:
   - Go to `replit.com/account#developer` and create an API token (e.g., `LoveLoreAPI`).
   - In the LoveLore Repl, go to “Secrets” (Tools tab) and add:
     - `REPLIT_API_TOKEN`: Your API token.
     - `REPLIT_ID`: `LoveLore` (or UUID from `replit.com/@theromanceforge/LoveLore#id`).
4. **Import Story**:
   - Upload `until-the-quiet-breaks-bundle.json` to the Repl’s root directory.
   - Run:
     ```bash
     npm run import until-the-quiet-breaks-bundle.json
     ```
   - This uses `server/import-story.ts` to import 46 files, including `scene1.js` (~550 words).

5. **Test the Story**:
   - Run:
     ```bash
     node start.js
     ```
   - Enter your name and pronouns (he/him or she/her) to play.

6. **Debug**:
   - Validate word counts:
     ```bash
     node debug-wordcount.js
     ```
   - Validate choice connectivity:
     ```bash
     node debug-choices.js
     ```

### Vercel Deployment
1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Add Vercel deployment configuration"
   git push origin main
   ```

2. **Import to Vercel**:
   - Go to `vercel.com`, sign in, and click “Add New” → “Project”.
   - Import your GitHub repo (`your-username/until-the-quiet-breaks`).
   - Select “Other” framework.

3. **Configure Environment Variables**:
   - In Vercel’s dashboard (Settings → Environment Variables), add:
     - `DATABASE_URL`: Your production database URL.
     - `SESSION_SECRET`: Generate via `openssl rand -base64 32`.
     - `OPENAI_API_KEY`: Your OpenAI key.
     - `XAI_API_KEY`: Your xAI key (see `x.ai/api`).
     - `REPL_ID`: `LoveLore` (or UUID).
     - `REPLIT_DOMAINS`: Your custom domain (e.g., `yourdomain.com`).
     - `NODE_ENV`: `production`.

4. **Add Custom Domain**:
   - In Vercel’s dashboard, go to Domains → Add your domain (e.g., `yourdomain.com`).
   - Update DNS records as instructed (e.g., CNAME or A records via your registrar).

5. **Deploy**:
   - Vercel auto-deploys after pushing to GitHub.
   - Test at `yourdomain.com`.

### Exporting the Story
To export the story with a new ID (e.g., `770f8400-e29b-41d4-a716-446655440003`):
```bash
tsx server/import-story.ts export 770f8400-e29b-41d4-a716-446655440003
```
This generates `exported-story-770f8400-e29b-41d4-a716-446655440003.json` in the Repl.

## 📂 Project Structure
```
until-the-quiet-breaks/
├── package.json          # Project dependencies and scripts
├── main.js              # Core game logic with scene imports
├── start.js             # Entry point for name/pronoun input
├── server/
│   └── import-story.ts  # Auto-import/export script
├── debug-wordcount.js   # Word count validator
├── debug-choices.js     # Choice connectivity validator
├── scene1.js            # Expanded intro (~550 words)
├── scene2a.js ...       # Story scenes (>1500 words)
├── scene9a.js ...       # Endings (no choices)
├── until-the-quiet-breaks-bundle.json  # JSON bundle
```

## 🤝 Contributing
We welcome contributions to *Romance Forge*! To contribute:
1. Fork the repo.
2. Create new scenes or stories (9 layers, >1500 words except `scene1.js`, two choices).
3. Ensure he/him or she/her pronoun integration.
4. Run debug scripts to validate.
5. Submit a pull request with a description.

Join our community on [X](#) or [Discord](#) to share ideas (#RomanceForge).

## 📸 Screenshots
*(Add screenshots of the game running in Replit or Vercel, e.g., name input, choice selection)*

## 📜 License
MIT License. See [LICENSE](LICENSE) for details.

## 📞 Support
- **Replit Issues**: Email `support@replit.com` or post on `ask.replit.com`.
- **Vercel Issues**: Check `vercel.com/docs` or contact Vercel support.
- **Project Issues**: Open a GitHub issue or join our [Discord](#).

Happy storytelling with *Romance Forge*! 🌾
