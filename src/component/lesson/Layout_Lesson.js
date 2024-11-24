import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import Header from "./Header_Lesson";
import Nav from "./Nav_Lesson";
import Footer from "../../component/Footer";

export default function Layout({ children, navigation , route}) {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Header navigation={navigation} route={route}/>
        <Nav navigation={navigation} route={route}/>
        <View style={styles.content}>{children}</View>
      </ScrollView>
      <Footer navigation={navigation} route={route} showActive="book" />

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
    // flex: 1,
    padding: 16,
  },
});
