import React from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import { AppColors } from "../AppColors";

export default function SearchCard({
  image,
  title,
  instructions,
  isFavorite,
  onPress,
  onFavPress,
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={styles.container}
    >
      <ImageBackground
        source={{ uri: image }}
        style={styles.image}
        imageStyle={styles.imageRadius}
      >
        <LinearGradient
          colors={["rgba(0,0,0,0.05)", "rgba(0,0,0,0.55)"]}
          style={styles.gradient}
        />

        <View style={styles.textContainer}>
          <Text numberOfLines={1} style={styles.title}>
            {title}
          </Text>

          <Text numberOfLines={1} style={styles.instructions}>
            {instructions}
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onFavPress}
          style={styles.favoriteButton}
        >
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={20}
            color={AppColors.darkGreen}
          />
        </TouchableOpacity>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 14,
    overflow: "hidden",
  },
  image: {
    height: 210,
    justifyContent: "flex-end",
  },
  imageRadius: {
    borderRadius: 14,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 14,
  },
  textContainer: {
    position: "absolute",
    left: 10,
    right: 10,
    bottom: 12,
  },
  title: {
    color: AppColors.beige,
    fontSize: 16,
    fontWeight: "600",
  },
  instructions: {
    marginTop: 2,
    color: "rgba(245, 239, 220, 0.85)",
    fontSize: 13,
    fontWeight: "400",
  },
  favoriteButton: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(196, 220, 170, 0.85)",
    alignItems: "center",
    justifyContent: "center",
  },
});