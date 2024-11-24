"use client";

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Footer from "../../component/footer/FooterUser";
export default function Component() {
  const [projects, setProjects] = useState([
    { id: "1", name: "Nguyen Van A", checked: false },
    { id: "2", name: "Nguyen Van B", checked: false },
    { id: "3", name: "Nguyen Van C", checked: false },
    { id: "4", name: "Nguyen Van D", checked: false },
    { id: "5", name: "Nguyen Van E", checked: false },
    { id: "6", name: "Nguyen Van F", checked: false },
    { id: "7", name: "Nguyen Van G", checked: false },
    { id: "8", name: "Nguyen Van H", checked: false },
    { id: "9", name: "Nguyen Van I", checked: false },
    { id: "10", name: "Nguyễn Cao Kỳ Duyên", checked: false },
    { id: "11", name: "Nguyễn Thúc Thùy Tiên", checked: false },
    { id: "12", name: "Trần Khánh Vân", checked: false },
  ]);

  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    const allChecked = projects.every((project) => project.checked);
    setSelectAll(allChecked);
  }, [projects]);

  const toggleCheckbox = (id) => {
    setProjects(
      projects.map((project) =>
        project.id === id ? { ...project, checked: !project.checked } : project
      )
    );
  };

  const toggleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setProjects(
      projects.map((project) => ({ ...project, checked: newSelectAll }))
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.projectItem}>
      <View style={styles.avatar} />
      <Text style={styles.projectName}>{item.name}</Text>
      <TouchableOpacity onPress={() => toggleCheckbox(item.id)}>
        <Ionicons
          name={item.checked ? "checkmark-circle" : "checkmark-circle-outline"}
          size={24}
          color={item.checked ? "#4CAF50" : "#bbb"}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Project</Text>

        <View style={styles.searchBar}>
          <Ionicons
            name="search-outline"
            size={20}
            color="#999"
            style={styles.searchIcon}
          />
          <TextInput placeholder="Search project" style={styles.searchInput} />
          <TouchableOpacity
            style={styles.checkButton}
            onPress={toggleSelectAll}
          >
            <View
              style={[
                styles.checkButtonInner,
                selectAll ? styles.checkButtonActive : null,
              ]}
            >
              <Ionicons name="checkmark" size={16} color="white" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="download-outline" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={projects}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
      <Footer navigation={navigation} /> 
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    padding: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
  },
  checkButton: {
    marginHorizontal: 8,
  },
  checkButtonInner: {
    backgroundColor: "#bbb",
    borderRadius: 12,
    padding: 4,
  },
  checkButtonActive: {
    backgroundColor: "#4CAF50",
  },
  projectItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F3E5F5",
    marginRight: 12,
  },
  projectName: {
    flex: 1,
    color: "#333",
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    fontSize: 12,
    color: "#999",
  },
  activeNavText: {
    color: "#00BCD4",
  },
});
