import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Component({ navigation }) {
  const [options, setOptions] = useState({
    design: false,
    code: false,
    business: false,
    video: false,
    language: false,
    other: false,
  });
  const [otherText, setOtherText] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const toggleOption = (key) => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      [key]: !prevOptions[key], // nghĩa là nếu key đã được chọn thì bỏ chọn và ngược lại
    }));
  };

  const renderCategory = ({ item: [key, value] }) => (
    <View style={styles.categoryRow}>
      <TouchableOpacity
        style={[styles.checkbox, value && styles.checkboxChecked]}
        onPress={() => toggleCategory(key)}
      >
        {value && <Text style={styles.checkboxText}>✓</Text>}
      </TouchableOpacity>
      <Text style={styles.categoryText}>
        {key.charAt(0).toUpperCase() + key.slice(1)}
      </Text>
      {key === "other" && value && (
        <TextInput
          style={[styles.input, styles.otherInput]}
          value={otherText}
          onChangeText={setOtherText}
          placeholder="Specify other category"
        />
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lesson</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Title</Text>
        <TextInput style={styles.input} placeholder="Enter title" />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter description"
          multiline
        />
      </View>

      <View style={styles.categoriesContainer}>
        <Text style={styles.label}>Categories</Text>
        <FlatList
          data={Object.entries(categories)}
          renderItem={renderCategory}
          keyExtractor={([key]) => key}
        />
      </View>

      <View style={styles.imageContainer}>
        <Text style={styles.label}>Image</Text>
        <View style={styles.imageInputContainer}>
          <TextInput
            style={[styles.input, styles.imageInput]}
            value={imageUrl}
            onChangeText={setImageUrl}
            placeholder="URL"
          />
          <TouchableOpacity style={styles.uploadButton}>
            <Ionicons name="cloud-upload-outline" size={20} color="#666" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.imageContainer}>
        <Text style={styles.label}>Video</Text>
        <View style={styles.imageInputContainer}>
          <TextInput
            style={[styles.input, styles.imageInput]}
            value={imageUrl}
            onChangeText={setImageUrl}
            placeholder="URL"
          />
          <TouchableOpacity style={styles.uploadButton}>
            <Ionicons name="cloud-upload-outline" size={20} color="#666" />
          </TouchableOpacity>
        </View>
      </View>

        <TouchableOpacity
          style={styles.doneButton}
          onPress={() => navigation.navigate("ManageLesson")}
        >
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",

    marginTop: 20,
    textAlign: "center",
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
  otherInput: {
    flex: 1,
    marginLeft: 12,
  },
  imageContainer: {
    marginBottom: 20,
  },
  imageInputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageInput: {
    flex: 1,
    marginRight: 12,
  },
  uploadButton: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#00BDD6",
  },
  doneButton: {
    backgroundColor: "#4CD964",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  doneButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
