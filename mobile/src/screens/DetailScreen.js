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

export default function DetailScreen({ route, navigation }) {
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

  if (loading) return <ActivityIndicator style={{ flex: 1 }} />;
  if (!recipe) return <Text>Recipe not found</Text>;

  return (
    <View style={{ flex: 1, backgroundColor: AppColors.beige }}>
      
      {}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>

        <Text style={styles.headerTitle} numberOfLines={1}>
          {recipe.title}
        </Text>

        <View style={styles.heart}>
          <Ionicons name="heart" size={18} color="white" />
        </View>
      </View>

      <ScrollView>
        {/*IMAGE */}
        <Image source={{ uri: recipe.image }} style={styles.image} />

        {/*CONTENT */}
        <View style={styles.container}>
          
          <Text style={styles.text}>{recipe.instructions}</Text>

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

  heart: {
    backgroundColor: AppColors.mediumGreen,
    padding: 10,
    borderRadius: 50,
  },

  image: {
    width: "100%",
    height: 250,
  },

  container: {
    padding: 16,
  },

  text: {
    fontSize: 16,
    lineHeight: 24,
    color: AppColors.brown,
  },

  section: {
    fontSize: 20,
    fontWeight: "700",
    color: AppColors.darkGreen,
    marginTop: 20,
    marginBottom: 10,
  },

  ingredient: {
    fontSize: 16,
    marginBottom: 6,
    color: AppColors.brown,
  },
});