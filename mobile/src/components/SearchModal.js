import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import SearchCard from "./SearchCard";
import { searchRecipes } from "../services/api";
import { AppColors } from "../AppColors";
import { useFavorites } from "../context/FavoritesContext";

const { width, height } = Dimensions.get("window");

const CARD_GAP = 12;
const MODAL_HORIZONTAL_PADDING = width * 0.05;
const CARD_WIDTH = (width - MODAL_HORIZONTAL_PADDING * 2 - CARD_GAP) / 2;

export default function SearchModal({ navigation, onClose }) {
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const { isFavorite, toggle } = useFavorites();

  const search = async (query) => {
    const trimmedQuery = query.trim();

    if (trimmedQuery.length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const data = await searchRecipes(trimmedQuery);


      console.log("IS ARRAY:", Array.isArray(data));

      setResults(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("SEARCH ERROR:", err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      search(searchText);
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [searchText]);

  const renderItem = ({ item }) => (
    <View style={styles.cardWrapper}>
      <SearchCard
        image={item.image}
        title={item.title}
        instructions={item.instructions || ""}
        isFavorite={isFavorite(item.id)}
        onPress={() => {
          if (onClose) {
            onClose();
          }

          navigation.navigate("Detail", {
            id: item.id,
          });
        }}
        onFavPress={() => toggle(item)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Ionicons name="search" size={20} color={AppColors.darkGreen} />

        <TextInput
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search…"
          placeholderTextColor={AppColors.mediumGreen}
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
        />

        {searchText.length > 0 && (
          <TouchableOpacity
            onPress={() => {
              setSearchText("");
              setResults([]);
            }}
          >
            <Ionicons
              name="close-circle"
              size={20}
              color={AppColors.darkGreen}
            />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.resultsContainer}>
        {loading ? (
          <View style={styles.center}>
            <ActivityIndicator />
          </View>
        ) : searchText.trim().length < 2 ? (
          <View style={styles.center}>
            <Text style={styles.noResultText}>Type at least 2 characters</Text>
          </View>
        ) : results.length === 0 ? (
          <View style={styles.center}>
            <Text style={styles.noResultText}>No results</Text>
          </View>
        ) : (
          <FlatList
            data={results}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.gridContent}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: height * 0.85,
    padding: MODAL_HORIZONTAL_PADDING,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  inputContainer: {
    height: 52,
    borderRadius: width * 0.08,
    backgroundColor: AppColors.lightGreen,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: AppColors.darkGreen,
  },
  resultsContainer: {
    flex: 1,
    marginTop: height * 0.02,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  noResultText: {
    color: AppColors.brown,
    fontSize: 15,
  },
  gridContent: {
    paddingTop: 8,
    paddingBottom: 24,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 12,
  },
  cardWrapper: {
    width: CARD_WIDTH,
  },
});