import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "../../component/customToast";

import { getProjectByUser, createProject } from "../../redux/projectSlice";
import { findCourseByID } from "../../redux/courseSlice";
import ModalProject from "../../page/lesson/modal/modalProject";

export default function ProjectComponent({ navigation, route }) {
  const listProjectUser = useSelector((state) => state.project.listProjectUser);
  const user = useSelector((state) => state.auth.user);
  const courseDetail = useSelector((state) => state.course.courseDetail);
  const dispatch = useDispatch();
  const toast = useToast();

  const [project, setProject] = useState([]); // state lưu project
  const [isModalVisible, setModalVisible] = useState(false); // trạng thái modal

  useEffect(() => {
    dispatch(getProjectByUser(user._id));
    dispatch(findCourseByID(route.params?.params?.courseID));
  }, []);

  // project
  useEffect(() => {
    setProject(listProjectUser);
  }, [listProjectUser]);

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
      <Image
        source={{
          uri: item.image,
        }}
        style={styles.projectImage}
      />
      <Text style={styles.projectName}>{item.name}</Text>
      <Text style={styles.projectInstitution}>{item.description}</Text>
    </View>
  );

  const handleOpenModal = () => setModalVisible(true);
  const handleCloseModal = () => setModalVisible(false);

  const handleSubmit = async (data) => {
    let _data = { ...data, userID: user._id };
    let res = await dispatch(createProject(_data));

    if (res && +res.payload.EC === 0) {
      await dispatch(getProjectByUser(user._id));
      toast(res.payload.EM);
    } else {
      toast(res.payload.EM, "error");
    }
  };

  return (
    <Layout navigation={navigation} route={route}>
      <View style={{ gap: 20 }}>
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={() => handleOpenModal()}
        >
          <Ionicons name="cloud-upload-outline" size={24} color="#00BDD6" />
          <Text style={styles.uploadText}>Upload your project here</Text>
        </TouchableOpacity>
        <ModalProject
          visible={isModalVisible}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
        />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Student Projects</Text>
          <TouchableOpacity>
            <Text style={styles.viewMore}>View more</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={project}
          renderItem={renderProject}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.projectList}
        />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Project Description</Text>
          <Text style={styles.description}>
            {courseDetail.descProject}
            <Text style={styles.readMore}> see more</Text>
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Resources ({resources.length})
          </Text>
          <FlatList
            data={resources}
            renderItem={renderResource}
            keyExtractor={(item) => item.id}
            style={styles.resourceList}
          />
        </View>
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
    width: 300,
    marginRight: 12,
  },
  projectImage: {
    width: "100%",
    height: 180,
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
