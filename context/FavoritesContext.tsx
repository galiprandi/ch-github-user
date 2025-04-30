// context/FavoritesContext.ts
import { createContext, useContext, useState, ReactNode } from "react";

// Crea el contexto con un valor inicial que coincide con el tipo o null
const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

// Define el tipo de las props del proveedor
interface FavoritesProviderProps {
  children: ReactNode; // ReactNode cubre elementos React, strings, números, arrays, etc.
}

export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
  // Tipa las props
  // Tipa el estado usando useState<string[]>
  const [favorites, setFavorites] = useState<string[]>([]);

  // Opcional: Lógica de localStorage (si la añades después)
  /*
  useEffect(() => {
    const storedFavorites = localStorage.getItem('githubFavorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('githubFavorites', JSON.stringify(favorites));
  }, [favorites]);
  */

  // Tipa el parámetro 'username'
  const toggleFavorite = (username: string) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(username)) {
        return prevFavorites.filter((fav) => fav !== username);
      } else {
        return [...prevFavorites, username];
      }
    });
  };

  // Tipa el parámetro 'username' y el tipo de retorno boolean
  const isFavorite = (username: string): boolean =>
    favorites.includes(username);

  return (
    // Provee el valor con el tipo definido
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

// Hook personalizado tipado
export const useFavorites = () => {
  const context = useContext(FavoritesContext);

  if (context === undefined)
    throw new Error("useFavorites must be used within a FavoritesProvider");

  return context;
};

// Interfaces
interface FavoritesContextType {
  favorites: string[];
  toggleFavorite: (username: string) => void;
  isFavorite: (username: string) => boolean;
}
