import type { AppProps } from "next/app";
import { FavoritesProvider } from "../context/FavoritesContext";
import "@picocss/pico/css/pico.css";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <FavoritesProvider>
      <Head>
        <title>GitHub Users Directory - Explore GitHub Profiles</title>
        <meta
          name="description"
          content="Browse and explore GitHub user profiles, repositories, and contributions. Find developers and their projects on GitHub."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="GitHub Users Directory" />
        <meta
          property="og:description"
          content="Browse and explore GitHub user profiles, repositories, and contributions."
        />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container">
        <br />
        <header>
          <h1>GitHub Users Directory</h1>
        </header>
        <br />
        <Component {...pageProps} />
      </main>
    </FavoritesProvider>
  );
}

export default MyApp;
