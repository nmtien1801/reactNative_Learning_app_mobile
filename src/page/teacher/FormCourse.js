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
import * as DocumentPicker from "expo-document-picker";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "../../component/customToast";

import { addNewCourse, updateCourse } from "../../redux/teacherSlide";
import { getAllCourseUser } from "../../redux/userSlice";

export default function Component({ navigation, route }) {
  const user = useSelector((state) => state.auth.user);
  const dataUpdate = route.params?.course;

  const dispatch = useDispatch();
  const toast = useToast();

  const active = route.params?.active;
  const [name, setName] = useState(
    dataUpdate ? dataUpdate.name : "" // tên khóa học
  );
  const [title, setTitle] = useState(
    dataUpdate ? dataUpdate.title : "" // tiêu đề
  );
  const [price, setPrice] = useState(
    dataUpdate ? dataUpdate.price : "" // giá
  );
  const [description, setDescription] = useState(
    dataUpdate ? dataUpdate.description : "" // mô tả
  );
  const [descriptionProject, setDescriptionProject] = useState(
    dataUpdate ? dataUpdate.descProject : "" // mô tả project
  );
  const [file, setFile] = useState(dataUpdate ? dataUpdate.image : null); // lưu ảnh

  console.log("====================================");
  console.log("dataUpdate", dataUpdate);
  console.log("====================================");
  // category set cứng
  const [categories, setCategories] = useState({
    design: false, // 1
    code: false, // 2
    business: false, // 3
    video: false, // 4
    language: false, // 5
    writing: false, // 6
  });

  // Chọn một category, hủy bỏ tất cả các category đã chọn khác
  const toggleCategory = (key) => {
    setCategories({
      design: false,
      code: false,
      business: false,
      video: false,
      language: false,
      writing: false, // 6
      [key]: true, // Chỉ chọn category này
    });
  };

  // Lấy category đã chọn (dưới dạng số)
  const getSelectedCategory = () => {
    // Lọc ra các category có giá trị true (đã chọn)
    const selectedCategory = Object.entries(categories).find(
      ([key, value]) => value
    ); // Tìm category đầu tiên có giá trị true

    if (selectedCategory) {
      const [key] = selectedCategory; // Lấy key của category đã chọn
      switch (key) {
        case "design":
          return 1;
        case "code":
          return 2;
        case "business":
          return 3;
        case "video":
          return 4;
        case "language":
          return 5;
        case "writing":
          return 6;
        default:
          return 0;
      }
    }

    return 0; // Trả về 0 nếu không có category nào được chọn
  };

  // chuyển category từ số sang chữ
  const getCategoryName = (categoryID) => {
    switch (categoryID) {
      case 1:
        return "design";
      case 2:
        return "code";
      case 3:
        return "business";
      case 4:
        return "video";
      case 5:
        return "language";
      case 6:
        return "writing";
      default:
        return "";
    }
  };

  const renderCategory = ({ item: [key, value] }) => {
    return (
      <View style={styles.categoryRow}>
        <TouchableOpacity
          style={[styles.checkbox, value && styles.checkboxChecked]}
          onPress={() => toggleCategory(key)} // sử dụng key trực tiếp
        >
          {value && <Text style={styles.checkboxText}>✓</Text>}
        </TouchableOpacity>
        <Text style={styles.categoryText}>
          {key.charAt(0).toUpperCase() + key.slice(1)}{" "}
          {/* Viết hoa chữ cái đầu */}
        </Text>
      </View>
    );
  };

  // Thiết lập trạng thái mặc định khi có dataUpdate
  useEffect(() => {
    if (dataUpdate) {
      const categoryName = getCategoryName(dataUpdate.categoryID);
      if (categoryName) {
        setCategories((prev) => ({
          ...prev,
          [categoryName]: true,
        }));
      }
    }
  }, [dataUpdate]);

  const pickImage = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "image/*",
        copyToCacheDirectory: true,
      });

      if (result.canceled === false) {
        setFile(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking document:", error);
    }
  };

  const handleSubmit = async () => {
    dataNewCourse = {
      userID: user._id,
      name: name,
      title: title,
      description: description,
      price: price,
      descriptionProject: descriptionProject,
      categoryID: getSelectedCategory(),
      image: file,
      id: dataUpdate ? dataUpdate.id : null,
    };

    let res;
    if (active === "ADD") {
      res = await dispatch(addNewCourse(dataNewCourse));
    } else if (active === "UPDATE") {
      res = await dispatch(updateCourse(dataNewCourse));
    }
    if (res && +res.payload.EC === 0) {
      dispatch(getAllCourseUser(user._id)); // lấy danh sách khoá học của user
      // dispatch(getAllCourseUser(1)); // lấy danh sách khoá học của user
      navigation.navigate("ManageCourse");
      toast(res.payload.EM);
    } else {
      toast(res.payload.EM, "error");
    }
  };

  return (
    <ScrollView style={styles.container}>
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
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter title"
          onChangeText={setTitle}
          value={title}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter description"
          multiline // Cho phép nhập nhiều dòng
          onChangeText={setDescription}
          value={description}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Price</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter price"
          onChangeText={setPrice}
          value={price} // Dùng biến trạng thái đã định nghĩa
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Description Project</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter description project"
          onChangeText={setDescriptionProject}
          value={descriptionProject}
        />
      </View>

      <View style={styles.categoriesContainer}>
        <Text style={styles.label}>Categories</Text>
        <FlatList
          data={Object.entries(categories)}
          renderItem={renderCategory}
          keyExtractor={([key]) => key} // key là tên của category
        />
      </View>

      <View style={styles.imageContainer}>
        <Text style={styles.label}>Image</Text>
        {/* ảnh */}
        {/* image: thêm 1 file */}
        <TouchableOpacity style={styles.uploadBtn} onPress={() => pickImage()}>
          <Ionicons name="cloud-upload-outline" size={24} color="#00BDD6" />
          <Text style={styles.uploadText}>Import image png</Text>
        </TouchableOpacity>
        {file && <Image source={{ uri: file }} style={styles.image} />}
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
