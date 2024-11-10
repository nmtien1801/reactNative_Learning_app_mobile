import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  CheckBox,
  Image,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

const HeaderCart = ({ navigation, route }) => {
  return (
    <View style={styles.header}>
      <View style={{flexDirection:'row', alignItems: 'center', gap: 20}}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Giỏ Hàng</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("historyCart")}>
        <Text style={styles.headerRight}>lịch sử mua</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  headerRight: {
    color: "#6366f1",
    fontSize: 14,
  },
  backButton: {
    padding: 4,
  },
});

export default HeaderCart;
