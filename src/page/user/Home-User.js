import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  Dimensions,
} from "react-native";
import {
  ShoppingCart,
  Bell,
  BarChart2,
  Pen,
  Code,
  FileText,
  Tv,
  Globe,
  Bookmark,
  Star,
} from "lucide-react-native";
import Footer from "../../component/footer/FooterUser";
import { useEffect, useState } from "react";
import { useToast } from "../../component/customToast";

import { useDispatch, useSelector } from "react-redux";
import {
  findAllCourses,
  findPopularCourses,
  findInspireCourses,
  updateSaveCourse,
} from "../../redux/courseSlice";
import { getTopTeacher } from "../../redux/userSlice";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.5;

export default function HomeUser({ navigation, route }) {
  const listCourse = useSelector((state) => state.course.listCourse); // lấy thông tin course trong slide course
  const listCoursePopular = useSelector(
    (state) => state.course.listCoursePopular
  ); // lấy thông tin course phổ biến
  const listCourseInspire = useSelector(
    (state) => state.course.listCourseInspire
  ); // lấy thông tin course truyền cảm hứng
  const topTeacher = useSelector((state) => state.user.topTeacher); // lấy thông tin top teacher
  const isSave = useSelector((state) => state.course.isSave); // lấy thông tin đã lưu khóa học chưa
  const dispatch = useDispatch();
  const toast = useToast();

  const categories = [
    { id: 1, icon: BarChart2, title: "Business", color: "#FF8A8A" },
    { id: 2, icon: Pen, title: "Design", color: "#8B5CF6" },
    { id: 3, icon: Code, title: "Code", color: "#FF6B6B" },
    { id: 4, icon: FileText, title: "Writing", color: "#4C6EF5" },
    { id: 5, icon: Tv, title: "Movie", color: "#7C3AED" },
    { id: 6, icon: Globe, title: "Language", color: "#F97316" },
  ];

  //////////////////////////////
  const [section, setSection] = useState([]); // section popular + recommended for you courses
  const [courses, setCourses] = useState([]); // course that inspires
  const [teachers, setTeachers] = useState([]); // top teachers

  useEffect(() => {
    dispatch(findAllCourses());
    dispatch(getTopTeacher());
    dispatch(findPopularCourses());
    dispatch(findInspireCourses());
  }, []);

  useEffect(() => {
    dispatch(findAllCourses());
    dispatch(findPopularCourses());
    dispatch(findInspireCourses());
  }, [isSave]);

  const handleSaveCourse = async (courseID, state) => {
    let res = await dispatch(updateSaveCourse({ courseID, state }));

    if (res.payload.EC == 0) {
      toast(res.payload.EM);
    } else {
      toast(res.payload.EM, "error");
    }
  };

  // popular + recommended for you courses
  useEffect(() => {
    if (listCourse.length !== 0 && listCoursePopular.length !== 0) {
      setSection([
        {
          id: "1",
          title: "Popular courses",
          data: [
            ...listCoursePopular.map((course, index) => ({
              id: course.id, // Sử dụng kết hợp giữa id và index để đảm bảo tính duy nhất
              title: course.name,
              instructor: course.UserFollow[0]?.user.userName, // người tạo khóa học
              price: course.price,
              rating: course.averageRating.toFixed(2),
              reviews: course.totalRating,
              lessons: course.totalLessons,
              image: course.image,
              state: course.state,
            })),
          ],
        },
        {
          id: "2",
          title: "Recommended for you",
          data: [
            ...listCourse.map((course, index) => ({
              id: course.id, // Sử dụng kết hợp giữa id và index để đảm bảo tính duy nhất
              title: course.name,
              instructor: course.UserFollow[0]?.user.userName, // người tạo khóa học
              price: course.price,
              rating: course.averageRating.toFixed(2),
              reviews: course.totalRating,
              lessons: course.totalLessons,
              image: course.image,
              state: course.state,
            })),
          ],
        },
      ]);
    }
  }, [listCourse && listCoursePopular]);

  // course that inspires
  useEffect(() => {
    if (listCourseInspire.length !== 0) {
      setCourses([
        ...listCourseInspire.map((course, index) => ({
          id: course.id, // Sử dụng kết hợp giữa id và index để đảm bảo tính duy nhất
          title: course.name,
          instructor: course.UserFollow[0]?.user.userName, // người tạo khóa học
          price: course.price,
          rating: course.averageRating.toFixed(2),
          reviews: course.totalRating,
          lessons: course.totalLessons,
          image: course.image,
          state: course.state,
        })),
      ]);
    }
  }, [listCourseInspire]);

  // top teachers
  useEffect(() => {
    if (topTeacher.length !== 0) {
      setTeachers([
        ...topTeacher.map((teacher, index) => ({
          id: teacher.id, // Sử dụng kết hợp giữa id và index để đảm bảo tính duy nhất
          name: teacher.userName,
          institution: teacher.title,
          rating: teacher.averageRating,
          reviews: teacher.averageRating,
          lessons: teacher.totalLessons,
          image: teacher.image,
        })),
      ]);
    }
  }, [topTeacher]);

  const SectionHeader = ({ title }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <TouchableOpacity>
        <Text style={styles.viewMore}>View more</Text>
      </TouchableOpacity>
    </View>
  );

  const CourseCard = ({ course }) => (
    <TouchableOpacity
      style={[styles.courseCard, { width: CARD_WIDTH }]}
      onPress={() =>
        navigation.navigate("courseDetailOverView", { courseID: course.id })
      }
    >
      <Image source={{ uri: course.image }} style={styles.courseImage} />
      <View style={styles.courseContent}>
        <View style={styles.titleRow}>
          <Text style={styles.courseTitle}>{course.title}</Text>
          <TouchableOpacity
            onPress={() => handleSaveCourse(course.id, course.state)}
          >
            <Bookmark size={24} color="#00BCD4" />
          </TouchableOpacity>
        </View>
        <Text style={styles.instructorName}>{course.instructor}</Text>
        <Text style={styles.price}>${course.price}</Text>
        <View style={styles.statsRow}>
          <View style={styles.ratingContainer}>
            <Star size={16} color="#FFD700" fill="#FFD700" />
            <Text style={styles.rating}>{course.rating}</Text>
            <Text style={styles.reviews}>({course.reviews})</Text>
          </View>
          <Text style={styles.lessons}>{course.lessons} lessons</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const CourseSection = ({ section }) => (
    <View style={styles.section}>
      <SectionHeader title={section.title} />
      <FlatList
        data={section.data.slice(0, 5)} // Lấy 5 phần tử đầu tiên
        renderItem={({ item }) => <CourseCard course={item} />}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.courseList}
      />
    </View>
  );

  const CategoryItem = ({ icon: Icon, title, color, categoryID }) => (
    <TouchableOpacity
      style={[styles.categoryItem, { backgroundColor: color }]}
      onPress={() =>
        navigation.navigate("courseListing", { categoryID: categoryID })
      }
    >
      <View style={styles.categoryIcon}>
        <Icon size={24} color="#FFF" />
      </View>
      <Text style={styles.categoryText}>{title}</Text>
    </TouchableOpacity>
  );

  const CourseInspiresCard = ({ course }) => (
    <TouchableOpacity
      style={styles.courseCard}
      onPress={() =>
        navigation.navigate("courseDetailOverView", { courseID: course.id })
      }
    >
      <Image source={{ uri: course.image }} style={styles.courseImage} />
      <View style={styles.courseContent}>
        <View style={styles.titleRow}>
          <Text style={styles.courseTitle}>{course.title}</Text>
          <TouchableOpacity
            onPress={() => handleSaveCourse(course.id, course.state)}
          >
            <Bookmark size={24} color="#00BCD4" />
          </TouchableOpacity>
        </View>
        <Text style={styles.instructorName}>{course.instructor}</Text>
        <Text style={styles.price}>${course.price}</Text>
        <View style={styles.statsRow}>
          <View style={styles.ratingContainer}>
            <Star size={16} color="#FFD700" fill="#FFD700" />
            <Text style={styles.rating}>{course.rating}</Text>
            <Text style={styles.reviews}>({course.reviews})</Text>
          </View>
          <Text style={styles.lessons}>{course.lessons} lessons</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const TeacherCard = ({ teacher }) => (
    <TouchableOpacity
      style={styles.teacherCard}
      onPress={() => navigation.navigate("Teacher", { teacherID: teacher.id })}
    >
      <Image source={{ uri: teacher.image }} style={styles.teacherImage} />
      <Text style={styles.teacherName}>{teacher.name}</Text>
      <Text style={styles.institution}>{teacher.institution}</Text>
      <View style={styles.teacherStats}>
        <View style={styles.ratingContainer}>
          <Star size={16} color="#FFD700" fill="#FFD700" />
          <Text style={styles.rating}>{teacher.rating}</Text>
          <Text style={styles.reviews}>({teacher.reviews})</Text>
        </View>
        <Text style={styles.lessons}>{teacher.lessons} lessons</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Header Section */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello, Nhi Nhi!</Text>
            <Text style={styles.subtitle}>
              What do you want to learn today?
            </Text>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => navigation.navigate("cart")}
            >
              <ShoppingCart size={24} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Bell size={24} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Banner Section */}
        <View style={styles.bannerContainer}>
          <View style={styles.banner}>
            <View style={styles.bannerContent}>
              <Text style={styles.bannerTitle}>PROJECT MANAGEMENT</Text>
              <Text style={styles.bannerDiscount}>20% OFF</Text>
              <TouchableOpacity style={styles.joinButton}>
                <Text style={styles.joinButtonText}>JOIN NOW</Text>
              </TouchableOpacity>
            </View>
            <Image
              source={{
                uri: "https://v0.dev/placeholder.svg?height=200&width=200",
              }}
              style={styles.bannerImage}
            />
          </View>
        </View>

        {/* Categories Section */}
        <View style={styles.categoriesSection}>
          <View style={styles.categoriesHeader}>
            <Text style={styles.categoriesTitle}>Categories</Text>
            <TouchableOpacity>
              <Text style={styles.viewMoreCategories}>View more</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.categoriesGrid}>
            {categories.map((category, index) => (
              <CategoryItem
                key={index}
                categoryID={category.id}
                icon={category.icon}
                title={category.title}
                color={category.color}
              />
            ))}
          </View>
        </View>

        {/* Courses popular - recoment Section */}
        <FlatList
          data={section}
          renderItem={({ item }) => <CourseSection section={item} />}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
          nestedScrollEnabled={true} // Kích hoạt cuộn lồng nhau -> do lồng trong scrollView
        />

        {/* course inspires Section */}
        <View style={styles.section}>
          <SectionHeader title="Course that inspires" />
          <FlatList
            data={courses.slice(0, 3)} // Chỉ lấy 3 phần tử đầu tiên
            renderItem={({ item }) => <CourseInspiresCard course={item} />}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            contentContainerStyle={{ paddingHorizontal: 16, gap: 16 }}
            nestedScrollEnabled={true} // Kích hoạt cuộn lồng nhau -> do lồng trong scrollView
          />
        </View>

        {/* Teachers Section */}
        <View style={styles.section}>
          <SectionHeader title="Top teachers" />
          <FlatList
            data={teachers.slice(0, 5)}
            renderItem={({ item }) => <TeacherCard teacher={item} />}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.teacherList}
            nestedScrollEnabled={true} // Kích hoạt cuộn lồng nhau -> do lồng trong scrollView
          />
        </View>
      </ScrollView>

      <Footer navigation={navigation} route={route} showActive="home" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    backgroundColor: "#00BCD4",
    padding: 20,
    paddingTop: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#FFF",
    opacity: 0.8,
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    marginLeft: 16,
  },
  bannerContainer: {
    padding: 16,
  },
  banner: {
    backgroundColor: "#8B5CF6",
    borderRadius: 12,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    overflow: "hidden",
  },
  bannerContent: {
    flex: 1,
  },
  bannerTitle: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  bannerDiscount: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  joinButton: {
    backgroundColor: "#00BCD4",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  joinButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  bannerImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
  },
  categoriesSection: {
    padding: 16,
  },
  categoriesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  categoriesTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  viewMoreCategories: {
    color: "#00BCD4",
    fontSize: 14,
  },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  categoryItem: {
    width: "48%",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  categoryText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  viewMore: {
    fontSize: 14,
    color: "#00BCD4",
  },
  courseList: {
    paddingHorizontal: 16,
  },
  courseCard: {
    // width: CARD_WIDTH,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginRight: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  courseImage: {
    // width: "100%",
    height: 160,
    backgroundColor: "#f0f0f0",
    resizeMode: "contain",
  },
  courseContent: {
    padding: 12,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
    marginRight: 8,
  },
  instructorName: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#00BCD4",
    marginBottom: 4,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 4,
    color: "#333",
  },
  reviews: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
  lessons: {
    fontSize: 14,
    color: "#666",
  },

  teacherList: {
    paddingHorizontal: 16,
  },
  teacherCard: {
    width: CARD_WIDTH,
    marginRight: 16,
  },
  teacherImage: {
    // width: "100%",
    height: 160,
    borderRadius: 8,
    marginBottom: 8,
    resizeMode: "contain",
  },
  teacherName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  institution: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  teacherStats: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
