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
import { fetchRecipes } from "../services/api";
import { AppColors } from "../AppColors"; 

export default function HomeScreen({ navigation }) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  // API çağrısı
  const loadRecipes = async () => {
    try {
      setLoading(true);
      const data = await fetchRecipes();
      setRecipes(data);
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