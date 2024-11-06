import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { ArrowLeft, Search, Star } from 'lucide-react-native';

// interface Course {
//   id: string;
//   title: string;
//   instructor: string;
//   price: number;
//   rating: number;
//   image: string;
// }

const StarRating = ({ rating }) => {
  return (
    <View style={styles.starContainer}>
      {[1, 2, 3, 4, 5].map((index) => (
        <Star
          key={index}
          size={20}
          color={index <= rating ? '#FFD700' : '#E0E0E0'}
          fill={index <= rating ? '#FFD700' : 'transparent'}
        />
      ))}
    </View>
  );
};

const CourseItem = ({ course }) => {
  return (
    <View style={styles.courseItem}>
      <Image source={{ uri: course.image }} style={styles.courseImage} />
      <View style={styles.courseInfo}>
        <View style={styles.titleContainer}>
          <Text style={styles.courseTitle}>{course.title}</Text>
          <Text style={styles.instructorName}>{course.instructor}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.priceContainer}>
            <Text style={styles.priceLabel}>thành tiền:</Text>
            <Text style={styles.price}>${course.price}</Text>
          </View>
          <View style={styles.ratingRow}>
            <StarRating rating={course.rating} />
            <TouchableOpacity style={styles.rateButton}>
              <Text style={styles.rateButtonText}>Đánh giá</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default function HistoryCart({ navigation, route }) {
  const courses = [
    {
      id: '1',
      title: 'Design Basics',
      instructor: 'Kelly Hamilton',
      price: 89,
      rating: 3,
      image: 'https://v0.dev/placeholder.svg?height=200&width=200',
    },
    {
      id: '2',
      title: 'Design Basics',
      instructor: 'Kelly Hamilton',
      price: 89,
      rating: 3,
      image: 'https://v0.dev/placeholder.svg?height=200&width=200',
    },
    {
      id: '3',
      title: 'Design Basics',
      instructor: 'Kelly Hamilton',
      price: 89,
      rating: 3,
      image: 'https://v0.dev/placeholder.svg?height=200&width=200',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backButton}>
            <ArrowLeft size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Đơn đã mua</Text>
        </View>
        <TouchableOpacity style={styles.searchButton}>
          <Search size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={courses}
        renderItem={({ item }) => <CourseItem course={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  searchButton: {
    padding: 4,
  },
  listContainer: {
    padding: 16,
  },
  courseItem: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  courseImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 12,
  },
  courseInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  titleContainer: {
    marginBottom: 8,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  instructorName: {
    fontSize: 14,
    color: '#666',
  },
  detailsContainer: {
    justifyContent: 'space-between',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  priceLabel: {
    fontSize: 14,
    marginRight: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF0000',
  },
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  starContainer: {
    flexDirection: 'row',
  },
  rateButton: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 4,
  },
  rateButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});