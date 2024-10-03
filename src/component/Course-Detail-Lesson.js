import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const LessonItem = ({ number, title, duration, status }) => (
  <TouchableOpacity
    style={[styles.lessonItem, status === 'active' && styles.activeLessonItem]}>
    <View style={styles.lessonInfo}>
      <Text style={styles.lessonNumber}>{number.padStart(2, '0')}</Text>
      <View>
        <Text style={styles.lessonTitle}>{title}</Text>
        <Text style={styles.lessonDuration}>{duration}</Text>
      </View>
    </View>
    {status === 'completed' && (
      <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
    )}
    {status === 'active' && (
      <Ionicons name="play-circle" size={24} color="#2196F3" />
    )}
    {status === 'locked' && (
      <Ionicons name="lock-closed" size={24} color="#9E9E9E" />
    )}
  </TouchableOpacity>
);

const SectionHeader = ({ title, expanded }) => (
  <TouchableOpacity style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <Ionicons
      name={expanded ? 'chevron-up' : 'chevron-down'}
      size={24}
      color="#757575"
    />
  </TouchableOpacity>
);

export default function CourseDetailLesson() {
  return (
    <View style={styles.container}>
      <View style={styles.statusBar}>
        <Text style={styles.time}>9:41</Text>
        <View style={styles.icons}>
          <Ionicons name="cellular" size={16} color="black" />
          <Ionicons name="wifi" size={16} color="black" style={styles.icon} />
          <View style={styles.batteryContainer}>
            <View style={styles.battery}>
              <View style={styles.batteryLevel} />
            </View>
            <View style={styles.batteryTip} />
          </View>
        </View>
      </View>

      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>Course details</Text>
          <View style={styles.rightIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="bookmark-outline" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="ellipsis-vertical" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>

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
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>OVERVIEW</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tab, styles.activeTab]}>
            <Text style={[styles.tabText, styles.activeTabText]}>LESSONS</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>REVIEW</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <SectionHeader title="I - Introduction" expanded={true} />
          <LessonItem
            number="1"
            title="Amet adipisicing consectetur"
            duration="01:23 mins"
            status="completed"
          />
          <LessonItem
            number="2"
            title="Adipisicing dolor amet occaeca"
            duration="01:23 mins"
            status="active"
          />

          <SectionHeader
            title="III - Plan for your UX Research"
            expanded={true}
          />
          <LessonItem
            number="3"
            title="Exercitation elit incididunt esse"
            duration="01:23 mins"
            status="locked"
          />
          <LessonItem
            number="4"
            title="Duis esse ipsum laboru"
            duration="01:23 mins"
            status="locked"
          />
          <LessonItem
            number="5"
            title="Labore minim reprehenderit pariatur ea deserunt"
            duration="01:23 mins"
            status="locked"
          />

          <SectionHeader title="III - Conduct UX research" expanded={false} />
          <SectionHeader title="IV - Articulate findings" expanded={false} />
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
    backgroundColor: '#fff',
  },
  statusBar: {
    height: 44,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  time: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 6,
  },
  batteryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 6,
  },
  battery: {
    width: 22,
    height: 11,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 2,
    justifyContent: 'center',
    padding: 1,
  },
  batteryLevel: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
  },
  batteryTip: {
    width: 1,
    height: 4,
    backgroundColor: 'black',
    marginLeft: 1,
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
  backButton: {
    padding: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  rightIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    padding: 4,
    marginLeft: 16,
  },

  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#2196F3',
  },
  tabText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#757575',
  },
  activeTabText: {
    color: '#2196F3',
  },
  content: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  lessonItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  activeLessonItem: {
    backgroundColor: '#E3F2FD',
    borderRadius: 8,
    marginVertical: 4,
    paddingHorizontal: 12,
  },
  lessonInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lessonNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 12,
    color: '#757575',
  },
  lessonTitle: {
    fontSize: 14,
    fontWeight: '500',
  },
  lessonDuration: {
    fontSize: 12,
    color: '#757575',
    marginTop: 4,
  },

  courseHeader: {
    backgroundColor: '#7C4DFF',
    padding: 16,
    height: 200,
    justifyContent: 'flex-end',
  },
  courseCategory: {
    color: '#fff',
    fontSize: 14,
  },
  courseTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
  },
  playButton: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  courseInfo: {
    padding: 16,
  },
  courseSubtitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  ratingText: {
    marginLeft: 4,
    color: '#757575',
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  originalPrice: {
    fontSize: 16,
    color: '#757575',
    textDecorationLine: 'line-through',
    marginLeft: 8,
  },
  addToCartButton: {
    backgroundColor: '#00BCD4',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 4,
  },
  addToCartText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
