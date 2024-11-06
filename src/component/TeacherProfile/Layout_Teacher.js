import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import Header from "./Header_Teacher";
import Nav from "./Nav_Teacher";
import Footer from "../Footer";

export default function Layout({ children }) {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Header />
        <Nav />
        <View style={styles.content}>{children}</View>
      </ScrollView>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  content: {
    flex: 1,
    padding: 16,
  },
});
