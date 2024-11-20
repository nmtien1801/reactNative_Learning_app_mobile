import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { CustomToast } from "./component/customToast";

import CourseSearch from "./page/user/detail-course/Course-Search";
import CourseListing from "./page/user/detail-course/Course-Listing";
import MyCourse from "./page/user/my-course/My-course";
import Intro from "./page/auth/App_Intro";
import RegisterScreen from "./page/auth/Register";
import Login from "./page/auth/Login";
import User_Profile from "./page/user/User_Profile";
import TeacherOverview from "./page/teacher/TeacherOverview";
import TeacherCourses from "./page/teacher/TeacherCourses";
import TeacherReviews from "./page/teacher/TeacherReviews";
import ManageCourse from "./page/teacher/ManageCourse";
import ManageProject from "./page/teacher/ManageProject";
import ManageLesson from "./page/teacher/ManageLesson";
import FormCourse from "./page/teacher/FormCourse";
import FormLesson from "./page/teacher/FormLesson";
import Learning_Lesson from "./page/lesson/Learning_Lesson";
import Learning_Project from "./page/lesson/Learning_Project";
import Learning_QA from "./page/lesson/Learning_QA";
import Cart from "./page/user/cart/Cart";
import HistoryCart from "./page/user/cart/History-cart";
import DrawerHeader from "./header/drawerNavigatorHeader/DrawerHeader";
import HomeUser from "./page/user/Home-User";
import HeaderCart from "./header/Header-Cart";

// Create Navigators
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function LessonTabs() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, tabBarStyle: { display: "none" } }}
    >
      <Tab.Screen name="Learning_Lesson" component={Learning_Lesson} />
      <Tab.Screen name="Learning_Project" component={Learning_Project} />
      <Tab.Screen name="Learning_QA" component={Learning_QA} />
    </Tab.Navigator>
  );
}

function TeacherTabs() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, tabBarStyle: { display: "none" } }}
    >
      <Tab.Screen name="TeacherOverview" component={TeacherOverview} />
      <Tab.Screen name="TeacherCourses" component={TeacherCourses} />
      <Tab.Screen name="TeacherReviews" component={TeacherReviews} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <CustomToast>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Teacher"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Intro" component={Intro} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={RegisterScreen} />
            <Stack.Screen name="courseSearch" component={CourseSearch} />
            <Stack.Screen name="courseListing" component={CourseListing} />
            <Stack.Screen name="myCourse" component={MyCourse} />
            <Stack.Screen name="userProfile" component={User_Profile} />
            <Stack.Screen name="cart" component={Cart} />
            <Stack.Screen name="homeUser" component={HomeUser} />
            <Stack.Screen name="Teacher" component={TeacherTabs} />
            <Stack.Screen name="Lesson" component={LessonTabs} />
            <Stack.Screen name="ManageCourse" component={ManageCourse} />
            <Stack.Screen name="ManageLesson" component={ManageLesson} />
            <Stack.Screen name="ManageProject" component={ManageProject} />
          </Stack.Navigator>
        </NavigationContainer>
      </CustomToast>
    </Provider>
  );
}
