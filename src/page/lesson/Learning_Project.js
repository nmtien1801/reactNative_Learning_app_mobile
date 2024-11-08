import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Layout from "../../component/lesson/Layout_Lesson";

export default function ProjectComponent({ navigation }) {
  const studentProjects = [
    {
      id: "1",
      name: "Nhi Nhi",
      institution: "Industrial University of Ho Chi Minh City",
      image:
        "https://cafedev.vn/wp-content/uploads/2019/11/cafedev_reactnt.png",
    },
    {
      id: "2",
      name: "ABC",
      institution: "Ramona Wullschleger",
      image:
        "https://cafedev.vn/wp-content/uploads/2019/11/cafedev_reactnt.png",
    },
    {
      id: "3",
      name: "ABC",
      institution: "Ramona Wullschleger",
      image:
        "https://cafedev.vn/wp-content/uploads/2019/11/cafedev_reactnt.png",
    },
    {
      id: "4",
      name: "ABC",
      institution: "Ramona Wullschleger",
      image:
        "https://cafedev.vn/wp-content/uploads/2019/11/cafedev_reactnt.png",
    },
    {
      id: "5",
      name: "ABC",
      institution: "Ramona Wullschleger",
      image:
        "https://cafedev.vn/wp-content/uploads/2019/11/cafedev_reactnt.png",
    },
  ];

  const resources = [
    { id: "1", name: "Document 1.txt", size: "612 Kb", type: "txt" },
    { id: "2", name: "Document 2.pdf", size: "35 Mb", type: "pdf" },
  ];

  const renderResource = ({ item }) => (
    <View style={styles.resourceRow}>
      <View style={styles.resourceInfo}>
        <View style={styles.iconContainer}>
          <Text style={styles.fileType}>{item.type}</Text>
        </View>
        <View>
          <Text style={styles.resourceName}>{item.name}</Text>
          <Text style={styles.resourceSize}>{item.size}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.downloadButton}>
        <Ionicons name="download-outline" size={20} color="#00BDD6" />
      </TouchableOpacity>
    </View>
  );

  const renderProject = ({ item }) => (
    <View style={styles.projectCard}>
      <Image source={{ uri: item.image }} style={styles.projectImage} />
      <Text style={styles.projectName}>{item.name}</Text>
      <Text style={styles.projectInstitution}>{item.institution}</Text>
    </View>
  );

  return (
    <Layout navigation={navigation}>
      <TouchableOpacity style={styles.uploadButton}>
        <Ionicons name="cloud-upload-outline" size={24} color="#00BDD6" />
        <Text style={styles.uploadText}>Upload your project here</Text>
      </TouchableOpacity>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Student Projects</Text>
        <TouchableOpacity>
          <Text style={styles.viewMore}>View more</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={studentProjects}
        renderItem={renderProject}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.projectList}
      />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Project Description</Text>
        <Text style={styles.description}>
          Deserunt minim incididunt ullamco nostrud so voluptate deserunt
          reprehenderit ullamco est...
          <Text style={styles.readMore}> see more</Text>
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Resources ({resources.length})</Text>
        <FlatList
          data={resources}
          renderItem={renderResource}
          keyExtractor={(item) => item.id}
          style={styles.resourceList}
        />
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
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
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  viewMore: {
    color: "#00BDD6",
  },
  projectList: {
    marginBottom: 16,
  },
  projectCard: {
    width: 120,
    marginRight: 12,
  },
  projectImage: {
    width: "100%",
    height: 80,
    borderRadius: 8,
  },
  projectName: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 4,
  },
  projectInstitution: {
    fontSize: 12,
    color: "#666",
  },
  section: {
    marginBottom: 12,
  },
  description: {
    color: "#666",
  },
  readMore: {
    color: "#00BDD6",
  },
  resourceList: {
    paddingVertical: 8,
  },
  resourceRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    marginBottom: 8,
    justifyContent: "space-between",
  },
  resourceInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  fileType: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#555",
  },
  resourceName: {
    fontSize: 16,
    fontWeight: "500",
  },
  resourceSize: {
    fontSize: 12,
    color: "#666",
  },
  downloadButton: {
    padding: 8,
  },
});
