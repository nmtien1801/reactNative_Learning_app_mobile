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

export default function Footer({ navigation , route}) {
  const [active, SetActive] = useState("home");

  const handleActive = (action) => {
    if(action === 'home'){
      SetActive(action);
      navigation.navigate('home')
    }
    else if(action === 'search'){
      SetActive(action);
      navigation.navigate('courseSearch')
    }
    else if(action === 'book'){
      SetActive(action);
      navigation.navigate('myCourse')
    }
    else if(action === 'person'){
      SetActive(action);
      navigation.navigate('userProfile')
    }
    
  }
  return (
    <View style={styles.tabBar}>
      <TouchableOpacity style={styles.tabItem} onPress={() => handleActive('home')}>
        <Ionicons name="home" size={24} color={(active === 'home') ? "#00BCD4" : "#666"} />
        <Text style={[styles.tabLabel, active === 'home' && styles.activeTabLabel]}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tabItem} onPress={() => handleActive('search')}>
        <Ionicons name="search" size={24} color={(active === 'search') ? "#00BCD4" : "#666"} />
        <Text style={[styles.tabLabel,active === 'search' && styles.activeTabLabel]}>Search</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tabItem} onPress={() => handleActive('book')}>
        <Ionicons name="book" size={24} color={(active === 'book') ? "#00BCD4" : "#666"} />
        <Text style={[styles.tabLabel, active === 'book' && styles.activeTabLabel]}>My Courses</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tabItem} onPress={() => handleActive('person')}>
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
