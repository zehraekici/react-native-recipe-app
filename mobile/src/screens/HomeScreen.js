import React, { useEffect, useState } from "react";
import {
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import RecipeCard from "../components/RecipeCard";
import { fetchRecipes, fetchFavorites, toggleFavorite } from "../services/api";
import { AppColors } from "../AppColors"; 

export default function HomeScreen({ navigation }) {
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleToggle(recipe) {
    await toggleFavorite(recipe);

    setFavorites(prev =>
      prev.includes(recipe.id)
        ? prev.filter(id => id !== recipe.id)
        : [...prev, recipe.id]
    );
  }

  // API çağrısı
  const loadRecipes = async () => {
    try {
      setLoading(true);
      const data = await fetchRecipes();
      const favs = await fetchFavorites();          // 👈 EKLE

      setRecipes(data);
      setFavorites(favs.map(f => f.id));   

    } catch (err) {
      console.error("ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRecipes();
  }, []);

  // ilk açılış
  if (loading && recipes.length === 0) {
    return <ActivityIndicator style={{ flex: 1 }} />;
  }

  // 
  const Header = () => (
    <View
      style={{
        paddingHorizontal: 20,
        paddingTop: 40,
        paddingBottom: 10,
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "700",
          color: AppColors.darkGreen,
        }}
      >
        Hi Chef !
      </Text>

      <Text
        style={{
          marginTop: 4,
          color: AppColors.brown,
          opacity: 0.6,
        }}
      >
        What are you cooking today?
      </Text>

      {/* ikonlar */}
      <View
        style={{
          position: "absolute",
          right: 20,
          top: 60,
          flexDirection: "row",
          gap: 10,
        }}
      >
        <View
          style={{
            backgroundColor: AppColors.lightGreen,
            padding: 12,
            borderRadius: 50,
          }}
        >
          <Ionicons name="add" size={20} />
        </View>

        <View
          style={{
            backgroundColor: AppColors.lightGreen,
            padding: 12,
            borderRadius: 50,
          }}
        >
          <Ionicons name="search" size={20} />
        </View>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: AppColors.beige }}>
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={Header} 
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 120,
        }}
        renderItem={({ item }) => (
          <RecipeCard
            recipe={item}
            isFav={favorites.includes(item.id)}         // EKLE
            onToggleFav={() => handleToggle(item)}      // EKLE
            onPress={() =>
              navigation.navigate("Detail", { id: item.id })
            }
          />
        )}
        refreshing={loading}
        onRefresh={loadRecipes}
      />

      {/* Refresh butonu */}
      <TouchableOpacity
        onPress={loadRecipes}
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
          backgroundColor: AppColors.lightGreen,
          padding: 14,
          borderRadius: 12,
          elevation: 4,
        }}
      >
        <Ionicons name="refresh" size={24} />
      </TouchableOpacity>
    </View>
  );
}