import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";

import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native";

export default function Nav_Teacher() {
  const navigation = useNavigation();
  const route = useRoute();
  const [activeTab, setActiveTab] = useState("TeacherOverview");

  useFocusEffect(
    React.useCallback(() => {
      setActiveTab(route.name);
    }, [route.name])
  );
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab]}
          onPress={() => navigation.navigate("TeacherOverview")}
        >
          <Text
            style={
              activeTab === "TeacherOverview" ? styles.tabActive : styles.tab
            }
          >
            OVERVIEW
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => navigation.navigate("TeacherCourses")}
        >
          <Text
            style={
              activeTab === "TeacherCourses" ? styles.tabActive : styles.tab
            }
          >
            COURSES
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => navigation.navigate("TeacherReviews")}
        >
          <Text
            style={
              activeTab === "TeacherReviews" ? styles.tabActive : styles.tab
            }
          >
            REVIEW
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#FFF",
    paddingVertical: 12,
    marginBottom: 16,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#4A90E2",
  },
  tabText: {
    fontSize: 14,
    color: "#666",
  },
  tabActive: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#00BDD6",
    borderBottomWidth: 2,
    borderBottomColor: "#00BDD6",
  },
});
