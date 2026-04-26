import React from "react";
import AppNavigator from "./mobile/src/navigation/Navigator";
import { FavoritesProvider } from "./mobile/src/context/FavoritesContext";

export default function App() {
  return (
  <FavoritesProvider>
    <AppNavigator />
  </FavoritesProvider>);
}
