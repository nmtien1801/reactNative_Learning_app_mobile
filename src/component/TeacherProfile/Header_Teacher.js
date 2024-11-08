// TeacherProfileScreen.js
import React from "react";
import { View, Text, Image, StyleSheet, SafeAreaView } from "react-native";

export default function TeacherProfileScreen() {
  // Dữ liệu của giáo viên
  const teacherData = {
    name: "Minh Tiến",
    jobTitle: "UX/UI Designer",
    tag: "Teacher",
    timeZone: "Korea • 9:30 AM",
    bannerImage: require("../../../img/Teacher_Profile/Teacher_Nen.jpg"),
    profileImage: require("../../../img/Teacher_Profile/teacher.jpg"),
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Teacher's profile</Text>
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={teacherData.bannerImage} // Dữ liệu banner image
          style={styles.bannerImage}
        />
        <Image
          source={teacherData.profileImage} // Dữ liệu profile image
          style={styles.profileImage}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.teacherName}>{teacherData.name}</Text>
          {/* Dữ liệu tên giáo viên */}
          <View style={styles.jobTitleContainer}>
            <Text style={styles.jobTitle}>{teacherData.jobTitle}</Text>
            {/* Dữ liệu công việc */}
            <View style={styles.teacherTag}>
              <Text style={styles.teacherTagText}>{teacherData.tag}</Text>
              {/* Dữ liệu tag */}
            </View>
          </View>
          <Text style={styles.timeZone}>{teacherData.timeZone}</Text>
          {/* Dữ liệu timezone */}
        </View>
      </View>
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
});
