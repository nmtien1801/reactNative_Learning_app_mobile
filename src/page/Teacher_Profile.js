import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function TeacherProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Teacher's profile</Text>
        </View>
        <View style={styles.profileSection}>
          <Image
            source={require("../../img/Teacher_Profile/Teacher_Nen.jpg")}
            style={styles.bannerImage}
          />
          <Image
            source={require("../../img/Teacher_Profile/teacher.jpg")}
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
        <View style={styles.tabContainer}>
          <TouchableOpacity style={[styles.tab, styles.activeTab]}>
            <Text style={[styles.tabText, styles.activeTabText]}>OVERVIEW</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>COURSES</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>REVIEW</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.infoCard}>
          <View style={styles.infoCardHeader}>
            <Image
              source={require("../../img/Teacher_Profile/teacher.jpg")}
              style={styles.infoCardImage}
            />
            <View style={styles.infoCardText}>
              <Text style={styles.infoCardName}>Minh Tiến</Text>
              <Text style={styles.infoCardJob}>UX/UI Design</Text>
            </View>
            <TouchableOpacity style={styles.followButton}>
              <Text style={styles.followButtonText}>Follow</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionText}>
              Curabitur in semper lacerat nibh leo. Vivamus malesuada ipsum
              pulvinar non rutrum risus dui, risus. Purus massa velit iaculis
              tincidunt tortor, risus, scelerisque risus...
            </Text>
            <TouchableOpacity>
              <Text style={styles.seeMoreText}>See more</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.contactContainer}>
            <Text style={styles.contactTitle}>Contact</Text>
            <View style={styles.contactItem}>
              <Ionicons name="call-outline" size={20} color="#666" />
              <Text style={styles.contactText}>0967273063</Text>
            </View>
            <View style={styles.contactItem}>
              <Ionicons name="location-outline" size={20} color="#666" />
              <Text style={styles.contactText}>
                1/15/4 Nguyễn Thái Sơn, Phường 3, Gò Vấp, TP HCM
              </Text>
            </View>
            <View style={styles.contactItem}>
              <Ionicons name="mail-outline" size={20} color="#666" />
              <Text style={styles.contactText}>nickname1801@gmail.com</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottomNav}>
        <Ionicons name="home-outline" size={24} color="#000" />
        <Ionicons name="search-outline" size={24} color="#000" />
        <Ionicons name="book-outline" size={24} color="#000" />
        <Ionicons name="person-outline" size={24} color="#000" />
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
  activeTabText: {
    color: "#4A90E2",
    fontWeight: "bold",
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
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  followButtonText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  descriptionContainer: {
    marginBottom: 16,
  },
  descriptionText: {
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
  },
  seeMoreText: {
    color: "#4A90E2",
    fontSize: 14,
    marginTop: 8,
  },
  contactContainer: {
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    paddingTop: 16,
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
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#FFF",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
});
