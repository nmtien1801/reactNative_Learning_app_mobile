import React from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Footer from "./Footer";

export default function CourseSearch({ navigation, route }) {
  const HotTopic = ({ title }) => (
    <TouchableOpacity style={styles.hotTopic}>
      <Text style={styles.hotTopicText}>{title}</Text>
    </TouchableOpacity>
  );

  const Category = ({ icon, title }) => (
    <TouchableOpacity style={styles.category}>
      <Ionicons
        name={icon}
        size={24}
        color="#666"
        style={styles.categoryIcon}
      />
      <Text style={styles.categoryTitle}>{title}</Text>
      <Ionicons name="chevron-forward" size={24} color="#666" />
    </TouchableOpacity>
  );

  const CourseCard = ({
    title,
    author,
    price,
    rating,
    lessons,
    discount,
    isBestSeller,
  }) => (
    <View style={styles.courseCard}>
      <TouchableOpacity
        onPress={() => navigation.navigate("courseDetailOverView")}
      >
        <Image
          source={{ uri: "https://v0.dev/placeholder.svg" }}
          style={styles.courseImage}
        />
      </TouchableOpacity>
      {isBestSeller && (
        <View style={styles.bestSeller}>
          <Text style={styles.bestSellerText}>Best-seller</Text>
        </View>
      )}
      {discount && (
        <View style={styles.discount}>
          <Text style={styles.discountText}>{discount}</Text>
        </View>
      )}
      <TouchableOpacity
        onPress={() => navigation.navigate("courseDetailOverView")}
      >
        <Text style={styles.courseTitle}>{title}</Text>
      </TouchableOpacity>
      <Text style={styles.courseAuthor}>{author}</Text>
      <View style={styles.courseDetails}>
        <Text style={styles.coursePrice}>${price}</Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text style={styles.ratingText}>{rating}</Text>
          <Text style={styles.lessonsText}>({lessons} lessons)</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color="#666"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search course"
            placeholderTextColor="#666"
          />
          <TouchableOpacity style={styles.filterButton} onPress={()=> navigation.navigate('courseListting')}>
            <Text style={styles.filterButtonText}>Filter</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Hot topics</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.hotTopicsContainer}
        >
          <HotTopic title="Java" />
          <HotTopic title="SQL" />
          <HotTopic title="Javascript" />
          <HotTopic title="Python" />
          <HotTopic title="Digital marketing" />
          <HotTopic title="Photoshop" />
          <HotTopic title="Watercolor" />
        </ScrollView>

        <View style={styles.categoriesContainer}>
          <View style={styles.categoriesHeader}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <TouchableOpacity>
              <Text style={styles.viewMoreText}>View more</Text>
            </TouchableOpacity>
          </View>
          <Category icon="briefcase" title="Business" />
          <Category icon="color-palette" title="Design" />
          <Category icon="code-slash" title="Code" />
          <Category icon="film" title="Movie" />
          <Category icon="language" title="Language" />
        </View>

        <View style={styles.recommendedContainer}>
          <View style={styles.recommendedHeader}>
            <Text style={styles.sectionTitle}>Recommended for you</Text>
            <TouchableOpacity>
              <Text style={styles.viewMoreText}>View more</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <CourseCard
              title="Website Design"
              author="Ramona Wullschner"
              price="590"
              rating="4.5 (1233)"
              lessons="9"
              isBestSeller={true}
            />
            <CourseCard
              title="UX Research For..."
              author="Olivia Wang"
              price="290"
              rating="4.5 (1782)"
              lessons="12"
              discount="20% Off"
              onPress={() => navigation.navigate("CourseDetailOverView")}
            />
          </ScrollView>
        </View>
      </ScrollView>

     <Footer navigation={navigation} route={route}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  
  content: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 20,
    marginTop: 20,
  },
  searchIcon: {
    position: "absolute",
    left: 25,
    zIndex: 1,
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: "#F0F0F0",
    borderRadius: 20,
    paddingLeft: 40,
    paddingRight: 10,
  },
  filterButton: {
    marginLeft: 10,
    backgroundColor: "#00BCD4",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
  },
  filterButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 15,
    marginBottom: 10,
  },
  hotTopicsContainer: {
    paddingLeft: 15,
    marginBottom: 20,
  },
  hotTopic: {
    backgroundColor: "#E0F7FA",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  hotTopicText: {
    color: "#00BCD4",
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  categoriesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 15,
    marginBottom: 10,
  },
  viewMoreText: {
    color: "#00BCD4",
  },
  category: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  categoryIcon: {
    marginRight: 15,
  },
  categoryTitle: {
    flex: 1,
    fontSize: 16,
  },
  recommendedContainer: {
    marginBottom: 20,
  },
  recommendedHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 15,
    marginBottom: 10,
  },
  courseCard: {
    width: 250,
    marginLeft: 15,
    marginRight: 5,
  },
  courseImage: {
    width: "100%",
    height: 140,
    borderRadius: 8,
    marginBottom: 10,
  },
  bestSeller: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "#FFD700",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  bestSellerText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 12,
  },
  discount: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#FF6347",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  discountText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  courseAuthor: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  courseDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  coursePrice: {
    fontSize: 16,
    fontWeight: "bold",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 14,
    color: "#666",
  },
  lessonsText: {
    marginLeft: 5,
    fontSize: 14,
    color: "#666",
  },
 
});
