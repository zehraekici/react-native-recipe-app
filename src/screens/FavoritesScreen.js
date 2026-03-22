import React from "react";
import { View, Text, TextInput, FlatList } from "react-native";

export default function FavoritesScreen() {
  return (
    <View style={{ flex: 1, padding: 10 }}>
      <TextInput
        placeholder="Search favorites..."
        style={{
          backgroundColor: "#eee",
          padding: 10,
          borderRadius: 10,
          marginBottom: 10,
        }}
      />

      <FlatList
        data={[]}
        numColumns={2}
        renderItem={() => <Text>Card</Text>}
      />
    </View>
  );
}