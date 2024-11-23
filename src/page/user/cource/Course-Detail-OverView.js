import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { WebView } from "react-native-webview";
import { useToast } from "../../../component/customToast";

import { useDispatch, useSelector } from "react-redux";
import { findCourseByID, findCourseSimilar } from "../../../redux/courseSlice";

function BenefitItem({ icon, text }) {
  return (
    <View style={styles.benefitItem}>
      <Ionicons
        name={icon}
        size={24}
        color="#00BCD4"
        style={styles.benefitIcon}
      />
      <Text style={styles.benefitText}>{text}</Text>
    </View>
  );
}

export default function CourseDetailOverView({ navigation, route }) {
  const courseDetail = useSelector((state) => state.course.courseDetail); // lấy thông tin top teacher
  const listCourseSimilar = useSelector(
    (state) => state.course.listCourseSimilar
  ); // lấy thông tin top teacher
  const [course, setCourse] = useState({});
  const [listSimilar, setListSimilar] = useState([]); // Danh sách course tương tự
  const dispatch = useDispatch();
  const courseID = route.params.params?.courseID; // lấy sẵn id để truyền vào cart

  useEffect(() => {
    dispatch(findCourseByID(route.params.params?.courseID)); // Gửi action để lấy thông tin course
    dispatch(findCourseSimilar(route.params.params?.courseID)); // Gửi action để lấy thông tin course tương tự
  }, []);

  // top-page detail course
  useEffect(() => {
    setCourse(courseDetail);
  }, [courseDetail]);

  // similar course
  useEffect(() => {
    if (listCourseSimilar.length !== 0) {
      setListSimilar([
        ...listSimilar,
        ...listCourseSimilar.map((course, index) => ({
          id: course.id, // Sử dụng kết hợp giữa id và index để đảm bảo tính duy nhất
          title: course.name,
          instructor: course.UserFollow[0]?.user.userName, // người tạo khóa học
          price: course.Orders[0]?.OrderDetail?.price,
          rating: course.averageRating,
          reviews: course.totalRating,
          lessons: course.totalLessons,
          image: "https://v0.dev/placeholder.svg?height=200&width=200",
          bookmarked: false, // css màu xanh cho icon bookmark
        })),
      ]);
    }
  }, [listCourseSimilar]);

  const CourseCard = ({
    id,
    title,
    instructor,
    price,
    rating,
    reviews,
    lessons,
    image,
    bookmarked,
  }) => (
    <TouchableOpacity
      style={styles.card}
      // reset lại trang với thông tin khóa học mới
      onPress={() =>
        navigation.replace("courseDetailOverView", { courseID: id })
      } // chuyển sang trang chi tiết khóa học
    >
      <Image source={{ uri: image }} style={styles.thumbnail} />
      <View style={styles.cardContent}>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.instructor}>{instructor}</Text>
          <Text style={styles.price}>${price}</Text>
          <View style={styles.ratingContainerListCourse}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.rating}>{rating}</Text>
            <Text style={styles.reviews}>({reviews})</Text>
            <Text style={styles.lessons}>{lessons} lessons</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.bookmarkButton}>
          <Ionicons
            name={bookmarked ? "bookmark" : "bookmark-outline"}
            size={24}
            color={bookmarked ? "#00BCD4" : "#757575"}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        {Platform.OS === "web" ? (
          // Dùng iframe cho nền web
          <iframe
            src="https://www.youtube.com/embed/147SkAVXEqM"
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
            source={{ uri: "https://www.youtube.com/embed/147SkAVXEqM" }}
            style={{ flex: 1, width: "100%", height: 300 }}
          />
        )}

        <View style={styles.courseInfo}>
          <Text style={styles.courseSubtitle}>
            {course.name}: {course.title}
          </Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>
              {course.averageRating} ({course.totalRating}) •{" "}
              {course.totalLessons} lessons
            </Text>
          </View>
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity style={[styles.tab, styles.activeTab]}>
            <Text style={[styles.tabText, styles.activeTabText]}>OVERVIEW</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tab}
            onPress={() =>
              navigation.navigate("courseDetailLesson", {
                courseID: route.params.params?.courseID,
              })
            }
          >
            <Text style={styles.tabText}>LESSONS</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tab}
            onPress={() =>
              navigation.navigate("courseDetailReview", {
                courseID: route.params.params?.courseID,
              })
            }
          >
            <Text style={styles.tabText}>REVIEW</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.instructorContainer}>
            <Image
              source={{ uri: "https://v0.dev/placeholder.svg" }}
              style={styles.instructorImage}
            />
            <View style={styles.instructorInfo}>
              <Text style={styles.instructorName}>
                {course?.UserFollow?.length > 0 &&
                  course.UserFollow[0]?.user.userName}
              </Text>
              <Text style={styles.instructorTitle}>
                {course?.UserFollow?.length > 0 &&
                  course.UserFollow[0]?.user.title}
              </Text>
            </View>
            <TouchableOpacity style={styles.followButton}>
              <Text style={styles.followButtonText}>Follow</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Description</Text>
              <Text style={styles.description}>{course.description}</Text>
              <TouchableOpacity>
                <Text style={styles.seeMoreText}>See more</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Benefits</Text>
              <View style={styles.benefitsList}>
                <BenefitItem icon="videocam" text="14 hours on-demand video" />
                <BenefitItem icon="globe" text="Native teacher" />
                <BenefitItem icon="document-text" text="100% free document" />
                <BenefitItem icon="time" text="Full lifetime access" />
                <BenefitItem icon="ribbon" text="Certificate of complete" />
                <BenefitItem icon="checkmark-circle" text="24/7 support" />
              </View>
            </View>
          </View>

          <ScrollView style={[styles.container, styles.containerPadding]}>
            <Text style={styles.sectionTitle}>Similar courses</Text>
            {listSimilar.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>
            ${course?.Orders?.length > 0 && course.Orders[0]?.OrderDetail.price}
          </Text>
          <Text style={styles.originalPrice}>$1020</Text>
        </View>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={() => navigation.navigate("cart", courseID)}
        >
          <Text style={styles.addToCartText}>Add to cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  statusBar: {
    height: 44,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  time: {
    fontSize: 15,
    fontWeight: "bold",
  },
  icons: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginLeft: 6,
  },
  batteryContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 6,
  },
  battery: {
    width: 22,
    height: 11,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 2,
    justifyContent: "center",
    padding: 1,
  },
  batteryLevel: {
    width: "100%",
    height: "100%",
    backgroundColor: "black",
  },
  batteryTip: {
    width: 1,
    height: 4,
    backgroundColor: "black",
    marginLeft: 1,
  },

  courseHeader: {
    backgroundColor: "#7C4DFF",
    padding: 16,
    height: 200,
    justifyContent: "flex-end",
  },
  courseCategory: {
    color: "#fff",
    fontSize: 14,
  },
  courseTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 8,
  },
  playButton: {
    position: "absolute",
    right: 16,
    bottom: 16,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  courseInfo: {
    padding: 16,
  },
  courseSubtitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  ratingText: {
    marginLeft: 4,
    color: "#757575",
  },

  tabContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#00BCD4",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#757575",
  },
  activeTabText: {
    color: "#00BCD4",
  },

  content: {
    padding: 16,
  },
  instructorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  instructorImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  instructorInfo: {
    marginLeft: 12,
    flex: 1,
  },
  instructorName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  instructorTitle: {
    fontSize: 14,
    color: "#757575",
  },
  followButton: {
    backgroundColor: "#E0F7FA",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  followButtonText: {
    color: "#00BCD4",
    fontWeight: "bold",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#424242",
    lineHeight: 20,
  },
  seeMoreText: {
    color: "#00BCD4",
    fontWeight: "bold",
    marginTop: 8,
  },
  benefitsList: {
    marginTop: 8,
  },
  benefitItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  benefitIcon: {
    marginRight: 12,
  },
  benefitText: {
    fontSize: 14,
    color: "#424242",
  },

  containerPadding: {
    padding: 16,
  },
  card: {
    flexDirection: "row",
    marginBottom: 16,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#F5F5F5",
  },
  thumbnail: {
    width: 100,
    height: 100,
  },
  cardContent: {
    flex: 1,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  instructor: {
    fontSize: 14,
    color: "#757575",
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#00BCD4",
    marginBottom: 4,
  },
  ratingContainerListCourse: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 4,
  },
  reviews: {
    fontSize: 14,
    color: "#757575",
    marginLeft: 4,
  },
  lessons: {
    fontSize: 14,
    color: "#757575",
    marginLeft: 8,
  },
  bookmarkButton: {
    padding: 4,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
  },
  originalPrice: {
    fontSize: 16,
    color: "#757575",
    textDecorationLine: "line-through",
    marginLeft: 8,
  },
  addToCartButton: {
    backgroundColor: "#00BCD4",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 4,
  },
  addToCartText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
