import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function FooterTeacher({ navigation , route, showActive}) {
  const [active, SetActive] = useState();

  useEffect(() => {
    SetActive(showActive);
  }, [active]);

  return (
    <View style={styles.tabBar}>
      <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Teacher')}>
        <Ionicons name="home" size={24} color={(active === 'home') ? "#00BCD4" : "#666"} />
        <Text style={[styles.tabLabel, active === 'home' && styles.activeTabLabel]}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tabItem} onPress={() =>  navigation.navigate('ManageCourse')}>
        <Ionicons name="book" size={24} color={(active === 'book') ? "#00BCD4" : "#666"} />
        <Text style={[styles.tabLabel, active === 'book' && styles.activeTabLabel]}>My Courses</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('setting')}>
        <Ionicons name="person" size={24} color={(active === 'person') ? "#00BCD4" : "#666"}/>
        <Text style={[styles.tabLabel, active === 'person' && styles.activeTabLabel]}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
    paddingVertical: 10,
  },
  tabItem: {
    alignItems: "center",
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 5,
    color: "#666",
  },
  activeTabLabel: {
    color: "#00BCD4",
  },
});
