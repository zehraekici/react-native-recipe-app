import React from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";

export default function DetailScreen({ route }) {
  const { recipe } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={recipe.image} style={styles.image} />

      <Text style={styles.title}>{recipe.title}</Text>

      <Text style={styles.section}>Ingredients</Text>
      <Text>- Item 1\n- Item 2\n- Item 3</Text>

      <Text style={styles.section}>Instructions</Text>
      <Text>Step 1...\nStep 2...\nStep 3...</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 15 },
  image: { width: "100%", height: 250, borderRadius: 10 },
  title: { fontSize: 24, fontWeight: "bold", marginVertical: 10 },
  section: { fontSize: 18, marginTop: 15, fontWeight: "600" },
});