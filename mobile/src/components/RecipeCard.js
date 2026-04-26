import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppColors } from "../AppColors"; 

export default function RecipeCard({ recipe, onPress, onToggleFav, isFav}) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: recipe.image }} style={styles.image} />

      <View style={styles.overlay}>
        <Text style={styles.title}>{recipe.title}</Text>

        <TouchableOpacity onPress={onToggleFav}>
          <Ionicons
            name={isFav ? "heart" : "heart-outline"}
            size={24}
            color={AppColors.darkGreen} 
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    borderRadius: 15,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 180,
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});