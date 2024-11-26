import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { WebView } from "react-native-webview";
import HeaderCourseDetail from "../../header/Header-Course-Detail";
import { useDispatch, useSelector } from "react-redux";

export default function Header({ navigation, route }) {
  const urlVideo = useSelector((state) => state.lesson.urlVideo);
  console.log("urlVideo: ", urlVideo);
  

  return (
    <View style={styles.container}>
      {Platform.OS === "web" ? (
        // Dùng iframe cho nền web
        <iframe
          src={urlVideo}
          width="100%"
          height="300"
          title="YouTube Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ border: "none" }}
        ></iframe>
      ) : (
        // Dùng WebView cho Android/iOS
        <WebView
          source={{ uri: urlVideo }}
          style={{ flex: 1, width: "100%", height: 300 }}
        />
      )}

      {/* Course Info */}
      <View style={styles.courseInfo}>
        <Text style={styles.courseTitle}>
          UX Foundation: Introduction to User Experience Design
        </Text>
        <View style={styles.interactions}>
          <Text>231 Like</Text>
          <Text>16 Share</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    textAlign: "center",
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },

  courseInfo: {
    marginBottom: 12,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  interactions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
