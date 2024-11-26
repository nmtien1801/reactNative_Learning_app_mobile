import React, { useEffect, useState } from "react";
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
import { getAllCourseUser } from "../../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";

export default function TeacherReviews({ navigation, route }) {
  const user = useSelector((state) => state.auth.user); // lấy thông tin user login
  const listCourse = useSelector((state) => state.user.listCourse); // lấy danh sách khóa học của user
  const dispatch = useDispatch();
  
  
  const teacherID = route.params.params?.teacherID ?? user._id; // ID của giáo viên

  useEffect(() => {
    dispatch(getAllCourseUser(teacherID)); // lấy danh sách khoá học của user
    // dispatch(getAllCourseUser(1)); // lấy danh sách khoá học của user
  }, []);

  const allReviewOfCourse = listCourse?.map((item) => item.Review) || []; // lấy tất cả review của các khóa học [ [1, 2], [3, 4, 5] ]
  const reviewCourse = allReviewOfCourse.flat(); // merge các mảng con thành một mảng [1, 2, 3, 4, 5]
  console.log("listCourse: ", listCourse, "reviewCourse: ", reviewCourse);

  // Tính averageRating và tổng số review
  let totalRating = 0;
  let totalReviews = 0;

  reviewCourse.forEach((review) => {
    totalReviews += 1; // Đếm số lượng review
    totalRating += review.rating; // Tổng điểm rating
  });

  let averageRating =
    totalReviews > 0 ? (totalRating / totalReviews).toFixed(2) : 0;   // trung bình điểm rating

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
        <Text style={styles.reviewerName}>{item.user.userName}</Text>
        <Text style={styles.reviewTime}>{item.time}</Text>
        <Text style={styles.reviewText}>{item.review}</Text>
        {renderStars(item.rating)}
      </View>
    </View>
  );

  return (
    <Layout navigation={navigation} route={route}>
      <View style={styles.ratingOverview}>
        <View style={styles.ratingHeader}>
          <View style={styles.ratingLeft}>
            <View style={styles.ratingStarRow}>
              <Ionicons name="star" size={20} color="#FFD700" />
              <Text style={styles.ratingScore}>{averageRating}/5</Text>
            </View>
            <Text style={styles.reviewCount}>({totalReviews} reviews)</Text>
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
        data={reviewCourse}
        renderItem={renderReviewItem}
        keyExtractor={(item, index) => item.id || `${item.user.userName}-${index}`} // Ensure unique keys
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
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
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
