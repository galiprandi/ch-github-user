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

This project uses Cypress for end-to-end testing, focusing on the following key aspects:

1. **Test Strategy**
   - Uses semantic HTML selectors for reliable element selection
   - Mocks API responses using fixtures
   - Handles Next.js ISR/SSR pages appropriately
   - Tests focus on user interactions and expected outcomes
   - Sequential execution for better debugging

2. **Running Tests**
   ```bash
   # Run tests in headless mode
   npm run test:e2e
   
   # Run tests in interactive mode (with browser UI)
   npm run test:e2e:dev
   ```
   
   **Note:** Tests run sequentially for better debugging and reliability.

3. **Test Files**
   - `cypress/e2e/github-users.spec.cy.ts`: Main test file covering:
     * Home page:
       - Search functionality
       - User listing
       - Error handling
       - Loading states
     * User details page:
       - User information display
       - Favorite status
       - Navigation
     * User repositories page:
       - Repository listing
       - Data display
       - Navigation

4. **Fixtures**
   - `cypress/fixtures/github-user.json`: Mock user data
   - `cypress/fixtures/github-repos.json`: Mock repository data

### Test Structure

The tests verify:
1. Page rendering and structure
2. Data loading and display
3. User interactions (search, navigation)
4. Error handling and loading states
5. Routing between pages

### Test Assertions

The tests check for:
1. Correct page rendering and navigation
2. Proper data display (user info, repositories)
3. Search functionality and results
4. Loading states and error messages
5. User interactions (favorite toggling)
6. Data consistency across pages

### Unit Testing with Vitest

This project uses Vitest for unit testing, focusing on testing the GitHub API utilities in `lib/githubApi.ts`. The unit tests cover:

1. **Test Strategy**
   - Mocks the global `fetch` function to simulate API responses
   - Tests each API function independently:
     - `fetchInitialUsers`: Tests successful fetch and error handling
     - `searchUsers`: Tests search functionality, fallback to initial users, and error handling
     - `fetchUserDetails`: Tests successful fetch, 404 handling, and error handling
     - `fetchUserRepos`: Tests successful fetch and error handling
   - Verifies correct API endpoint calls and response handling
   - Tests both success and error scenarios

2. **Running Tests**
   ```bash
   # Run all unit tests
   npm run test:unit
   
   # Run unit tests in watch mode
   npm run test:dev
   ```

3. **Test Files**
   - `lib/githubApi.test.ts`: Contains all unit tests for the GitHub API utilities
   - Tests focus on:
     * API endpoint correctness
     * Response data handling
     * Error scenarios
     * Special cases (empty query, 404 responses)

### Test Structure

The tests verify:
1. Correct API endpoint calls
2. Proper response data handling
3. Error handling and error messages
4. Special cases and edge cases
5. Data type and structure validation

### Test Assertions

The tests check for:
1. Correct API endpoint URLs
2. Proper response data transformation
3. Correct error message formatting
4. Appropriate error handling
5. Data structure validation

## 🚀 Deploy

You can deploy on Vercel, Netlify, etc. The project is compatible with serverless environments and supports environment variables.

🤝 Thank you for reviewing this project! If you have suggestions, issues, or feedback, feel free to open an issue or PR.
