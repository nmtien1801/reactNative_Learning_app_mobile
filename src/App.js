import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import CourseSearch from "./component/Course-Search";
import CourseListting from "./component/Course-Listting";
import CourseDetailOverView from "./component/Course-Detail-OverView";
import CourseDetailLesson from "./component/Course-Detail-Lesson";
import CourseDetailReview from "./component/Course-Detail-Review";
import MyCourse from "./component/My-course";
import HeaderCourseDetail from "./header/Header-Course-Detail";

import Intro from "./page/auth/App_Intro";
import Login from "./page/auth/Login";
import RegisterScreen from "./page/auth/Register";
import User_Profile from "./page/user/User_Profile";
import TeacherOverview from "./page/teacher/TeacherOverview";
import TeacherCourses from "./page/teacher/TeacherCourses";
import TeacherReviews from "./page/teacher/TeacherReviews";
import Teacher_Course from "./page/teacher/ManageCourse";
import FormCourse from "./page/teacher/FormCourse";
import FormLesson from "./page/teacher/FormLesson";

import Learning_Lesson from "./page/lesson/Learning_Lesson";
import Learning_Project from "./page/lesson/Learning_Project";
import Learning_QA from "./page/lesson/Learning_QA";

import Cart from "./page/user/cart/Cart";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function LessonTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: "none" },
      }}
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
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: "none" },
      }}
    >
      <Tab.Screen name="TeacherOverview" component={TeacherOverview} />
      <Tab.Screen name="TeacherCourses" component={TeacherCourses} />
      <Tab.Screen name="TeacherReviews" component={TeacherReviews} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Lesson">
        <Stack.Screen
          name="Intro"
          component={Intro}
          options={{ header: () => {} }}
        />
        <Stack.Screen
          name="login"
          component={Login}
          options={{ header: () => {} }}
        />
        <Stack.Screen
          name="register"
          component={RegisterScreen}
          options={{ header: () => {} }}
        />

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
            header: () => (
              <HeaderCourseDetail navigation={navigation} route={route} />
            ),
          })}
        />
        <Stack.Screen
          name="courseDetailLesson"
          component={CourseDetailLesson}
          options={({ navigation, route }) => ({
            header: () => (
              <HeaderCourseDetail navigation={navigation} route={route} />
            ),
          })}
        />
        <Stack.Screen
          name="courseDetailReview"
          component={CourseDetailReview}
          options={({ navigation, route }) => ({
            header: () => (
              <HeaderCourseDetail navigation={navigation} route={route} />
            ),
          })}
        />

        {/* ===================== my course */}
        <Stack.Screen
          name="myCourse"
          component={MyCourse}
          options={{ header: () => {} }}
        />

        {/* ===================== user - student */}
        <Stack.Screen
          name="userProfile"
          component={User_Profile}
          options={{ header: () => {} }}
        />

        <Stack.Screen
          name="cart"
          component={Cart}
          options={{ header: () => {} }}
        />
        <Stack.Screen
          name="FormCourse"
          component={FormCourse}
          options={{ header: () => {} }}
        />
        <Stack.Screen
          name="FormLesson"
          component={FormLesson}
          options={{ header: () => {} }}
        />
        <Stack.Screen
          name="Lesson"
          component={LessonTabs}
          options={{ header: () => {} }}
        />
        <Stack.Screen
          name="Teacher"
          component={TeacherTabs}
          options={{ header: () => {} }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
