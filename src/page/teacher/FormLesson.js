import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "../../component/customToast";

import {getLessonByCourse, createLesson, updateLesson} from "../../redux/lessonSlice";

export default function Component({ navigation, route }) {

  const dataUpdate = route.params;

  const dispatch = useDispatch();
  const toast = useToast();

  const active = route.params?.active;
  const [name, setName] = useState(
    dataUpdate && dataUpdate.name ? dataUpdate.name : "" // tên khóa học
  );
  const [title, setTitle] = useState(
    dataUpdate ? dataUpdate.title : "" // tiêu đề
  );
  const [urlVideo, setUrlVideo] = useState(
    dataUpdate && dataUpdate.urlVideo? dataUpdate.urlVideo : "" // url video
  );

  const handleSubmit = async () => {
    dataNewLesson = {
      lessonID: dataUpdate.lessonID,
      videoID: dataUpdate.videoID,
      title: title,
      name: name,
      urlVideo: urlVideo,
      courseID: dataUpdate.courseID,
    };
  console.log("dataNewLesson: ", dataNewLesson);

    let res;
    if (active === "ADD") {
      res = await dispatch(createLesson(dataNewLesson));
    } else if (active === "UPDATE") {
      res = await dispatch(updateLesson(dataNewLesson));
    }
    if (res && +res.payload.EC === 0) {
      // dispatch(getLessonByCourse(dataUpdate.courseID)); // lấy danh sách khoá học của user
      dispatch(getLessonByCourse(1)); // lấy danh sách khoá học của user
      navigation.navigate("ManageLesson");
      toast(res.payload.EM);
    } else {
      toast(res.payload.EM, "error");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter title"
          onChangeText={setTitle}
          value={title} // Dùng biến trạng thái đã định nghĩa
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter name"
          onChangeText={setName}
          value={name} // Dùng biến trạng thái đã định nghĩa
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>URL video</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter url video"
          onChangeText={setUrlVideo}
          value={urlVideo}
        />
      </View>

      <TouchableOpacity style={styles.doneButton} onPress={handleSubmit}>
        <Text style={styles.doneButtonText}>
          {active == "ADD" ? "ADD" : "UPDATE"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#333",
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  categoryRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    backgroundColor: "#f0f0f0",
  },
  checkboxChecked: {
    backgroundColor: "#4CD964",
  },
  checkboxText: {
    fontSize: 12,
    color: "#fff",
  },
  categoryText: {
    fontSize: 16,
    flex: 1,
  },
  imageContainer: {
    marginBottom: 20,
  },
  uploadBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#00BDD6",
    borderRadius: 8,
    padding: 12,
    marginVertical: 12,
  },
  uploadText: {
    color: "#00BDD6",
    fontSize: 16,
    marginLeft: 8,
  },
  doneButton: {
    backgroundColor: "#4CD964",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  doneButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  image: {
    width: 200,
    height: 200,
  },
});
