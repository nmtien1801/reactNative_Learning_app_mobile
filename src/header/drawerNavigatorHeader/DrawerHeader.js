import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  CheckBox,
  Image,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";

import Header from "../Header-Course-Detail";
import Setting from "../../component/setting/Setting";
import LoginScreen from "../../page/auth/Login";

import CourseDetailOverView from "../../page/user/cource/Course-Detail-OverView";
import CourseDetailLesson from "../../page/user/cource/Course-Detail-Lesson";
import CourseDetailReview from "../../page/user/cource/Course-Detail-Review";
import UserProfile from "../../page/user/User_Profile";

import {  useToast } from "../../component/customToast";
import {logOutUser} from "../../service/userService";
import { useDispatch, useSelector } from 'react-redux'
import {handleLogout} from "../../redux/authSlice";

const DrawerHeader = ({ navigation, route }) => {
  const dispatch = useDispatch(); 
  const toast = useToast();

  OnClickLogout = async (props) => {
    let res = await logOutUser();  // clear cookies
    console.log("res: ", res);
    
    if (res && +res.data.EC === 0) {
      dispatch(handleLogout()); // clear store
      toast("logout success...");
      props.navigation.navigate("LoginScreen")
    } else {
      toast(res.payload.EM , "error");
    }
  };

  // đây là nơi lưu những màn hình của drawer
  function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerHeader}>
          <Image
            source={{
              uri: "https://v0.dev/placeholder.svg?height=50&width=50",
            }}
            style={styles.logo}
          />
          <Text style={styles.logoText}>Nguyen Minh Tien</Text>
        </View>

        <DrawerItem
          label="Favorites"
          onPress={() => props.navigation.navigate("Setting")} // chưa làm
        />

        <DrawerItem
          label="Follow"
          onPress={() => props.navigation.navigate("Setting")} // chưa làm
        />

        <DrawerItem
          label="Setting"
          onPress={() => props.navigation.navigate("Setting")}
        />

        <DrawerItem
          label="Log out"
          onPress={() => OnClickLogout(props)}
        />
      </DrawerContentScrollView>
    );
  }

  const Drawer = createDrawerNavigator();
  
  // đang ở màn hình nào đầu tiên (lấy từ .app qua)
  // nhớ import màn hình
  let initialScreen;
  if (route.params?.screenName === "CourseDetailOverView") {
    initialScreen = CourseDetailOverView;
  } else if (route.params?.screenName === "CourseDetailLesson") {
    initialScreen = CourseDetailLesson;
  } else if (route.params?.screenName === "CourseDetailReview") {
    initialScreen = CourseDetailReview;
  } else if (route.params?.screenName === "UserProfile") {
    initialScreen = UserProfile;
  }

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        header: () => {},
        drawerPosition: "right", // Đặt Drawer di chuyển từ phải sang trái
      }}
    >
      <Drawer.Screen
        name="screenFromApp"
        component={initialScreen}
        initialParams={route}
        options={({ navigation, route }) => ({
          header: () => <Header navigation={navigation} route={route} />,
        })}
      />
      {/* dưới đây là nơi chứa đường dẫn của thanh drawer */}
      <Drawer.Screen
        name="Favorites"
        component={Setting} // chưa làm
        options={({ navigation, route }) => ({
          header: () => {
            return (
              <View style={styles.header}>
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={() => navigation.goBack()}
                >
                  <Ionicons name="chevron-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.titleBar}>Favorites</Text>
              </View>
            );
          },
        })}
      />

      <Drawer.Screen
        name="Follow"
        component={Setting} // chưa làm
        options={({ navigation, route }) => ({
          header: () => {
            return (
              <View style={styles.header}>
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={() => navigation.goBack()}
                >
                  <Ionicons name="chevron-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.titleBar}>Follow</Text>
              </View>
            );
          },
        })}
      />

      <Drawer.Screen
        name="Setting"
        component={Setting}
        options={({ navigation, route }) => ({
          header: () => {
            return (
              <View style={styles.header}>
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={() => navigation.goBack()}
                >
                  <Ionicons name="chevron-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.titleBar}>Setting</Text>
              </View>
            );
          },
        })}
      />

      <Drawer.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headers: () => {} }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 8,
  },
  logoText: {
    fontSize: 16,
    fontWeight: "bold",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    gap: 16,
  },
  backButton: {
    padding: 4,
  },
  titleBar: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default DrawerHeader;
