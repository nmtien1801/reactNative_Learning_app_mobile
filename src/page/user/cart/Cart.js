import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Checkbox } from 'react-native-paper';
import { Star } from 'lucide-react-native';
import React, { useEffect, useState } from "react";

// interface CourseItem {
//   id: string;
//   title: string;
//   author: string;
//   price: number;
//   rating: number;
//   reviews: number;
//   lessons: number;
//   images: string[];
//   selected: boolean;
// }

export default function Cart({navigation, route}) {
  const [courses, setCourses] = useState([
    {
      id: '1',
      title: 'UX Foundation',
      author: 'Dennis Sweeney',
      price: 51,
      rating: 4.5,
      reviews: 1233,
      lessons: 13,
      images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
      selected: true,
    },
    // Duplicate items omitted for brevity
  ]);

  const toggleSelection = (id) => {
    setCourses(courses.map(course => 
      course.id === id ? {...course, selected: !course.selected} : course
    ));
  };

  const renderCourseItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Checkbox
        status={item.selected ? 'checked' : 'unchecked'}
        onPress={() => toggleSelection(item.id)}
        color="#6366f1"
      />
      <View style={styles.imageContainer}>
        {item.images.map((_, index) => (
          <Image
            key={index}
            source={{ uri: '/placeholder.svg' }}
            style={styles.thumbnail}
          />
        ))}
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.author}>{item.author}</Text>
        <Text style={styles.price}>${item.price}</Text>
        <View style={styles.ratingContainer}>
          <Star size={16} color="#FFB800" fill="#FFB800" />
          <Text style={styles.rating}>{item.rating}</Text>
          <Text style={styles.reviews}>({item.reviews})</Text>
          <Text style={styles.lessons}>{item.lessons} lessons</Text>
        </View>
      </View>
    </View>
  );

  const selectedCount = courses.filter(course => course.selected).length;
  const total = courses
    .filter(course => course.selected)
    .reduce((sum, course) => sum + course.price, 0);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Giỏ Hàng</Text>
        <TouchableOpacity onPress={() => navigation.navigate('historyCart')}>
        <Text style={styles.headerRight}>lịch sử mua</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={courses}
        renderItem={renderCourseItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Tổng thanh toán</Text>
          <Text style={styles.totalAmount}>đ{total}</Text>
        </View>
        <TouchableOpacity style={styles.buyButton}>
          <Text style={styles.buyButtonText}>Mua ({selectedCount})</Text>
        </TouchableOpacity>
      </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  headerRight: {
    color: '#6366f1',
    fontSize: 14,
  },
  list: {
    padding: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  imageContainer: {
    flexDirection: 'row',
    marginHorizontal: 12,
  },
  thumbnail: {
    width: 40,
    height: 60,
    marginRight: 4,
    borderRadius: 4,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  author: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6366f1',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '500',
  },
  reviews: {
    marginLeft: 4,
    fontSize: 14,
    color: '#6b7280',
  },
  lessons: {
    marginLeft: 12,
    fontSize: 14,
    color: '#6b7280',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  totalContainer: {
    flex: 1,
  },
  totalLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: '600',
  },
  buyButton: {
    backgroundColor: '#ef4444',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginLeft: 16,
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});