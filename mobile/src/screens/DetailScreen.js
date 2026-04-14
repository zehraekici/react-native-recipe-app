import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import { fetchRecipeById } from "../services/api";

export default function DetailScreen({ route }) {
  const { id } = route.params;

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchRecipeById(id);
        setRecipe(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  if (loading) return <ActivityIndicator />;
  if (!recipe) return <Text>Recipe not found</Text>;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: recipe.image }} style={styles.image} />

      <Text style={styles.title}>{recipe.title}</Text>

      <Text style={styles.section}>Ingredients</Text>
      {recipe.ingredients?.map((item, index) => (
        <Text key={index}>- {item}</Text>
      ))}

      <Text style={styles.section}>Instructions</Text>
      <Text>{recipe.instructions}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 15 },
  image: { width: "100%", height: 250, borderRadius: 10 },
  title: { fontSize: 24, fontWeight: "bold", marginVertical: 10 },
  section: { fontSize: 18, marginTop: 15, fontWeight: "600" },
});