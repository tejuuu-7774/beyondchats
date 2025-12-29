💬 BeyondChats — AI-Powered Content Automation Platform

BeyondChats is a full-stack web application that automates blog content enhancement using web scraping, Google search intelligence, and AI rewriting.
It transforms existing articles into richer, structured, and SEO-friendly versions — while preserving original content and citing trusted sources.

Built with a real-world backend automation mindset, this project demonstrates scraping pipelines, AI integration, and clean frontend delivery.

🚀 Hosted Links

🔗 Frontend: https://beyondchats-theta.vercel.app/
🔗 Backend API: https://beyondchats-0vmu.onrender.com

🔗 Articles API: https://beyondchats-0vmu.onrender.com/api/articles

✨ Features
📰 Article Scraping

Scrapes the oldest blog articles from BeyondChats

Extracts titles, content, and source URLs

Skips malformed or low-quality pages automatically

Prevents duplicates using unique slugs (idempotent scraping)

🧠 AI-Powered Article Enhancement

Searches Google for top external reference articles

Scrapes content from trusted third-party blogs

Uses an LLM (Groq) to rewrite articles:

Better structure

Clear headings

SEO-friendly flow

No plagiarism

Publishes updated versions alongside originals

📚 Article Management

Original and AI-updated articles stored separately

Clear isUpdated flag for distinction

Reference URLs attached to updated articles

Full CRUD support via REST APIs

🎨 Frontend Experience

Clean, modern React UI

Clearly marked AI-Updated articles

Read-more / read-less interaction

Clickable references

Responsive and minimal design

🧩 Tech Stack
Frontend

React (Vite)

Tailwind CSS

Axios

Backend

Node.js

Express.js

MongoDB Atlas

Mongoose

Axios + Cheerio (Scraping)

SerpAPI (Google Search)

Groq LLaMA 3.1 (AI Rewriting)

Hosting

Frontend → Vercel

Backend → Render

Database → MongoDB Atlas

📦 Project Structure
root
│
├── frontend/        → React + Tailwind client
└── backend/         → Node.js + Express REST API

🔗 API Routes (Backend)
📰 Articles

GET /api/articles — Fetch all articles

POST /api/articles — Create article

PUT /api/articles/:id — Update article

DELETE /api/articles/:id — Delete article

⚙️ Automation

POST /api/scrape — Scrape BeyondChats articles

POST /api/publish — Generate & publish AI-updated article

🧠 System Flow
BeyondChats Blog Page
        ↓
Web Scraper (Axios + Cheerio)
        ↓
MongoDB (Original Articles)
        ↓
Google Search (SerpAPI)
        ↓
External Article Scraping
        ↓
AI Rewriting (Groq LLM)
        ↓
MongoDB (Updated Articles)
        ↓
React Frontend (Vercel)

🔍 Why You May See Fewer Than 5 Articles

The scraper targets the 5 oldest articles, but fewer may appear due to intentional safeguards:

Articles without valid titles or sufficient content are skipped

Duplicate articles are prevented using unique slugs

Test or placeholder entries are excluded

This ensures:

No empty or broken content

Clean, reliable data

Production-grade scraping behavior

Data quality is prioritized over forcing a fixed count.

🛠️ Local Setup
Backend
cd backend
npm install
npm run dev


Create .env:

PORT=3000
MONGO_URI=your_mongodb_atlas_uri
GROQ_API_KEY=your_groq_key
SERPAPI_KEY=your_serpapi_key

Frontend
cd frontend
npm install
npm run dev


Create frontend/.env:

VITE_API_URL=http://localhost:3000/api

🌍 Deployment Notes
Backend (Render)

Root directory: backend

Build: npm install

Start: npm start

Environment variables set via Render dashboard

MongoDB Atlas network access enabled

Frontend (Vercel)
VITE_API_URL=https://beyondchats-0vmu.onrender.com/api

⚠️ Challenges & Decisions

Scraping reliability:
Implemented validation to skip malformed or blocked pages.

Duplicate handling:
Idempotent logic ensures safe re-runs without data pollution.

LLM choice:
Switched from OpenAI to Groq for faster inference and free-tier reliability.

Production readiness:
Clear separation of local vs deployed environment variables.
