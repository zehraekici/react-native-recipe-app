import React, { useState, useEffect } from "react";
import { View, Text, TextInput, FlatList, ActivityIndicator } from "react-native";

import RecipeFavoriteCard from "../components/RecipeFavoriteCard";
import { AppColors } from "../AppColors";
import { useFavorites } from "../context/FavoritesContext";

export default function FavoritesScreen({ navigation }) {
  const { favorites, toggle, loadingFavs } = useFavorites();

  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

  // favorites değişince filtreyi güncelle
  useEffect(() => {
    setFiltered(favorites);
  }, [favorites]);

  function handleSearch(text) {
    setSearch(text);

    const filteredData = favorites.filter(item =>
      item.title.toLowerCase().includes(text.toLowerCase())
    );

    setFiltered(filteredData);
  }

  if (loadingFavs) {
    return <ActivityIndicator style={{ flex: 1 }} />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: AppColors.beige }}>

      {/* HEADER */}
      <View style={{ padding: 22 }}>
        <Text style={{
          fontSize: 22,
          fontWeight: "700",
          color: AppColors.darkGreen
        }}>
          Your Favorite Recipes
        </Text>

        <Text style={{
          marginTop: 4,
          color: AppColors.brown,
          opacity: 0.6
        }}>
          Everything you love is here.
        </Text>
      </View>

      {/* SEARCH */}
      <TextInput
        placeholder="Search favorites..."
        value={search}
        onChangeText={handleSearch}
        style={{
          backgroundColor: "#eee",
          marginHorizontal: 16,
          padding: 10,
          borderRadius: 10,
          marginBottom: 10,
        }}
      />

      {/* GRID */}
      <FlatList
        data={filtered}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{
          paddingHorizontal: 10,
          paddingBottom: 120,
        }}
        renderItem={({ item }) => (
          <RecipeFavoriteCard
            image={item.image}
            title={item.title}
            instructions={item.instructions}
            onTap={() => navigation.navigate("Detail", { id: item.id })}
            onFavTap={() => toggle(item)}   // ✅ DOĞRU
          />
        )}
      />
    </View>
  );
}