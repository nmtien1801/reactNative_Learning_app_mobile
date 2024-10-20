import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function MyCourse({ navigation, route }) {
const ProgressBar = ({ progress }) => (
  <View style={styles.progressBarContainer}>
    <View style={[styles.progressBar, { width: `${progress}%` }]} />
  </View>
);

const CourseItem = ({ title, duration, progress, image }) => (
  <View style={styles.courseItem}>
    <Image source={{ uri: image }} style={styles.courseImage} />
    <View style={styles.courseInfo}>
      <Text style={styles.courseTitle}>{title}</Text>
      <Text style={styles.courseDuration}>{duration}</Text>
      <Text style={styles.courseProgress}>{progress}% Complete</Text>
      <ProgressBar progress={progress} />
    </View>
  </View>
);


  const [activeTab, setActiveTab] = useState('ALL');

  const tabs = ['ALL', 'ON GOING', 'COMPLETED'];

  const courses = [
    {
      id: '1',
      title: 'UX Foundation',
      duration: '2 hrs 25 mins',
      progress: 30,
      image: 'https://v0.dev/placeholder.svg?height=100&width=100',
    },
    {
      id: '2',
      title: 'Creative Art Design',
      duration: '3 hrs 25 mins',
      progress: 70,
      image: 'https://v0.dev/placeholder.svg?height=100&width=100',
    },
    {
      id: '3',
      title: 'Palettes for Your App',
      duration: '4 hrs 50 mins',
      progress: 100,
      image: 'https://v0.dev/placeholder.svg?height=100&width=100',
    },
    {
      id: '4',
      title: 'Typography in UI Design',
      duration: '4 hrs 50 mins',
      progress: 50,
      image: 'https://v0.dev/placeholder.svg?height=100&width=100',
    },
  ];


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.time}>9:41</Text>
        <View style={styles.statusIcons}>
          <Ionicons name="cellular" size={16} color="black" />
          <Ionicons name="wifi" size={16} color="black" />
          <Ionicons name="battery-full" size={16} color="black" />
        </View>
      </View>

      <ScrollView style={styles.content}>
      <View style={styles.containerContent}>
      <Text style={styles.headerContent}>My Courses</Text>

      <View style={styles.banner}>
        <View>
          <Text style={styles.bannerTitle}>Courses that boost your career!</Text>
          <TouchableOpacity style={styles.bannerButton}>
            <Text style={styles.bannerButtonText}>Check Now</Text>
          </TouchableOpacity>
        </View>
        <Image
          source={{ uri: 'https://v0.dev/placeholder.svg?height=100&width=100' }}
          style={styles.bannerImage}
        />
      </View>

      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.courseList}>
        {courses.map((course) => (
          <CourseItem key={course.id} {...course} />
        ))}
      </ScrollView>
    </View>
      </ScrollView>

      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="home" size={24} color="#666" />
          <Text style={styles.tabLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="search" size={24} color="#666" />
          <Text style={styles.tabLabel}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} >
          <Ionicons name="book" size={24} color="#00BCD4" />
          <Text style={[styles.tabLabel, styles.activeTabLabel]}>
            My Courses
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="person" size={24} color="#666" />
          <Text style={styles.tabLabel}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    paddingTop: 40,
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  time: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusIcons: {
    flexDirection: 'row',
    gap: 5,
  },

  content: {
    flex: 1,
  },
 containerContent: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  headerContent: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  banner: {
    backgroundColor: '#8A2BE2',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  bannerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  bannerButton: {
    backgroundColor: '#00FFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  bannerButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  bannerImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 20,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#00FFFF',
  },
  tabText: {
    color: '#888',
  },
  activeTabText: {
    color: '#000',
    fontWeight: 'bold',
  },
  courseList: {
    flex: 1,
  },
  courseItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  courseImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  courseInfo: {
    flex: 1,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  courseDuration: {
    fontSize: 14,
    color: '#888',
    marginBottom: 4,
  },
  courseProgress: {
    fontSize: 14,
    marginBottom: 4,
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#00FFFF',
    borderRadius: 2,
  },

  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingVertical: 10,
  },
  tabItem: {
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 5,
    color: '#666',
  },
  activeTabLabel: {
    color: '#00BCD4',
  },
});
