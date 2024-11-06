import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Layout from "../../component/TeacherProfile/Layout_Teacher";
const reviews = [
  {
    id: "1",
    reviewerName: "Thùy Nhi",
    reviewText: "Anh thật đẹp trai quá",
    reviewDate: "2 days ago",
    stars: 5,
  },
  {
    id: "2",
    reviewerName: "Minh Anh",
    reviewText: "Giảng viên rất nhiệt tình và dễ hiểu",
    reviewDate: "1 week ago",
    stars: 4,
  },
  {
    id: "3",
    reviewerName: "Thanh Tâm",
    reviewText: "Khóa học rất hay và bổ ích",
    reviewDate: "2 weeks ago",
    stars: 5,
  },
];

export default function TeacherReviews() {
  const renderStars = (count) => (
    <View style={styles.starsContainer}>
      {[...Array(5)].map((_, index) => (
        <Ionicons
          key={index}
          name="star"
          size={16}
          color={index < count ? "#FFD700" : "#E0E0E0"}
          style={styles.star}
        />
      ))}
    </View>
  );

  const renderReviewItem = ({ item }) => (
    <View style={styles.reviewItem}>
      <Image
        source={require("../../../img/Login_Register/Login.jpg")}
        style={styles.avatar}
      />
      <View style={styles.reviewContent}>
        <Text style={styles.reviewerName}>{item.reviewerName}</Text>
        <Text style={styles.reviewTime}>{item.reviewDate}</Text>
        <Text style={styles.reviewText}>{item.reviewText}</Text>
        {renderStars(item.stars)}
      </View>
    </View>
  );

  return (
    <Layout>
      <View style={styles.ratingOverview}>
        <View style={styles.ratingHeader}>
          <View style={styles.ratingLeft}>
            <View style={styles.ratingStarRow}>
              <Ionicons name="star" size={20} color="#FFD700" />
              <Text style={styles.ratingScore}>4.5/5</Text>
            </View>
            <Text style={styles.reviewCount}>(12334 reviews)</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.viewAll}>view all</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.ratingPills}
        >
          {[5, 4, 3, 2, 1].map((rating) => (
            <TouchableOpacity key={rating} style={styles.ratingPill}>
              <Ionicons name="star" size={14} color="#00BCD4" />
              <Text style={styles.pillText}>{rating}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={reviews}
        renderItem={renderReviewItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.reviewsList}
      />
    </Layout>
  );
}

const styles = StyleSheet.create({
  ratingOverview: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  ratingHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  ratingLeft: {
    gap: 4,
  },
  ratingStarRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingScore: {
    fontSize: 16,
    fontWeight: "600",
  },
  reviewCount: {
    fontSize: 12,
    color: "#666",
  },
  viewAll: {
    color: "#00BCD4",
    fontSize: 14,
  },
  ratingPills: {
    flexDirection: "row",
  },
  ratingPill: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#00BCD4",
    marginRight: 8,
    gap: 4,
  },
  pillText: {
    color: "#00BCD4",
    fontSize: 14,
  },
  reviewsList: {
    padding: 16,
  },
  reviewItem: {
    flexDirection: "row",
    marginBottom: 20,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  reviewContent: {
    flex: 1,
    gap: 4,
  },
  reviewerName: {
    fontSize: 14,
    fontWeight: "500",
  },
  reviewTime: {
    fontSize: 12,
    color: "#666",
  },
  reviewText: {
    fontSize: 14,
    color: "#333",
    marginVertical: 4,
  },
  starsContainer: {
    flexDirection: "row",
    marginTop: 4,
  },
  star: {
    marginRight: 2,
  },
});
