import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  CheckBox,
  Image
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

const HeaderCourseDetail = ({ navigation, route }) => {

  return (
    <View style={styles.header}>
    <TouchableOpacity
      style={styles.backButton}
      onPress={() => navigation.goBack()}
    >
      <Ionicons name="chevron-back" size={24} color="black" />
    </TouchableOpacity>
    <Text style={styles.titleBar}>Course details</Text>
    <View style={styles.rightIcons}>
      <TouchableOpacity style={styles.iconButton}>
        <Ionicons name="bookmark-outline" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconButton}
        onPress={() => navigation.openDrawer()}
      >
        <Ionicons name="ellipsis-vertical" size={24} color="black" />
      </TouchableOpacity>
    </View>
  </View>
  );
};

const styles = StyleSheet.create({
  

  backButton: {
    padding: 4,
  },
  titleBar: {
    fontSize: 18,
    fontWeight: "bold",
  },
  rightIcons: {
    flexDirection: "row",
  },
  iconButton: {
    padding: 4,
    marginLeft: 16,
  },
});

export default HeaderCourseDetail;
