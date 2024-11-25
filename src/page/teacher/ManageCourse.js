import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Footer from "../../component/footer/FooterTeacher";
import { getAllCourseUser } from "../../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";

export default function ManageCourse({ navigation, route }) {
  const user = useSelector((state) => state.auth.user); // lấy thông tin user login
  const listCourse = useSelector((state) => state.user.listCourse); // lấy danh sách khóa học của user
  const dispatch = useDispatch();

  const [courses, setCourses] = useState([]); // state lưu danh sách khoá học của user

  useEffect(() => {
    // dispatch(getAllCourseUser(user._id)); // lấy danh sách khoá học của user
    dispatch(getAllCourseUser(1)); // lấy danh sách khoá học của user
  }, []);

  useEffect(() => {
    setCourses(listCourse);
  }, [listCourse]);

  const renderCourseItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate("ManageLesson")}>
      <View style={styles.courseCard}>
        <Image
          source={{uri: item.image}}
          style={styles.courseImage}
        />
        <View style={styles.courseInfo}>
          <Text style={styles.courseTitle} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.courseDuration}>{item.title}</Text>
          <Text style={styles.courseCategory}>
            <Text style={{ fontSize: 15, fontWeight: "Medium", color: "#000" }}>
              Categories:
            </Text>{" "}
            {item.Category?.name}
          </Text>
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity onPress={() => navigation.navigate("FormCourse")}>
            <View style={[styles.iconButton, styles.editButton]}>
              <Ionicons name="pencil" size={18} color="#fff" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={[styles.iconButton, styles.trashButton]}>
              <Ionicons name="trash" size={18} color="#FFF" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.title}>My course</Text>

        <TouchableOpacity onPress={() => navigation.navigate("FormCourse")}>
          <View style={[styles.iconButton, styles.addButton]}>
            <Ionicons name="add" size={18} color="#FFf" />
          </View>
        </TouchableOpacity>
      </View>

      <FlatList
        data={courses}
        renderItem={renderCourseItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false} // ẩn thanh cuộn
        contentContainerStyle={styles.listContainer} // style cho cái view bao bọc FlatList
      />

      <Footer navigation={navigation} route={route} showActive="book" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 16,
    alignItems: "center",
    backgroundColor: "#fff",
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#000",
  },

  listContainer: {
    padding: 16,
  },
  courseCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 4,
    marginBottom: 8,
    padding: 12,
    elevation: 2,
    overflow: "hidden",
  },
  courseImage: {
    width: 80,
    height: 80,
    borderRadius: 4,
  },
  courseInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center",
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 4,
  },
  courseDuration: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  courseCategory: {
    fontSize: 14,
    color: "#666",
  },
  actionButtons: {
    justifyContent: "space-between",
    paddingLeft: 8,
  },
  iconButton: {
    width: 32,
    height: 32,
    borderRadius: 3,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    overflow: "hidden",
    // Shadow for Android
    elevation: 15,
  },
  editButton: {
    backgroundColor: "#1DCCE4",
  },
  trashButton: {
    backgroundColor: "#DD5159",
  },
  addButton: {
    backgroundColor: "#69E41D",
    marginLeft: 20,
    justifyContent: "center",
    borderRadius: "50%",
    padding: 25,
  },
});
