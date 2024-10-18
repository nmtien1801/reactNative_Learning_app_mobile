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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Star } from "lucide-react-native"; // add npm (2)

export default function CourseDetailReview({ navigation, route }) {
  const StarRating = ({ rating }) => {
    return (
      <View style={styles.starContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            fill={star <= rating ? "#FFD700" : "transparent"}
            color={star <= rating ? "#FFD700" : "#C4C4C4"}
          />
        ))}
      </View>
    );
  };

  const ReviewItem = ({ name, time, rating, review, imageUrl }) => (
    <View style={styles.reviewItem}>
      <Image source={{ uri: imageUrl }} style={styles.avatar} />
      <View style={styles.reviewContent}>
        <Text style={styles.reviewName}>{name}</Text>
        <Text style={styles.reviewTime}>{time}</Text>
        <StarRating rating={rating} />
        <Text style={styles.reviewText}>{review}</Text>
      </View>
    </View>
  );

  const filterOptions = ["All", "5", "4", "3", "2", "1"];

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.courseHeader}>
          <Text style={styles.courseCategory}>UX Foundations</Text>
          <Text style={styles.courseTitle}>Introduction to UX Design</Text>
          <View style={styles.playButton}>
            <Ionicons name="play" size={24} color="white" />
          </View>
        </View>
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
          <TouchableOpacity
            style={styles.tab}
            onPress={() => navigation.navigate("courseDetailOverView")}
          >
            <Text style={styles.tabText}>OVERVIEW</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => navigation.navigate("courseDetailLesson")}
          >
            <Text style={styles.tabText}>LESSONS</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tab, styles.activeTab]}>
            <Text style={[styles.tabText, styles.activeTabText]}>REVIEW</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.ratingContainerContent}>
            <Text style={styles.ratingTextContent}>4.5/5</Text>
            <Text style={styles.reviewCount}>(1233+ reviews)</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View all</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterContainer}
        >
          {filterOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.filterButton,
                option === "All" && styles.filterButtonActive,
              ]}
            >
              {option !== "All" && <Star size={16} color="#00BCD4" />}
              <Text
                style={[
                  styles.filterText,
                  option === "All" && styles.filterTextActive,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <ReviewItem
          name="Jinny Oslin"
          time="A day ago"
          rating={5}
          review="Nostrud excepteur magna id est quis in aliqua consequat. Exercitation enim eiusmod elit sint laborum"
          imageUrl="https://v0.dev/placeholder.svg?height=50&width=50"
        />
        <ReviewItem
          name="Jane Barry"
          time="A day ago"
          rating={4}
          review="Deserunt minim incididunt cillum nostrud do voluptate excepteur excepteur minim ex minim est"
          imageUrl="https://v0.dev/placeholder.svg?height=50&width=50"
        />
        <ReviewItem
          name="Claire Mignard"
          time="5 days ago"
          rating={3}
          review="Magna id sint irure in cillum esse nisi dolor laboris ullamco. Consectetur proident ..."
          imageUrl="https://v0.dev/placeholder.svg?height=50&width=50"
        />
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

  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  ratingContainerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingTextContent: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 8,
  },
  reviewCount: {
    fontSize: 14,
    color: "#666",
  },
  viewAll: {
    fontSize: 14,
    color: "#00BCD4",
  },
  filterContainer: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#00BCD4",
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: "#00BCD4",
  },
  filterText: {
    color: "#00BCD4",
    marginLeft: 4,
  },
  filterTextActive: {
    color: "#fff",
  },
  reviewItem: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  reviewContent: {
    flex: 1,
  },
  reviewName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  reviewTime: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  starContainer: {
    flexDirection: "row",
    marginBottom: 4,
  },
  reviewText: {
    fontSize: 14,
    color: "#333",
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
