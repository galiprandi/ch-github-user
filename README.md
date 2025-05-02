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

## 🧪 Testing

### End-to-End Testing with Cypress

- **Focus**: Comprehensive tests of user flows, simulating real interactions and verifying navigation and responses.
- **Coverage**: Pages like home, user details, and repositories, emphasizing UI and integrated API.
- **Execution**: Use `npm run test:e2e` for headless mode or `npm run test:e2e:dev` for interactive mode.
- **Tools**: Cypress with mocks and fixtures to simulate data.

### Unit Testing with Vitest

- **Focus**: Individual tests of API functions, isolating code with mocks.
- **Coverage**: Functions in `githubApi.ts`, such as fetch and search operations.
- **Execution**: Use `npm run test:unit` to run all or `npm run test:dev` for watch mode.
- **Tools**: Vitest with fetch mocks to simulate responses.

### Test Comparison

For a clear overview, here's a table comparing the testing types:

| Feature | Unit Testing (Vitest) | End-to-End Testing (Cypress) |
|---------|------------------------|------------------------------|
| **Focus** | Tests individual code units, mocking dependencies like fetch. | Tests complete user flows, simulating browser interactions. |
| **Coverage** | API functions in `githubApi.ts`, verifying internal logic. | Web pages, navigation, and integrated UI responses. |
| **Execution** | Fast and local, with `npm run test:unit`. | Slower, requires browser, with `npm run test:e2e`. |
| **Advantages** | Quickly detects specific errors without external dependencies. | Verifies real user behavior and end-to-end flows. |
| **Tools** | Vitest with automatic mocks. | Cypress with fixtures and semantic selectors. |

This strategy ensures comprehensive coverage from code base to user interactions.

## 🚀 Deploy

You can deploy on Vercel, Netlify, etc. The project is compatible with serverless environments and supports environment variables.

🤝 Thank you for reviewing this project! If you have suggestions, issues, or feedback, feel free to open an issue or PR.
