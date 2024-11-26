import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Layout from "../../component/lesson/Layout_Lesson";
import { useToast } from "../../component/customToast";

import { useDispatch, useSelector } from "react-redux";
import { getAllLesson } from "../../redux/lessonSlice";
import { findCourseByID } from "../../redux/courseSlice";
import { addUrlVideo } from "../../redux/lessonSlice";


export default function LessonComponent({ navigation, route }) {
  const listLesson = useSelector((state) => state.lesson.listLesson); // lấy thông tin lesson
  const courseDetail = useSelector((state) => state.course.courseDetail); // lấy thông tin course từ route id

  const toast = useToast();
  const dispatch = useDispatch();

  const [lessons, setLessons] = useState([]); // khởi tạo state lessons
  const [course, setCourse] = useState({}); // khởi tạo state course
  const [expandedSections, setExpandedSections] = useState([]); // Trạng thái mở rộng của từng lesson
  const [activeIndex, setActiveIndex] = useState(null); // trạng thái khi chuyển màu khi chọn lesson
  const CourseID = route.params.params.courseID; // lấy courseID từ myCourse truyền qua

  useEffect(() => {
    dispatch(findCourseByID(route.params.params?.courseID)); // Gửi action để lấy thông tin course
    dispatch(getAllLesson()); // gọi api lấy danh sách lesson
  }, []);

  // top-page detail course
  useEffect(() => {
    setCourse(courseDetail);
  }, [courseDetail]);

  // lessons
  useEffect(() => {
    if (listLesson.length !== 0) {
      setLessons(listLesson);
    }
  }, [listLesson]);

  const LessonItem = ({ number, name, status, isActive, onPress }) => (
    <TouchableOpacity
      style={[styles.lessonItem, isActive && styles.activeLessonItem]}
      onPress={onPress}
    >
      <View style={styles.lessonInfo}>
        <Text style={styles.lessonNumber}>
          {number.toString().padStart(2, "0")}
        </Text>
        <View>
          <Text style={styles.lessonTitle}>{name}</Text>
        </View>
      </View>
      {status === 2 && (
        <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
      )}
      {status === 1 && (
        <Ionicons name="play-circle" size={24} color="#2196F3" />
      )}
      {status === "locked" && (
        <Ionicons name="lock-closed" size={24} color="#9E9E9E" />
      )}
    </TouchableOpacity>
  );

  const SectionHeader = ({ title, expanded, onPress }) => (
    <TouchableOpacity style={styles.sectionHeader} onPress={onPress}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Ionicons
        name={expanded ? "chevron-up" : "chevron-down"}
        size={24}
        color="#757575"
      />
    </TouchableOpacity>
  );

  // hiệu ứng mở rộng lesson
  const toggleExpand = (lessonIndex) => {
    setExpandedSections(
      (prev) =>
        prev.includes(lessonIndex)
          ? prev.filter((index) => index !== lessonIndex) // Thu gọn nếu đang mở
          : [...prev, lessonIndex] // Mở nếu đang đóng
    );
  };

  const onClickVideo = async (lessonIndex, videoIndex, urlVideo) => {
    setActiveIndex({ lessonIndex, videoIndex });
    await dispatch(addUrlVideo(urlVideo));
  };

  return (
    <Layout navigation={navigation} route={route}>
      <View style={styles.lessonsList}>
        {lessons.map((lesson, lessonIndex) => (
          <View key={lessonIndex}>
            <SectionHeader
              title={lesson.title}
              expanded={expandedSections.includes(lessonIndex)} // Trạng thái mở rộng
              onPress={() => toggleExpand(lessonIndex)} // Xử lý nhấn
            />
            {/* khi nào SectionHeader mở thì mới đc chọn */}
            {expandedSections.includes(lessonIndex) && (
              <View>
                {lesson.Video &&
                  lesson.Video.map((video, videoIndex) => (
                    <LessonItem
                      key={`${lessonIndex}-${videoIndex}`}
                      number={videoIndex + 1}
                      name={video.name}
                      status={video.state} // 1: active, 2: done, locked: locked
                      isActive={
                        activeIndex?.lessonIndex === lessonIndex &&
                        activeIndex?.videoIndex === videoIndex
                      } // Kiểm tra active
                      onPress={
                        () => onClickVideo(lessonIndex, videoIndex, video.urlVideo) // Cập nhật trạng thái active
                      }
                    />
                  ))}
              </View>
            )}
          </View>
        ))}
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  lessonsList: {
    padding: 16,
  },
  lessonItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  // lessonLeft: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   flex: 1,
  // },

  lessonItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  activeLessonItem: {
    backgroundColor: "#E3F2FD",
    borderRadius: 8,
    marginVertical: 4,
    paddingHorizontal: 12,
  },
  // lessonInfo: {
  //   flexDirection: "row",
  //   alignItems: "center",
  // },
  // lessonNumber: {
  //   fontSize: 14,
  //   fontWeight: "bold",
  //   marginRight: 12,
  //   color: "#757575",
  // },
  // lessonTitle: {
  //   fontSize: 14,
  //   fontWeight: "500",
  // },

  lessonNumber: {
    width: 30,
    fontSize: 14,
    color: "#666",
  },
  lessonInfo: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 14,
    marginBottom: 4,
  },
  // lessonDuration: {
  //   fontSize: 12,
  //   color: "#666",
  // },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
