import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header_Teacher from "../../component/TeacherProfile/Header_Teacher";
import Nav_Teacher from "../../component/TeacherProfile/Nav_Teacher";
import Footer from "../../component/Footer";

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

export default function TeacherReviewsScreen({ navigation, route }) {
  const renderReviewItem = ({ item }) => (
    <View style={styles.reviewCard}>
      <Image
        source={require("./../../../img/Login_Register/Login.jpg")}
        style={styles.reviewerImage}
      />
      <View style={styles.reviewContent}>
        <Text style={styles.reviewerName}>{item.reviewerName}</Text>
        <View style={styles.starsContainer}>
          {[...Array(item.stars)].map((_, index) => (
            <Ionicons key={index} name="star" size={16} color="#FFD700" />
          ))}
        </View>
        <Text style={styles.reviewText}>{item.reviewText}</Text>
        <Text style={styles.reviewDate}>{item.reviewDate}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Header_Teacher />
        <Nav_Teacher />

        <View style={styles.reviewsContainer}>
          <View style={styles.overallRating}>
            <Text style={styles.ratingScore}>4.5/5</Text>
            <View style={styles.starsContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Ionicons
                  key={star}
                  name={star <= 4 ? "star" : "star-half"}
                  size={20}
                  color="#FFD700"
                />
              ))}
            </View>
            <Text style={styles.totalReviews}>(5 reviews)</Text>
          </View>

          <FlatList
            data={reviews}
            renderItem={renderReviewItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.reviewsList}
          />
        </View>
      </ScrollView>

      <Footer navigation={navigation} route={route}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  reviewsContainer: {
    padding: 16,
  },
  overallRating: {
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  ratingScore: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
  },
  starsContainer: {
    flexDirection: "row",
    marginBottom: 4,
  },
  totalReviews: {
    color: "#666",
    fontSize: 14,
  },
  reviewsList: {
    marginTop: 16,
  },
  reviewCard: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  reviewerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  reviewContent: {
    flex: 1,
    marginLeft: 12,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  reviewText: {
    fontSize: 14,
    color: "#333",
    marginTop: 4,
    marginBottom: 4,
  },
  reviewDate: {
    fontSize: 12,
    color: "#666",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#FFF",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
});

