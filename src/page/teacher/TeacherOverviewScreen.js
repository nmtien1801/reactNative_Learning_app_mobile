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
import Header_Teacher from "../../component/TeacherProfile/Header_Teacher";
import Nav_Teacher from "../../component/TeacherProfile/Nav_Teacher";
import { useNavigation } from "@react-navigation/native";
import Footer from "../../component/Footer";

export default function TeacherOverViewScreen({navigation, route}) {

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Header_Teacher />
        <Nav_Teacher />
        <View style={styles.infoCard}>
          <View style={styles.infoCardHeader}>
            <Image
              source={require("../../../img/Teacher_Profile/teacher.jpg")}
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
      <Footer navigation={navigation} route={route}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
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

