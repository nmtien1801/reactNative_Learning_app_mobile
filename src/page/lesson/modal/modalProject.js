import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { Ionicons } from "@expo/vector-icons";

const ModalProject = ({ visible, onClose, onSubmit }) => {
  const [file, setFile] = useState(null); // lưu ảnh
  const [formData, setFormData] = useState({
    name: "",
    desc: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSubmit({ ...formData, file });
    onClose();
  };

  const pickImage = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "image/*",
        copyToCacheDirectory: true,
      });

      if (result.canceled === false) {
        setFile({
          uri: result.assets[0].uri,
          name: result.assets[0].name,
          size: result.assets[0].size ?? 0,
          type: result.assets[0].mimeType ?? "unknown",
        });
      }
    } catch (error) {
      console.error("Error picking document:", error);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Add New Project</Text>
          <ScrollView>
            {/* ảnh */}
            {/* image: thêm 1 file */}
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={() => pickImage()}
            >
              <Ionicons name="cloud-upload-outline" size={24} color="#00BDD6" />
              <Text style={styles.uploadText}>Import image png</Text>
            </TouchableOpacity>
            {file && <Image source={{ uri: file.uri }} style={styles.image} />}

            {/* Name */}
            <Text style={styles.label}>Name:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter name"
              value={formData.name}
              onChangeText={(value) => handleChange("name", value)}
            />

            {/* Description */}
            <Text style={styles.label}>Description:</Text>
            <TextInput
              style={[styles.input, styles.textarea]}
              placeholder="Enter description"
              value={formData.desc}
              onChangeText={(value) => handleChange("desc", value)}
              multiline
            />

            {/* Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={onClose}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default ModalProject;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  textarea: {
    height: 80,
    textAlignVertical: "top",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: "#ff4d4d",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
  uploadButton: {
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
});
