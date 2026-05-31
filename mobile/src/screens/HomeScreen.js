import React, { useEffect, useState } from "react";
import {
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  View,
  Text,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import RecipeCard from "../components/RecipeCard";
import SearchModal from "../components/SearchModal";

import { fetchRecipes } from "../services/api";
import { AppColors } from "../AppColors";
import { useFavorites } from "../context/FavoritesContext";

export default function HomeScreen({ navigation }) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);

  const { isFavorite, toggle } = useFavorites();

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

  if (loading && recipes.length === 0) {
    return <ActivityIndicator style={{ flex: 1 }} />;
  }

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

      <View
        style={{
          position: "absolute",
          right: 20,
          top: 60,
          flexDirection: "row",
          gap: 10,
        }}
      >
        {/* <TouchableOpacity
          style={{
            backgroundColor: AppColors.lightGreen,
            padding: 12,
            borderRadius: 50,
          }}
        >
          <Ionicons name="add" size={20} />
        </TouchableOpacity> */}

        <TouchableOpacity
          onPress={() => setSearchVisible(true)}
          style={{
            backgroundColor: AppColors.lightGreen,
            padding: 12,
            borderRadius: 50,
          }}
        >
          <Ionicons name="search" size={20} />
        </TouchableOpacity>
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
            isFav={isFavorite(item.id)}
            onToggleFav={() => toggle(item)}
            onPress={() => navigation.navigate("Detail", { id: item.id })}
          />
        )}
        refreshing={loading}
        onRefresh={loadRecipes}
      />

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

      <Modal
        visible={searchVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setSearchVisible(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setSearchVisible(false)}
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.35)",
            justifyContent: "flex-end",
          }}
        >
          <TouchableOpacity activeOpacity={1}>
            <SearchModal
              navigation={navigation}
              onClose={() => setSearchVisible(false)}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}