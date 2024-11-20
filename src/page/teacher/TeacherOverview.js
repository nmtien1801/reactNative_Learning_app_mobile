// screens/TeacherOverview.js

import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Layout from "../../component/TeacherProfile/Layout_Teacher";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeacherOverview } from "../../redux/teacherSlide";
import { useToast } from "../../component/customToast"; // Toast for messages

export default function TeacherOverview() {
  const dispatch = useDispatch();
  const { teacherOverview, isLoading, isError } = useSelector(
    (state) => state.teacher
  );
  const { showToast } = useToast();

  const teacherID = 1;

  useEffect(() => {
    dispatch(fetchTeacherOverview(teacherID)); // Truyền teacherID trực tiếp
  }, [dispatch]);

  // Loading state
  if (isLoading) {
    return (
      <Layout>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4A90E2" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </Layout>
    );
  }

  // Error state
  if (isError) {
    showToast("Failed to load teacher data");
    return (
      <Layout>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Failed to load data</Text>
        </View>
      </Layout>
    );
  }

  // No data available
  if (!teacherOverview) {
    console.log("No data available", teacherOverview);

    return (
      <Layout>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>No data available</Text>
        </View>
      </Layout>
    );
  }
  if (teacherOverview) {
    console.log("data available", teacherOverview);
  }

  // Destructure teacher data
  const { name, img, description, email, phone, address } = teacherOverview;

  return (
    <Layout>
      <View style={styles.infoCard}>
        <View style={styles.infoCardHeader}>
          <Image
            source={
              image
                ? { uri: image }
                : require("../../../img/Teacher_Profile/teacher.jpg")
            } // Image mặc định nếu không có ảnh
            style={styles.infoCardImage}
          />
          <View style={styles.infoCardText}>
            <Text style={styles.infoCardName}>{name}</Text>
            <Text style={styles.infoCardJob}>UX/UI Design</Text>
          </View>
          <TouchableOpacity style={styles.followButton}>
            <Text style={styles.followButtonText}>Follow</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>{description}</Text>
          <TouchableOpacity>
            <Text style={styles.seeMoreText}>See more</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.contactContainer}>
          <Text style={styles.contactTitle}>Contact</Text>
          <View style={styles.contactItem}>
            <Ionicons name="call-outline" size={20} color="#666" />
            <Text style={styles.contactText}>{phone}</Text>
          </View>
          <View style={styles.contactItem}>
            <Ionicons name="location-outline" size={20} color="#666" />
            <Text style={styles.contactText}>{address}</Text>
          </View>
          <View style={styles.contactItem}>
            <Ionicons name="mail-outline" size={20} color="#666" />
            <Text style={styles.contactText}>{email}</Text>
          </View>
        </View>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: "#FF0000",
  },
  infoCard: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 16,
  },
  infoCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  infoCardImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  infoCardText: {
    flex: 1,
    marginLeft: 12,
  },
  infoCardName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  infoCardJob: {
    fontSize: 14,
    color: "#666",
  },
  followButton: {
    backgroundColor: "#4A90E2",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  followButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  descriptionContainer: {
    marginTop: 16,
    marginBottom: 16,
  },
  descriptionText: {
    fontSize: 14,
    color: "#666",
  },
  seeMoreText: {
    fontSize: 14,
    color: "#4A90E2",
    marginTop: 4,
  },
  contactContainer: {
    marginTop: 16,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  contactText: {
    marginLeft: 8,
    flex: 1,
  },
});
