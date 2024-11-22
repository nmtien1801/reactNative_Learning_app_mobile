import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  useFocusEffect,
} from "@react-navigation/native";

export default function Nav_Lesson({navigation, route}) {
  const [activeTab, setActiveTab] = useState("Learning_Lesson");
  
  useFocusEffect(
    React.useCallback(() => {
      setActiveTab(route.name);
    }, [route.name])
  );

  return (
    <View style={styles.container}>
      <View style={styles.tabs}>
        <TouchableOpacity
          style={styles.tabContainer}
          onPress={() => navigation.navigate("Learning_Lesson")}
        >
          <Text
            style={
              activeTab === "Learning_Lesson" ? styles.tabActive : styles.tab
            }
          >
            LESSONS
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabContainer}
          onPress={() => navigation.navigate("Learning_Project")}
        >
          <Text
            style={
              activeTab === "Learning_Project" ? styles.tabActive : styles.tab
            }
          >
            PROJECTS
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabContainer}
          onPress={() => navigation.navigate("Learning_QA")}
        >
          <Text
            style={activeTab === "Learning_QA" ? styles.tabActive : styles.tab}
          >
            Q&A
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  tabContainer: {
    paddingVertical: 8,
  },
  tab: {
    fontSize: 16,
    color: "#666",
  },
  tabActive: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#00BDD6",
    borderBottomWidth: 2, // Adds bottom border for underline effect
    borderBottomColor: "#00BDD6", // Blue color for the underline
  },
});
