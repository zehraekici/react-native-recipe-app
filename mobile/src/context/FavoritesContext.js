import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchFavorites, toggleFavorite } from "../services/api";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]); // full objects
  const [loadingFavs, setLoadingFavs] = useState(true);

  // İlk yükleme (DB → state)
  useEffect(() => {
    (async () => {
      try {
        const data = await fetchFavorites();
        setFavorites(data);
      } catch (e) {
        console.error("Favorites load error:", e);
      } finally {
        setLoadingFavs(false);
      }
    })();
  }, []);

  // Helper: id listesi
  const favoriteIds = favorites.map(f => f.id);

  const isFavorite = (id) => favoriteIds.includes(id);

  // Toggle (optimistic update)
  const toggle = async (recipe) => {
    // önce UI güncelle
    setFavorites(prev => {
      const exists = prev.some(f => f.id === recipe.id);
      if (exists) {
        return prev.filter(f => f.id !== recipe.id);
      } else {
        return [
          ...prev,
          { id: recipe.id, title: recipe.title, image: recipe.image, instructions: recipe.instructions }
        ];
      }
    });

    // sonra backend
    try {
      await toggleFavorite(recipe);
    } catch (e) {
      console.error("Toggle error, rollback:", e);
      // hata olursa geri al
      setFavorites(prev => {
        const exists = prev.some(f => f.id === recipe.id);
        if (exists) {
          return prev.filter(f => f.id !== recipe.id);
        } else {
          return [
            ...prev,
            { id: recipe.id, title: recipe.title, image: recipe.image, instructions: recipe.instructions }
          ];
        }
      });
    }
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, favoriteIds, isFavorite, toggle, loadingFavs }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

// Hook
export const useFavorites = () => useContext(FavoritesContext);