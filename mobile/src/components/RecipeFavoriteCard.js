import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppColors } from "../AppColors";

export default function RecipeFavoriteCard({
  image,
  title,
  instructions,
  onTap,
  onFavTap,
}) {
  return (
    <TouchableOpacity style={styles.card} onPress={onTap}>
      
      {/* IMAGE */}
      <Image source={{ uri: image }} style={styles.image} />

      {/* GRADIENT */}
      <View style={styles.gradient} />

      {/* TEXT */}
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {instructions}
        </Text>
      </View>

      {/* HEART */}
      <TouchableOpacity
        onPress={(e) => {
          e.stopPropagation();
          onFavTap();
        }}
        style={styles.heart}
      >
        <Ionicons
          name="heart"
          size={18}
          color={AppColors.darkGreen}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 6,
    height: 160,
    borderRadius: 14,
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },

  gradient: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)", // basit gradient yerine
  },

  textContainer: {
    position: "absolute",
    bottom: 12,
    left: 10,
    right: 10,
  },

  title: {
    color: AppColors.beige,
    fontSize: 16,
    fontWeight: "600",
  },

  subtitle: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 12,
    marginTop: 2,
  },

  heart: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: AppColors.lightGreen,
    justifyContent: "center",
    alignItems: "center",
  },
});