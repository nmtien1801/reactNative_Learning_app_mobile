import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Sample data structure
const lessons = [
  {
    lessonID: "1",
    name: "I. Introduction",
    duration: "2hrs 25 mins",
    urlVideo: "https://example.com/video1",
    state: "active",
    imgVideo: require("../../../img/User_Profile/Digital.jpg"),
  },
  {
    lessonID: "2",
    name: "II. Vocabulary",
    duration: "3hrs 25 mins",
    urlVideo: "https://example.com/video2",
    state: "active",
    imgVideo: require("../../../img/User_Profile/Digital.jpg"),
  },
  {
    lessonID: "3",
    name: "III. Language Focus",
    duration: "4hrs 50 mins",
    urlVideo: "https://example.com/video3",
    state: "active",
    imgVideo: require("../../../img/User_Profile/Digital.jpg"),
  },
];

export default function LessonList() {
  const renderLesson = ({ item }) => (
    <View style={styles.lessonItem}>
      <Image source={item.imgVideo} style={styles.thumbnail} />
      <View style={styles.lessonInfo}>
        <Text style={styles.lessonName}>{item.name}</Text>
        <Text style={styles.duration}>{item.duration}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={[styles.actionButton, styles.editButton]}>
          <Ionicons name="pencil" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.deleteButton]}>
          <Ionicons name="trash-outline" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Lesson</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity style={[styles.actionButton, styles.addButton]}>
            <Ionicons name="add" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.projectButton]}>
            <Ionicons name="copy-outline" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.chapterTitle}>Chapter 1</Text>

      <FlatList
        data={lessons}
        renderItem={renderLesson}
        keyExtractor={(item) => item.lessonID}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerButtons: {
    flexDirection: "row",
    gap: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  chapterTitle: {
    fontSize: 16,
    fontWeight: "500",
    padding: 16,
    paddingBottom: 8,
  },
  listContent: {
    padding: 16,
  },
  lessonItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
  },
  lessonInfo: {
    flex: 1,
    marginLeft: 12,
  },
  lessonName: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  duration: {
    fontSize: 14,
    color: "#666",
  },
  actions: {
    flexDirection: "column",
    gap: 8,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  editButton: {
    backgroundColor: "#1DCCE4",
  },
  deleteButton: {
    backgroundColor: "#DD5159",
  },
  projectButton: {
    backgroundColor: "#F72585",
  },
  addButton: {
    backgroundColor: "#4CAF50",
  },
});
