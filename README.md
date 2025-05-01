# GitHub Users Directory

Web application built with Next.js to search, list, and mark GitHub users as favorites, and view their details and repositories.

![Screenshot](./public/screenshot-1.png)

## 📚 Features

* **Home (CSR):**
  * Initial list of GitHub users.
  * Search bar to filter users by name (API requests).
  * Display of user names and avatars.
  * Links to user detail and repositories pages.
  * Mark/unmark users as favorites (non-persistent).
* **User detail (ISR):**
  * Shows extended user info (name, avatar, bio, repos, etc.).
  * Indicates and allows toggling favorite status.
  * Caches the page for 1 day (configurable via `CACHE_DURATION`).
* **User repositories (ISR):**
  * Lists the user's public repositories.
  * Same caching behavior as detail page.

## 🌐 Technologies & Libraries

* [Next.js](https://nextjs.org) with Page Router and TypeScript.
* [React-Tools](https://www.npmjs.com/package/@galiprandi/react-tools): LazyRender for improved performance.
* [Pico CSS](https://picocss.com/): Minimal CSS Framework.
* [GitHub API](https://docs.github.com/en/rest/users?apiVersion=2022-11-28): for fetching User and Repository data.

## ⚒️ Installation & Usage

```bash
npm install
npm run dev
```

Open <http://localhost:3000> in your browser.

### 📄 Environment Variables

You can set the cache duration (ISR) with the `CACHE_DURATION` variable (in seconds):

```bash
CACHE_DURATION=86400 # 1 day (default)
```

## 📁 Main Structure

* `/pages/index.tsx` – Home and search (CSR)
* `/pages/users/[username]/index.tsx` – User detail (ISR)
* `/pages/users/[username]/repos.tsx` – User repositories (ISR)
* `/components/UserTable.tsx` – User table
* `/context/FavoritesContext.tsx` – Favorites context
* `/lib/githubApi.ts` – GitHub API utilities

## ⭐ Favorites

* Favorites are managed in localStorage and are not persisted after refresh.
* You can mark/unmark favorites from both the home and detail pages.

## 📝 Notes on Cache (ISR)

* User detail and repositories pages use Incremental Static Regeneration (ISR), automatically regenerating each page every X seconds (`CACHE_DURATION`).
* This improves performance and reduces load on the GitHub API.

## 🚀 Deploy

You can deploy on Vercel, Netlify, etc. The project is compatible with serverless environments and supports environment variables.

🤝 Thank you for reviewing this project! If you have suggestions, issues, or feedback, feel free to open an issue or PR.
