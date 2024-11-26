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
import { useToast } from "../../component/customToast";

export default function TeacherOverview({ navigation, route }) {
  const dispatch = useDispatch();
  const { teacherOverview, isLoading, isError } = useSelector(
    (state) => state.teacher
  );
  const user = useSelector((state) => state.auth.user);

  const toast = useToast();

  // const teacherID = 1; // ID của giáo viên
  const teacherID = route.params.params?.teacherID ?? user._id;// ID của giáo viên

  // Fetch dữ liệu khi component được mount
  useEffect(() => {
    dispatch(fetchTeacherOverview(teacherID));
  }, [dispatch, teacherID]);

  // Destructure dữ liệu giáo viên và cung cấp giá trị mặc định
  const { userName, image, description, email, phone, address, title } =
    teacherOverview?.DT || {};
    
  return (
    <Layout navigation={navigation} route={route}>
      <View style={styles.infoCard}>
        <View style={styles.infoCardHeader}>
          <Image
            source={
              image
                ? { uri: image }
                : require("../../../img/Teacher_Profile/teacher.jpg")
            }
            style={styles.infoCardImage}
          />
          <View style={styles.infoCardText}>
            <Text style={styles.infoCardName}>{userName}</Text>
            <Text style={styles.infoCardJob}>{title}</Text>
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
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  loadingText: {
    marginTop: 10,
    color: "#4A90E2",
  },
  errorContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
});
