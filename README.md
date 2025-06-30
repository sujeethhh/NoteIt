# 📝 NoteFlow

> **Clarity begins with a note.**  
> _NOTE IT. BUILD IT!_

Welcome to **NoteFlow** – a modern, AI-powered notebook app designed for creators, thinkers, and doers. Effortlessly capture, organize, and revisit your ideas with a beautiful, lightning-fast interface.  
Made entirely by [Sujeeth](https://github.com/sujeeth).

---

## ✨ Features

- **Notebooks & Notes:** Create, edit, and delete notebooks with ease. Each note is auto-saved as you type.
- **Rich Text Editing:** Powered by [TipTap](https://tiptap.dev/), enjoy headings, lists, bold, italic, underline, and more.
- **Typewriter Inspiration:** Motivational typewriter effect to keep you in the flow.
- **Beautiful Animations:** Smooth transitions and delightful UI, thanks to [framer-motion](https://www.framer.com/motion/).
- **Cloud Sync & Auth:** Secure authentication with [Clerk](https://clerk.dev/) and cloud database via [Drizzle ORM](https://orm.drizzle.team/).
- **Mobile-Ready:** Responsive design for note-taking on the go.

---

## 🚀 Quick Start

1. **Clone the repo:**
   ```bash
   git clone https://github.com/yourusername/noteflow.git
   cd noteflow
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root with the following (see `.env.example` if available):

   ```
   DATABASE_URL=your_postgres_connection_string
   CLERK_SECRET_KEY=your_clerk_secret_key
   GITHUB_TOKEN=your_github_token_for_openai
  
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser:**  
   Visit [https://note-it-mu.vercel.app](https://note-it-mu.vercel.app) and start typing!

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/)
- **Database:** PostgreSQL + [Drizzle ORM](https://orm.drizzle.team/)
- **Auth:** [Clerk](https://clerk.dev/)
- **UI:** Tailwind CSS, Framer Motion, TipTap, Lucide Icons

---

## 📦 Scripts

- `npm run dev` – Start the dev server
- `npm run build` – Build for production
- `npm run start` – Start the production server
- `npm run lint` – Lint the codebase

---

## 🧑‍💻 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

---


> _"Clarity begins with a note. Start your flow with NoteFlow."_

---
