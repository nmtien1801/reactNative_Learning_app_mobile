import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./auth/Login";
import Register from "./auth/Register";
import MyCourse from "./component/My-course";
import App_Intro from "./page/App_Intro";
import LoginScreen from "./page/Login";
import RegisterScreen from "./page/Register";
import User_Profile from "./page/User_Profile";
import TeacherOverviewScreen from "./page/TeacherOverviewScreen";
import TeacherCoursesScreen from "./page/TeacherCoursesScreen";
import TeacherReviewsScreen from "./page/TeacherReviewsScreen";

const Stack = createStackNavigator();
export default function App() {
  return (
    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName="MyCourse">
    //     <Stack.Screen name="Home" component={handleLogin} />
    //     <Stack.Screen name="Login" component={Login} />
    //     <Stack.Screen name="Register" component={Register} />
    //   </Stack.Navigator>
    // </NavigationContainer>
    // <MyCourse />

    // <App_Intro />
    // <LoginScreen />
    // <RegisterScreen />
    // <User_Profile />
    // <TeacherOverviewScreen />
    // <TeacherCoursesScreen />
    // <TeacherReviewsScreen />

    <NavigationContainer>
      <Stack.Navigator initialRouteName="TeacherOverview">
        <Stack.Screen
          name="TeacherOverview"
          component={TeacherOverviewScreen}
        />
        <Stack.Screen name="TeacherCourses" component={TeacherCoursesScreen} />
        <Stack.Screen name="TeacherReviews" component={TeacherReviewsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
