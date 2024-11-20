import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeacherOverview } from "../../redux/teacherSlide"; // Import action
import { Ionicons } from "@expo/vector-icons";

export default function TeacherProfileScreen() {
  const dispatch = useDispatch();

  // Dữ liệu từ Redux store
  const { teacherOverview, isLoading, isError } = useSelector(
    (state) => state.teacher
  );

  // ID giáo viên (có thể thay đổi theo trường hợp thực tế)
  const teacherID = 1;

  // Gửi yêu cầu lấy dữ liệu khi component được mount
  useEffect(() => {
    dispatch(fetchTeacherOverview(teacherID));
  }, [dispatch, teacherID]);

  // Nếu đang tải
  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4A90E2" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Nếu có lỗi
  if (isError) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Failed to load teacher data</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Nếu không có dữ liệu
  if (!teacherOverview || Object.keys(teacherOverview).length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>No data available</Text>
        </View>
      </SafeAreaView>
    );
  } else {
    console.log("teacherOverview header", teacherOverview);
  }

  // Destructure dữ liệu giáo viên
  const { userName, image, description, email, phone, address } =
    teacherOverview;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Teacher's profile</Text>
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={
            image
              ? { uri: image }
              : require("../../../img/Teacher_Profile/Teacher_Nen.jpg")
          } // Banner image
          style={styles.bannerImage}
        />
        <Image
          source={
            image
              ? { uri: image }
              : require("../../../img/Teacher_Profile/teacher.jpg")
          } // Profile image
          style={styles.profileImage}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.teacherName}>{userName}</Text>
          <View style={styles.jobTitleContainer}>
            <Text style={styles.jobTitle}>UX/UI Designer</Text>{" "}
            {/* Có thể thay đổi nếu cần */}
            <View style={styles.teacherTag}>
              <Text style={styles.teacherTagText}>Teacher</Text>
            </View>
          </View>
          <Text style={styles.timeZone}>Korea • 9:30 AM</Text>{" "}
          {/* Có thể thay đổi nếu cần */}
        </View>
      </View>

      {/* Contact Information
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
      </View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    padding: 16,
    backgroundColor: "#FFF",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  bannerImage: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#FFF",
    position: "absolute",
    top: 100,
  },
  profileInfo: {
    alignItems: "center",
    marginTop: 60,
  },
  teacherName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  jobTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  jobTitle: {
    fontSize: 16,
    color: "#666",
  },
  teacherTag: {
    backgroundColor: "#4A90E2",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 8,
  },
  teacherTagText: {
    color: "#FFF",
    fontSize: 12,
  },
  timeZone: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  contactContainer: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  contactText: {
    fontSize: 14,
    color: "#333",
    marginLeft: 8,
    flex: 1,
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  loadingText: {
    fontSize: 16,
    color: "#4A90E2",
  },
  errorContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  errorText: {
    fontSize: 16,
    color: "red",
  },
});
