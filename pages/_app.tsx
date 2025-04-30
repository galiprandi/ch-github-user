import type { AppProps } from "next/app";
import { FavoritesProvider } from "../context/FavoritesContext";
import "@picocss/pico/css/pico.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <FavoritesProvider>
      <main className="container">
        <br />
        <header>
          <h1>GitHub Users</h1>
        </header>
        <Component {...pageProps} />
      </main>
    </FavoritesProvider>
  );
}

export default MyApp;
