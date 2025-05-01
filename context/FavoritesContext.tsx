import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("githubFavorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("githubFavorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (username: string) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(username)) {
        return prevFavorites.filter((fav) => fav !== username);
      } else {
        return [...prevFavorites, username];
      }
    });
  };

  const isFavorite = (username: string): boolean =>
    favorites.includes(username);

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);

  if (context === undefined)
    throw new Error("useFavorites must be used within a FavoritesProvider");

  return context;
};

interface FavoritesProviderProps {
  children: ReactNode;
}

interface FavoritesContextType {
  favorites: string[];
  toggleFavorite: (username: string) => void;
  isFavorite: (username: string) => boolean;
}
