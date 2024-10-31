import React from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Footer() {
  return (
    <View style={styles.bottomNav}>
      <Ionicons name="home-outline" size={24} color="#000" />
      <Ionicons name="search-outline" size={24} color="#000" />
      <Ionicons name="book-outline" size={24} color="#000" />
      <Ionicons name="person" size={24} color="#4A90E2" />
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#FFF",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
});
