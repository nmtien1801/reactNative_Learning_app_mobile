import React from "react";
import { View, Text, Image, StyleSheet, SafeAreaView } from "react-native";

export default function Header_Teacher() {
  return (
    <SafeAreaView style={styles.container}>
      {/* <ScrollView> */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Teacher's profile</Text>
      </View>
      <View style={styles.profileSection}>
        <Image
          source={require("../../../img/Teacher_Profile/Teacher_Nen.jpg")}
          style={styles.bannerImage}
        />
        <Image
          source={require("../../../img/Teacher_Profile/teacher.jpg")}
          style={styles.profileImage}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.teacherName}>Minh Tiến</Text>
          <View style={styles.jobTitleContainer}>
            <Text style={styles.jobTitle}>UX/UI Designer</Text>
            <View style={styles.teacherTag}>
              <Text style={styles.teacherTagText}>Teacher</Text>
            </View>
          </View>
          <Text style={styles.timeZone}>Korea • 9:30 AM</Text>
        </View>
      </View>

      {/* </ScrollView> */}
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
