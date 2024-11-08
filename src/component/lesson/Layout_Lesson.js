import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import Header from "./Header_Lesson";
import Nav from "./Nav_Lesson";
import Footer from "../../component/Footer";

export default function Layout({ children, navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Header />
        <Nav />
        <View style={styles.content}>{children}</View>
      </ScrollView>
      <Footer navigation={navigation} />
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
