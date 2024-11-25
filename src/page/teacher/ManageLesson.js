import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Footer from "../../component/footer/FooterTeacher";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "../../component/customToast";
import { getLessonByCourse, deleteVideo } from "../../redux/lessonSlice";

export default function LessonList({ navigation, route }) {
  const listLesson = useSelector((state) => state.lesson.listLesson); // lấy danh sách bài học
  const [expandedSections, setExpandedSections] = useState([]); // Trạng thái mở rộng của từng lesson
  const [activeIndex, setActiveIndex] = useState(null); // trạng thái khi chuyển màu khi chọn lesson

  const dispatch = useDispatch();
  const toast = useToast();

  const [lessons, setLessons] = useState([]); // state lưu danh sách bài học
  const courseID = route.params?.courseID;

  useEffect(() => {
    // dispatch(getLessonByCourse(courseID)); // lấy danh lesson của course
    dispatch(getLessonByCourse(1)); // lấy danh lesson của course
  }, []);

  useEffect(() => {
    setLessons(listLesson);
  }, [listLesson]);
  console.log(">>>lessons", lessons);

  const LessonItem = ({
    number,
    name,
    urlVideo,
    isActive,
    onPress,
    title,
    courseID,
    videoID,
    lessonID,
  }) => (
    <View>
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

        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.actionButton, styles.editButton]}
            onPress={() =>
              navigation.navigate("FormLesson", {
                name,
                urlVideo,
                title,
                courseID,
                lessonID,
                videoID,
                active: "UPDATE",
              })
            }
          >
            <Ionicons name="pencil" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.deleteButton]}
            onPress={() => removeVideo(videoID)}
          >
            <Ionicons name="trash-outline" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
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

  const removeVideo = async (id) => {
    console.log("videoID", id);

    let res = await dispatch(deleteVideo(id));

    if (res && +res.payload.EC === 0) {
      // dispatch(getLessonByCourse(courseID)); // lấy danh sách khoá học của user
      await dispatch(getLessonByCourse(1)); // lấy danh sách khoá học của user
      toast(res.payload.EM);
    } else {
      toast(res.payload.EM, "error");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={[styles.actionButton, styles.addButton]}
          onPress={() => navigation.navigate("FormLesson", {
            courseID: courseID,
            active: "ADD",
          })}
        >
          <Ionicons name="add" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.projectButton]}
          // onPress={() => navigation.navigate("ManageProject")}
        >
          <Ionicons name="copy-outline" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
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
                      urlVideo={video.urlVideo}
                      title={lesson.title}
                      courseID={lesson.courseID}
                      lessonID={lesson.id}
                      videoID={video.id}
                      isActive={
                        activeIndex?.lessonIndex === lessonIndex &&
                        activeIndex?.videoIndex === videoIndex
                      } // Kiểm tra active
                      onPress={
                        () => setActiveIndex({ lessonIndex, videoIndex }) // Cập nhật trạng thái active
                      }
                    />
                  ))}
              </View>
            )}
            <TouchableOpacity
              style={[styles.actionButton, styles.addButton]}
              onPress={() =>
                navigation.navigate("FormLesson", {
                  courseID: lesson.courseID,
                  title: lesson.title,
                  lessonID: lesson.id,
                  active: "ADD",
                })
              }
            >
              <Ionicons name="add" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <Footer navigation={navigation} route={route} showActive="book" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  chapterTitle: {
    fontSize: 16,
    fontWeight: "500",
    padding: 16,
    paddingBottom: 8,
  },
  listContent: {
    padding: 16,
  },
  lessonItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
  },
  lessonInfo: {
    flex: 1,
    marginLeft: 12,
  },
  lessonName: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  duration: {
    fontSize: 14,
    color: "#666",
  },
  actions: {
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  editButton: {
    backgroundColor: "#1DCCE4",
  },
  deleteButton: {
    backgroundColor: "#DD5159",
  },
  projectButton: {
    backgroundColor: "#F72585",
  },
  addButton: {
    backgroundColor: "#4CAF50",
  },

  content: {
    padding: 16,
  },
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
  lessonInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  lessonNumber: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 12,
    color: "#757575",
  },
  lessonTitle: {
    fontSize: 14,
    fontWeight: "500",
  },
});
