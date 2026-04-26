import React, { useCallback , useState } from "react";
import { View, Text, TextInput, FlatList, ActivityIndicator } from "react-native";
import { useFocusEffect } from "@react-navigation/native";


import RecipeFavoriteCard from "../components/RecipeFavoriteCard";
import { fetchFavorites, toggleFavorite } from "../services/api";
import { AppColors } from "../AppColors";

export default function FavoritesScreen({ navigation }) {
  const [favorites, setFavorites] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   load();
  // }, []);

  useFocusEffect(
    useCallback(() => {
      load(); // her ekrana gelince çalışır
    }, [])
  );

  async function load() {
    try {
      setLoading(true);
      const data = await fetchFavorites();
      setFavorites(data);
      setFiltered(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

    function handleSearch(text) {
    setSearch(text);

    const filteredData = favorites.filter(item =>
      item.title.toLowerCase().includes(text.toLowerCase())
    );

    setFiltered(filteredData);
  }

    async function handleToggle(recipe) {
    await toggleFavorite(recipe);
    load(); // DB’den tekrar çek
  }

    if (loading) {
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
            onTap={() =>
              navigation.navigate("Detail", { id: item.id })
            }
            onFavTap={() => handleToggle(item)}
          />
        )}
      />
    </View>
  );
}