import React from "react";
import { FlatList } from "react-native";
import RecipeCard from "../components/RecipeCard";
import { RECIPES } from "../data/DummyData";

export default function HomeScreen({ navigation }) {
  return (
    <FlatList
      data={RECIPES}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <RecipeCard
          item={item}
          onPress={() => navigation.navigate("Detail", { recipe: item })}
        />
      )}
    />
  );
}