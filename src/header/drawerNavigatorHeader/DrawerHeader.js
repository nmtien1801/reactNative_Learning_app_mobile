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

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";

import Header from "../Header-Course-Detail";
import Setting from "../../component/setting/Setting";
import LoginScreen from "../../page/auth/Login";

import CourseDetailOverView from "../../page/user/Course-Detail-OverView";
import CourseDetailLesson from "../../page/user/Course-Detail-Lesson";
import CourseDetailReview from "../../page/user/Course-Detail-Review";
import UserProfile from "../../page/user/User_Profile";

const DrawerHeader = ({ navigation, route }) => {
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
          label="Setting"
          onPress={() => props.navigation.navigate("Setting")}
        />

        <DrawerItem
          label="Log out"
          onPress={() => props.navigation.navigate("LoginScreen")}
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
        name="Home"
        component={initialScreen}
        options={({ navigation, route }) => ({
          header: () => <Header navigation={navigation} route={route} />,
        })}
      />
      {/* dưới đây là nơi chứa đường dẫn của thanh drawer */}
      <Drawer.Screen
        name="Setting"
        component={Setting}
        options={{ headers: () => {} }}
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
});

export default DrawerHeader;
