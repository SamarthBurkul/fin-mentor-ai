# FinSaarthi – AI Finance Companion for India 💰🇮🇳  

FinSaarthi is an AI‑powered, open‑innovation personal finance platform that helps Indian users understand, plan, and optimize their money.  
It brings together budgeting, savings, investments, learning, and government benefits in a single, beautifully‑designed experience.

***

## 🌍 Vision – Open Innovation for Financial Freedom

FinSaarthi is built on the belief that **financial literacy should be intelligent, inclusive, and accessible**.

- **Open Innovation** – Built using modern web technologies, modular APIs, and AI models that can be extended by the community.  
- **India‑First** – Rupee‑based flows, Indian expense categories, local government schemes, and relevant examples.  
- **AI‑First Experience** – Not just calculators, but an intelligent companion that explains the *why* behind every financial decision.  

> FinSaarthi = “Saarthi” (guide) + AI – your digital co‑pilot for smarter money choices.

***

## 🔑 Problem Statement

Most people in India juggle multiple apps and spreadsheets:  
one for expenses, one for EMIs, one for savings, one for learning, and none for unbiased advice.

**Key pain points:**

- Fragmented tools and no single view of money.  
- Low awareness of long‑term savings and investment impact.  
- Confusing loan & EMI decisions.  
- Under‑utilization of government schemes and benefits.  

**FinSaarthi solves this by:**

- Unifying **Budgeting + Savings + Investments + Education + AI Chat** into one platform.  
- Providing **interactive calculators** and **data visualizations** that make numbers intuitive.  
- Using **AI explanations** to turn complex finance into simple, human language.

***

## 🌟 Feature Highlights

### 1. FinSaarthi AI Assistant

Your 24/7 finance buddy:

- Chatbot that answers questions on budgeting, loans, investing, and personal finance.  
- Ready‑made “quick prompts” for common scenarios (college budget, SIP start, emergency fund, etc.).  
- Contextual, conversational responses using LLMs (Groq / similar).  
- Designed as a *guide*, not a product‑pushing bot.

***

### 2. SmartBudget AI & Expense Analytics

Understand where your money actually goes:

- Summary cards for **Total Spent**, **Transactions**, **Average Transaction**, and **Top Category**.  
- Time filters: **Daily**, **Weekly**, **Monthly**.  
- Visuals:
  - Monthly spending trend line chart.  
  - Category distribution pie chart.  
  - Top categories bar chart.  
- “AI Insights” button to highlight overspending, optimization areas, and suggested budget caps.

***

### 3. Advanced Financial Calculator Suite

Professional‑grade calculators with a friendly UI:

- **EMI Calculator** – Loan amount, rate, tenure, and monthly EMI.  
- **SIP Calculator** – Monthly investment vs future corpus.  
- **FD & RD Calculators** – Maturity value and effective yield.  
- **Savings Growth & Interest Calculators** – Future value simulations.  
- **Business / Profit Calculator** – Basic revenue‑cost‑profit analytics for small businesses.

Each calculator:

- Uses intuitive input fields and validation.  
- Responds instantly with computed results.  
- Is grouped under a dedicated calculators hub.

***

### 4. Smart Savings & Goal Thinking

FinSaarthi encourages a **savings‑first mindset**:

- Uses data from expenses and calculators to show saving potential.  
- Helps users mentally connect daily habits with long‑term goals.  
- Can be extended to attach goals like “Laptop”, “Education”, “Emergency Fund”, etc.

***

### 5. Smart Investment Comparator (Backend‑Driven)

Make better investment choices:

- Compare multiple options (FDs, SIPs, mutual funds, etc.) on risk, return, and time horizon.  
- Backend APIs use Node.js + MongoDB to store and compute comparison stats.  
- AI can generate natural‑language summaries explaining trade‑offs.

***

### 6. Learn Hub – Study, Leaderboard & Badges

Finance learning, but make it fun:

- **Study Dashboard** with modules and concept summaries.  
- **Top Learners leaderboard** with points and ranks.  
- **Badges** like Finance Expert, Investment Guru, Fraud Fighter, Quiz Master.  
- Encourages consistent learning through gamification – ideal for students and early professionals.

***

### 7. Government Benefits Explorer (WIP / Extensible)

A powerful social‑impact module:

- Profile form with fields like age, income, state, category (GEN/OBC/SC/ST/EWS), occupation, etc.  
- Planned AI engine to:
  - Suggest relevant Indian government schemes.  
  - Explain eligibility, required documents, and application steps.  
  - Flag fraud risks and unofficial portals.  

Even as a work‑in‑progress, it showcases how **open innovation + AI** can support public welfare.

***

## 🧱 Architecture Overview

### Frontend Stack

- **Framework:** React + TypeScript  
- **Bundler:** Vite  
- **Styling:** Tailwind CSS with custom dark theme + gradient tokens  
- **Charts:** Recharts  
- **State:** React hooks & local state  
- **UX:** Responsive SPA with navbar navigation (Home, AI Chat, Tools, AI Tools, Learn, Auth).

### Backend Stack

- **Runtime:** Node.js  
- **Framework:** Express.js  
- **Database:** MongoDB (Mongoose models)  
- **Core APIs:**
  - `/api/auth` – Sign Up, Sign In, JWT issuance.  
  - `/api/savings` – Savings & expense logic.  
  - `/api/investment` – Investment comparison.  
  - `/api/gov` – Government benefits AI (planned / WIP).  
- **Security:** JWT middleware for protected routes.

### AI & Integrations

- LLM provider: Groq / compatible models (e.g., LLaMA family).  
- Used for:
  - Chat assistant.  
  - Budget and savings insights.  
  - Government benefits analysis (planned).  
- All secrets are injected via environment variables (never committed).

***

## 🎨 Design Language

FinSaarthi’s UI is designed to feel like a **future finance cockpit**:

- **Colors:**  
  - Background – Jet Black, Deep Navy.  
  - Primary – Emerald, Teal, Neon Blue.  
  - Accents – Gold, Soft gradients for CTAs.  
- **Typography:**  
  - Headings – elegant display font for a premium feel.  
  - Body – modern sans‑serif for readability.  
- **Patterns:**  
  - Card‑based sections.  
  - Glowing borders and hover effects.  
  - Iconography inspired by banking, analytics, and AI.

***

## 📁 Project Structure (High Level)

```bash
finsaarthi-ai/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── savingsController.js
│   │   ├── investmentController.js
│   │   └── govController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── user.js
│   │   ├── saving.js
│   │   ├── InvestmentComparison.js
│   │   └── gov.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── savings.js
│   │   ├── investment.js
│   │   └── gov.js
│   └── index.js
│
├── src/
│   ├── api/
│   │   ├── savingsService.ts
│   │   ├── investmentService.ts
│   │   └── govService.ts
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── AIFinanceBot.tsx
│   │   ├── SmartBudgetAI.tsx
│   │   ├── SmartSavings.tsx
│   │   ├── SmartInvestmentComparator.tsx
│   │   ├── AdvancedCalculators.tsx
│   │   ├── GovernmentBenefits.tsx
│   │   ├── StudyDashboard.tsx
│   │   ├── SignIn.tsx
│   │   ├── SignUp.tsx
│   │   └── shared UI components...
│   ├── App.tsx
│   └── main.tsx
│
├── public/
├── package.json
├── backend/package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```


***

## ⚙️ Getting Started

### Prerequisites

- Node.js 18+  
- npm or yarn  
- MongoDB URI (local or Atlas)  
- AI API key (Groq / similar)

### 1. Clone

```bash
git clone https://github.com/SamarthBurkul/finsaarthi-ai.git
cd finsaarthi-ai
```

### 2. Install Dependencies

```bash
# Frontend
npm install

# Backend
cd backend
npm install
cd ..
```

### 3. Environment Variables

**Frontend** – create `.env` in project root:

```env
VITE_API_BASE_URL=http://localhost:5000
VITE_GROQ_API_KEY=your_llm_key_here
```

**Backend** – create `backend/.env`:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_strong_secret_here
PORT=5000
PERPLEXITY_API_KEY=your_optional_perplexity_key
```

> Make sure `.env` files are in `.gitignore` so secrets are never pushed.

### 4. Run Locally

```bash
# Backend
cd backend
npm run dev

# Frontend (new terminal)
cd ..
npm run dev
```

Open: `http://localhost:5173`.

### 5. Production Build

```bash
npm run build
```

Deploy the frontend (e.g., Vercel) and backend (e.g., Render/Railway/VPS) using the same environment variables.

***

## 🔐 Security & Privacy

- JWT authentication for user‑specific features.  
- No bank logins or sensitive financial account integration.  
- Secret keys stored in environment variables only.  
- Backend validates requests and handles errors gracefully.

***

## 🧭 Roadmap – Future Open‑Innovation Ideas

- Multilingual interface (Hindi, Marathi, Tamil, etc.).  
- Deeper goal‑based planning (“buy house”, “education abroad”, “retirement”).  
- More quizzes and challenges in Learn Hub.  
- Community‑driven templates and shared budgets.  
- Stronger integration with verified government scheme data sources.

***

## 🤝 Team & Contributions

FinSaarthi is built by a student team as part of an open‑innovation initiative.  
We welcome ideas, discussions, and contributions that extend the platform responsibly.

If you’d like to contribute:

1. Fork the repo.  
2. Create a feature branch.  
3. Commit and push your changes.  
4. Open a pull request describing your improvement.

***

## 📄 License

This project is currently intended for **hackathon and educational use**.  
For commercial usage or large‑scale deployments, please contact the maintainers.

***

**FinSaarthi – your AI co‑pilot for smarter, more confident financial decisions.**