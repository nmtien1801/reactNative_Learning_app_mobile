import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { WebView } from 'react-native-webview';

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

const CourseCard = ({
  title,
  instructor,
  price,
  rating,
  reviews,
  lessons,
  image,
  bookmarked,
}) => (
  <View style={styles.card}>
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
  </View>
);

export default function CourseDetailOverView({navigation, route}) {

  const courses = [
    {
      id: 1,
      title: "Product Design",
      instructor: "Dennis Sweeney",
      price: 90,
      rating: 4.5,
      reviews: 1233,
      lessons: 12,
      image: "https://v0.dev/placeholder.svg",
      bookmarked: false,
    },
    {
      id: 2,
      title: "Palettes for Your App",
      instructor: "Ramono Wultschner",
      price: 59,
      rating: 4.5,
      reviews: 1233,
      lessons: 12,
      image: "https://v0.dev/placeholder.svg",
      bookmarked: true,
    },
    {
      id: 3,
      title: "Mobile UI Design",
      instructor: "Ramono Wultschner",
      price: 32,
      rating: 4.5,
      reviews: 1233,
      lessons: 12,
      image: "https://v0.dev/placeholder.svg",
      bookmarked: false,
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView>

      {Platform.OS === 'web' ? (
        // Dùng iframe cho nền web
        <iframe
          src="https://www.youtube.com/embed/147SkAVXEqM"
          width="100%"
          height="300"
          title="YouTube Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ border: 'none' }}></iframe>
      ) : (
        // Dùng WebView cho Android/iOS
        <WebView
          source={{ uri: 'https://www.youtube.com/embed/147SkAVXEqM' }}
          style={{ flex: 1, width: '100%', height: 10 }}
        />
      )}

        {/* <View style={styles.courseHeader}>
          <Text style={styles.courseCategory}>UX Foundations</Text>
          <Text style={styles.courseTitle}>Introduction to UX Design</Text>
          <View style={styles.playButton}>
            <Ionicons name="play" size={24} color="white" />
          </View>
        </View> */}
        <View style={styles.courseInfo}>
          <Text style={styles.courseSubtitle}>
            UX Foundation: Introduction to User Experience Design
          </Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>4.5 (1233) • 12 lessons</Text>
          </View>
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity style={[styles.tab, styles.activeTab]}>
            <Text style={[styles.tabText, styles.activeTabText]}>OVERVIEW</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab} onPress={()=>navigation.navigate('courseDetailLesson')}>
            <Text style={styles.tabText}>LESSONS</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab} onPress={()=>navigation.navigate('courseDetailReview')}>
            <Text style={styles.tabText}>REVIEW</Text>
          </TouchableOpacity>
        </View>

      <View style={styles.content}>
        <View style={styles.instructorContainer}>
          <Image
            source={{ uri: 'https://v0.dev/placeholder.svg' }}
            style={styles.instructorImage}
          />
          <View style={styles.instructorInfo}>
            <Text style={styles.instructorName}>Sara Weise</Text>
            <Text style={styles.instructorTitle}>UI/UX Designer</Text>
          </View>
          <TouchableOpacity style={styles.followButton}>
            <Text style={styles.followButtonText}>Follow</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.instructorContainer}>
            <Image
              source={{ uri: "https://v0.dev/placeholder.svg" }}
              style={styles.instructorImage}
            />
            <View style={styles.instructorInfo}>
              <Text style={styles.instructorName}>Sara Weise</Text>
              <Text style={styles.instructorTitle}>UI/UX Designer</Text>
            </View>
            <TouchableOpacity style={styles.followButton}>
              <Text style={styles.followButtonText}>Follow</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>
              Convallis in semper laoreet nibh leo. Vivamus malesuada ipsum
              pulvinar non rutrum risus dui, risus. Purus massa velit iaculis
              tincidunt tortor, risus, scelerisque risus...
            </Text>
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
          {courses.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </ScrollView>
      </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>$259</Text>
          <Text style={styles.originalPrice}>$1020</Text>
        </View>
        <TouchableOpacity style={styles.addToCartButton}>
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
