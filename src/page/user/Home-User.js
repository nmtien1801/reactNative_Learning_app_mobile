import React from "react";
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
import Footer from "../../component/Footer";





const SectionHeader = ({ title }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <TouchableOpacity>
      <Text style={styles.viewMore}>View more</Text>
    </TouchableOpacity>
  </View>
);





const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.5;

export default function HomeUser({ navigation, route }) {
  const categories = [
    { icon: BarChart2, title: "Business", color: "#FF8A8A" },
    { icon: Pen, title: "Design", color: "#8B5CF6" },
    { icon: Code, title: "Code", color: "#FF6B6B" },
    { icon: FileText, title: "Writing", color: "#4C6EF5" },
    { icon: Tv, title: "Movie", color: "#7C3AED" },
    { icon: Globe, title: "Language", color: "#F97316" },
  ];

  const sections = [
    {
      id: "1",
      title: "Popular courses",
      data: [
        {
          id: "1",
          title: "PHP in One Click",
          instructor: "Ramono Wultschner",
          price: 59,
          rating: 4.5,
          reviews: 1233,
          lessons: 18,
          image: "https://v0.dev/placeholder.svg?height=200&width=200",
        },
        {
          id: "2",
          title: "Web Design",
          instructor: "Ramono Wultschner",
          price: 39,
          rating: 4.5,
          reviews: 1233,
          lessons: 18,
          image: "https://v0.dev/placeholder.svg?height=200&width=200",
        },
        {
          id: "",
          title: "Web Design",
          instructor: "Ramono Wultschner",
          price: 39,
          rating: 4.5,
          reviews: 1233,
          lessons: 18,
          image: "https://v0.dev/placeholder.svg?height=200&width=200",
        },
      ],
    },
    {
      id: "2",
      title: "Recommended for you",
      data: [
        {
          id: "3",
          title: "PHP in One Click",
          instructor: "Ramono Wultschner",
          price: 59,
          rating: 4.5,
          reviews: 1233,
          lessons: 18,
          image: "https://v0.dev/placeholder.svg?height=200&width=200",
        },
        {
          id: "4",
          title: "Web Design",
          instructor: "Ramono Wultschner",
          price: 39,
          rating: 4.5,
          reviews: 1233,
          lessons: 18,
          image: "https://v0.dev/placeholder.svg?height=200&width=200",
        },
      ],
    },
  ];

  const courses = [
    {
      id: "1",
      title: "Digital Portrait",
      instructor: "Ramono Wultschner",
      price: 59,
      rating: 4.5,
      reviews: 1233,
      lessons: 18,
      image: "https://v0.dev/placeholder.svg?height=200&width=200",
    },
    {
      id: "2",
      title: "Digital Portrait",
      instructor: "Ramono Wultschner",
      price: 59,
      rating: 4.5,
      reviews: 1233,
      lessons: 18,
      image: "https://v0.dev/placeholder.svg?height=200&width=200",
    },
    {
      id: "3",
      title: "Design",
      instructor: "Ramono Wultschner",
      price: 59,
      rating: 4.5,
      reviews: 1233,
      lessons: 18,
      image: "https://v0.dev/placeholder.svg?height=200&width=200",
    },
  ];

  const teachers = [
    {
      id: "1",
      name: "Nhi Nhi",
      institution: "Industrial University of Ho Chi Minh City",
      rating: 4.5,
      reviews: 1233,
      lessons: 18,
      image: "https://v0.dev/placeholder.svg?height=200&width=200",
    },
    {
      id: "2",
      name: "Minh Tien",
      institution: "Ramono Wultschner",
      rating: 4.5,
      reviews: 1233,
      lessons: 18,
      image: "https://v0.dev/placeholder.svg?height=200&width=200",
    },
  ];

  const CourseCard = ({ course }) => (
    <TouchableOpacity style={[styles.courseCard, { width: CARD_WIDTH }]} onPress={() => navigation.navigate("courseDetailOverView")}>
      <Image
        source={{ uri: course.image }}
        style={styles.courseImage}
      />
      <View style={styles.courseContent}>
        <View style={styles.titleRow}>
          <Text
            style={styles.courseTitle}
          >
            {course.title}
          </Text>
          <TouchableOpacity>
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
        data={section.data}
        renderItem={({ item }) => <CourseCard course={item} />}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.courseList}
      />
    </View>
  );

  const CategoryItem = ({ icon: Icon, title, color }) => (
    <TouchableOpacity style={[styles.categoryItem, { backgroundColor: color }]} onPress={() => navigation.navigate("courseListing")}>
      <View style={styles.categoryIcon}>
        <Icon size={24} color="#FFF" />
      </View>
      <Text style={styles.categoryText}>{title}</Text>
    </TouchableOpacity>
  );

  const CourseInspiresCard = ({ course }) => (
    <TouchableOpacity style={styles.courseCard} onPress={() => navigation.navigate("courseDetailOverView")}>
      <Image source={{ uri: course.image }} style={styles.courseImage} />
      <View style={styles.courseContent}>
        <View style={styles.titleRow}>
          <Text style={styles.courseTitle}>{course.title}</Text>
          <TouchableOpacity>
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
    <TouchableOpacity style={styles.teacherCard} onPress={() => navigation.navigate("courseDetailOverView")}>
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
                icon={category.icon}
                title={category.title}
                color={category.color}
              />
            ))}
          </View>
        </View>

        {/* Courses popular - recoment Section */}
        <FlatList
          data={sections}
          renderItem={({ item }) => <CourseSection section={item} />}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
        />

        {/* course inspires Section */}
        <View style={styles.section}>
          <SectionHeader title="Course that inspires" />
          <FlatList
            data={courses}
            renderItem={({ item }) => <CourseInspiresCard course={item} />}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            contentContainerStyle={{ paddingHorizontal: 16, gap: 16 }}
          />
        </View>

        {/* Teachers Section */}
        <View style={styles.section}>
          <SectionHeader title="Top teachers" />
          <FlatList
            data={teachers}
            renderItem={({ item }) => <TeacherCard teacher={item} />}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.teacherList}
          />
        </View>
      </ScrollView>

      <Footer navigation={navigation} route={route} showActive="home"/>
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
    width: "100%",
    height: 160,
    backgroundColor: "#f0f0f0",
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
    width: "100%",
    height: 160,
    borderRadius: 8,
    marginBottom: 8,
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
