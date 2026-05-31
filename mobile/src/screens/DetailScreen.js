import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { fetchRecipeById } from "../services/api";
import { AppColors } from "../AppColors";
import { useFavorites } from "../context/FavoritesContext";

const formatInstructions = (text) => {
  if (!text) return [];

  const cleaned = text.trim();

  if (cleaned.includes("\n")) {
    return cleaned
      .split(/\r?\n+/)
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  }

  return cleaned
    .split(/(?<=\.)\s+/)
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
};

export default function DetailScreen({ route, navigation }) {
  const { id } = route.params;

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  const { isFavorite, toggle } = useFavorites();

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

  if (loading) return <ActivityIndicator style={{ flex: 1 }} />;
  if (!recipe) return <Text>Recipe not found</Text>;

  return (
    <View style={{ flex: 1, backgroundColor: AppColors.beige }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={AppColors.darkGreen} />
        </TouchableOpacity>

        <Text style={styles.headerTitle} numberOfLines={1}>
          {recipe.title}
        </Text>

        <TouchableOpacity onPress={() => toggle(recipe)}>
          <Ionicons
            name={isFavorite(recipe.id) ? "heart" : "heart-outline"}
            size={24}
            color={isFavorite(recipe.id) ? AppColors.darkGreen : "gray"}
          />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={{ uri: recipe.image }} style={styles.image} />

        <View style={styles.container}>
          <Text style={styles.section}>Instructions</Text>

          <View style={styles.instructionsBox}>
            {formatInstructions(recipe.instructions).map((paragraph, index) => (
              <Text key={index} style={styles.instructionsText}>
                {paragraph}
              </Text>
            ))}
          </View>

          <Text style={styles.section}>Ingredients</Text>

          {recipe.ingredients?.map((item, index) => (
            <Text key={index} style={styles.ingredient}>
              • {item}
            </Text>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 32,
    paddingHorizontal: 16,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: AppColors.darkGreen,
    flex: 1,
    textAlign: "center",
    marginHorizontal: 10,
  },

  image: {
    width: "100%",
    height: 250,
  },

  container: {
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 40,
  },

  section: {
    fontSize: 18,
    fontWeight: "700",
    color: AppColors.darkGreen,
    marginBottom: 10,
  },

  instructionsBox: {
    marginBottom: 8,
  },

  instructionsText: {
    fontSize: 15,
    lineHeight: 23,
    color: AppColors.brown,
    marginBottom: 14,
    textAlign: "left",
  },

  ingredient: {
    fontSize: 16,
    lineHeight: 23,
    marginBottom: 7,
    color: AppColors.brown,
  },
});