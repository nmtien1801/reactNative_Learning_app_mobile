import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Layout from "../../component/lesson/Layout_Lesson";

export default function LessonComponent() {
  const lessons = [
    {
      id: "01",
      title: "Introduction to UX Design",
      duration: "21:23 mins",
      state: true,
    },
    {
      id: "02",
      title: "User Research Fundamentals",
      duration: "18:45 mins",
      state: false,
    },
    {
      id: "03",
      title: "Personas and User Scenarios",
      duration: "25:10 mins",
      state: false,
    },
    {
      id: "04",
      title: "Information Architecture",
      duration: "30:15 mins",
      state: false,
    },
    {
      id: "05",
      title: "Wireframing and Prototyping",
      duration: "28:30 mins",
      state: false,
    },
    {
      id: "06",
      title: "Usability Testing",
      duration: "22:45 mins",
      state: false,
    },
    {
      id: "07",
      title: "Visual Design Principles",
      duration: "26:20 mins",
      state: false,
    },
    {
      id: "08",
      title: "Interaction Design",
      duration: "24:55 mins",
      state: false,
    },
    {
      id: "09",
      title: "UX Writing and Content Strategy",
      duration: "20:40 mins",
      state: false,
    },
    {
      id: "10",
      title: "Accessibility in UX Design",
      duration: "23:15 mins",
      state: false,
    },
  ];

  const renderLessonItem = ({ item }) => (
    <View style={styles.lessonItem}>
      <View style={styles.lessonLeft}>
        <Text style={styles.lessonNumber}>{item.id}</Text>
        <View style={styles.lessonInfo}>
          <Text style={styles.lessonTitle}>{item.title}</Text>
          <Text style={styles.lessonDuration}>{item.duration}</Text>
        </View>
      </View>
      <Ionicons
        name={item.state ? "checkmark-circle" : "play-circle-outline"}
        size={24}
        color={item.state ? "#4CAF50" : "#666"}
      />
    </View>
  );

  return (
    <Layout>
      <View style={styles.lessonsList}>
        <FlatList
          data={lessons}
          renderItem={renderLessonItem}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
        />
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  lessonsList: {
    padding: 16,
  },
  lessonItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  lessonLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  lessonNumber: {
    width: 30,
    fontSize: 14,
    color: "#666",
  },
  lessonInfo: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 14,
    marginBottom: 4,
  },
  lessonDuration: {
    fontSize: 12,
    color: "#666",
  },
});
