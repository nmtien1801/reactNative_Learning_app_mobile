import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import Login from "./auth/Login";
// import Register from "./auth/Register";

import CourseSearch from "./component/Course-Search";
import CourseListting from "./component/Course-Listting";
import CourseDetailOverView from "./component/Course-Detail-OverView";
import CourseDetailLesson from "./component/Course-Detail-Lesson";
import CourseDetailReview from "./component/Course-Detail-Review";
import MyCourse from "./component/My-course";
import HeaderCourseDetail from "./header/Header-Course-Detail";

import RegisterScreen from "./page/auth/Register";
import User_Profile from "./page/user/User_Profile";
import TeacherOverviewScreen from "./page/teacher/TeacherOverviewScreen";
import TeacherCoursesScreen from "./page/teacher/TeacherCoursesScreen";
import TeacherReviewsScreen from "./page/teacher/TeacherReviewsScreen";
import Teacher_Course from "./page/teacher/Teacher_Course";

// click -> Login
function handleLogin({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Login!</Text>
      <Button
        title="Go to Login"
        onPress={() => navigation.navigate("Login")}
      />
    </View>
  );
}

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="register">
        <Stack.Screen name="home" component={handleLogin} />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="register" component={RegisterScreen} />

        {/* ================ search course */}
        <Stack.Screen
          name="courseSearch"
          component={CourseSearch}
          options={{ header: () => {} }}
        />
        <Stack.Screen
          name="courseListting"
          component={CourseListting}
          options={{ header: () => {} }}
        />

        {/* ===================== course */}
        <Stack.Screen
          name="courseDetailOverView"
          component={CourseDetailOverView}
          options={({ navigation, route }) => ({
            header: () => <HeaderCourseDetail navigation={navigation} route={route} />
          })}
        />
        <Stack.Screen
          name="courseDetailLesson"
          component={CourseDetailLesson}
          options={({ navigation, route }) => ({
            header: () => <HeaderCourseDetail navigation={navigation} route={route} />
          })}
        />
        <Stack.Screen
          name="courseDetailReview"
          component={CourseDetailReview}
          options={({ navigation, route }) => ({
            header: () => <HeaderCourseDetail navigation={navigation} route={route} />
          })}
        />

        {/* ===================== my course */}
        <Stack.Screen
          name="myCourse"
          component={MyCourse}
          options={{ header: () => {} }}
        />

        {/* ===================== teacher */}
        <Stack.Screen
          name="TeacherOverview"
          component={TeacherOverviewScreen}
          options={{ header: () => {} }}
        />
        <Stack.Screen
          name="TeacherCourses"
          component={TeacherCoursesScreen}
          options={{ header: () => {} }}
        />
        <Stack.Screen
          name="TeacherReviews"
          component={TeacherReviewsScreen}
          options={{ header: () => {} }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
