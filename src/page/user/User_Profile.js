import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Footer from "../../component/footer/FooterUser";
import { useToast } from "../../component/customToast";

import { useDispatch, useSelector } from "react-redux";
import { getSaveCourseOfUser } from "../../redux/userSlice";

export default function UserProfileScreen({ navigation, route }) {
  const user = useSelector((state) => state.auth.user); // lấy thông tin user login
  const listCourse = useSelector((state) => state.user.listCourse); // lấy danh sách khóa học của user
  const dispatch = useDispatch();

  const [courseOfUser, setCourseOfUser] = useState([]); //state lưu danh sách khóa học của user

  useEffect(() => {
    dispatch(getSaveCourseOfUser(user._id)); // id user login
  }, []);

  // course của user
  useEffect(() => {
    if (listCourse) {
      setCourseOfUser(listCourse);
    }
  }, [listCourse]);

  // Mảng dữ liệu người dùng bao gồm thông tin cá nhân và hình ảnh
  const userData = {
    name: user.userName,
    title: user.title,
    bannerImage: require("../../../img/User_Profile/UserProfile1.png"),
    profileImage: user.image, // chưa sửa
    stats: {
      save: courseOfUser.totalCourses,
      ongoing: courseOfUser.totalCoursesState1,
      completed: courseOfUser.totalCoursesState2,
    },
    courses: courseOfUser.courses?.map((course) => {
      return {
        id: course.courseID,
        image: course.courseImage, // chưa sửa
        title: course.courseName,
        author: course.teacherName,
        price: course.price,
        rating: course.averageRating,
        lessons: course.totalLessons,
      };
    }),
  };

  const Item = ({ image, title, author, price, rating, lessons, courseID }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("courseDetailOverView", { courseID: courseID })
      }
    >
      <View style={styles.courseItem}>
        <Image source={image} style={styles.courseImage} />
        <View style={styles.courseInfo}>
          <Text style={styles.courseTitle}>{title}</Text>
          <Text style={styles.courseAuthor}>{author}</Text>
          <View style={styles.courseDetails}>
            <Text style={styles.coursePrice}>${price}</Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.ratingText}>{rating}</Text>
            </View>
            <Text style={styles.lessonCount}>{lessons} lessons</Text>
          </View>
        </View>
        <Ionicons name="bookmark" style={styles.bookmarkIcon} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.profileSection}>
          <Image source={userData.bannerImage} style={styles.bannerImage} />
          <Image source={userData.profileImage} style={styles.profileImage} />
          <Text style={styles.userName}>{userData.name}</Text>
          <Text style={styles.userTitle}>{userData.title}</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userData.stats.save}</Text>
              <Text style={styles.statLabel}>Save</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userData.stats.ongoing}</Text>
              <Text style={styles.statLabel}>On going</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userData.stats.completed}</Text>
              <Text style={styles.statLabel}>Completed</Text>
            </View>
          </View>
        </View>
        <View style={styles.savedCoursesSection}>
          <Text style={styles.sectionTitle}>Saved courses</Text>

          <FlatList
            data={userData.courses}
            renderItem={({ item }) => (
              <Item
                image={item.image}
                title={item.title}
                author={item.author} // tên giáo viên
                price={item.price}
                rating={item.rating}
                lessons={item.lessons}
                courseID={item.id}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            nestedScrollEnabled={true} // Kích hoạt cuộn lồng nhau -> do lồng trong scrollView
          />
        </View>
      </ScrollView>
      <Footer navigation={navigation} route={route} showActive="person" />
    </View>
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
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 60,
  },
  userTitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
  },
  savedCoursesSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  courseItem: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 8,
    marginBottom: 16,
    padding: 12,
  },
  courseImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  courseInfo: {
    flex: 1,
    marginLeft: 12,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  courseAuthor: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  courseDetails: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  coursePrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4A90E2",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 12,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
  },
  lessonCount: {
    fontSize: 14,
    color: "#666",
    marginLeft: 12,
  },
  bookmarkIcon: {
    position: "absolute",
    top: 12,
    right: 12,
    fontSize: 24,
    color: "#4A90E2",
  },
});
