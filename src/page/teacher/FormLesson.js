import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Component() {
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
  const [videoUrl, setVideoUrl] = useState("");

  const toggleOption = (key) => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      [key]: !prevOptions[key],
    }));
  };

  const renderOption = ({ item: [key, value] }) => (
    <View style={styles.optionRow}>
      <TouchableOpacity
        style={[styles.checkbox, value && styles.checkboxChecked]}
        onPress={() => toggleOption(key)}
      >
        {value && <Text style={styles.checkboxText}>✓</Text>}
      </TouchableOpacity>
      <Text style={styles.optionText}>
        {key.charAt(0).toUpperCase() + key.slice(1)}
      </Text>
      {key === "other" && value && (
        <TextInput
          style={[styles.input, styles.otherInput]}
          value={otherText}
          onChangeText={setOtherText}
          placeholder="Specify other option"
        />
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView>
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

        <View style={styles.optionContainer}>
          <Text style={styles.label}>Options</Text>
          <FlatList
            data={Object.entries(options)}
            renderItem={renderOption}
            keyExtractor={([key]) => key}
          />
        </View>

        <View style={styles.mediaContainer}>
          <Text style={styles.label}>Image URL</Text>
          <View style={styles.inputWithIcon}>
            <TextInput
              style={[styles.input, styles.mediaInput]}
              value={imageUrl}
              onChangeText={setImageUrl}
              placeholder="Enter image URL"
            />
            <TouchableOpacity style={styles.uploadButton}>
              <Ionicons name="cloud-upload-outline" size={20} color="#666" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.mediaContainer}>
          <Text style={styles.label}>Video URL</Text>
          <View style={styles.inputWithIcon}>
            <TextInput
              style={[styles.input, styles.mediaInput]}
              value={videoUrl}
              onChangeText={setVideoUrl}
              placeholder="Enter video URL"
            />
            <TouchableOpacity style={styles.uploadButton}>
              <Ionicons name="cloud-upload-outline" size={20} color="#666" />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.doneButton}>
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
      </ScrollView>
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
    marginBottom: 20,
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
  optionContainer: {
    marginBottom: 20,
  },
  optionRow: {
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
  optionText: {
    fontSize: 16,
    flex: 1,
  },
  otherInput: {
    flex: 1,
    marginLeft: 12,
  },
  mediaContainer: {
    marginBottom: 20,
  },
  inputWithIcon: {
    flexDirection: "row",
    alignItems: "center",
  },
  mediaInput: {
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
