import React, { useEffect, useState } from "react";
import { FlatList, ActivityIndicator } from "react-native";
import RecipeCard from "../components/RecipeCard";
import { fetchRecipes } from "../services/api";

export default function HomeScreen({ navigation }) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        console.log("Fetching recipes...");
        const data = await fetchRecipes();
        console.log("DATA:", data);
        setRecipes(data);
      } catch (err) {
        console.error("ERROR:", err);
        setError("Failed to load recipes");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) return <ActivityIndicator />;

  return (
    <FlatList
      data={recipes}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <RecipeCard
          recipe={item}
          onPress={() =>
            navigation.navigate("Detail", { id: item.id })
          }
        />
      )}
    />
  );
}