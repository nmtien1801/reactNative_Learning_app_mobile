import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
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

import Cart from "./page/user/cart/Cart";
import HistoryCart from "./page/user/cart/History-cart";
import DrawerHeader from "./header/drawerNavigatorHeader/DrawerHeader";
import HomeUser from "./page/user/Home-User";

import HeaderCart from "./header/Header-Cart";

import { store } from "./redux/store";
import { Provider } from "react-redux";
import { CustomToast } from "./component/customToast";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function LessonTabs({navigation, route}) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: "none" },
      }}
    >
      <Tab.Screen
        name="Learning_Lesson"
        component={DrawerHeader}
        initialParams={{ screenName: "Learning_Lesson" , courseID: route.params?.courseID}}
      />
      <Tab.Screen
        name="Learning_Project"
        component={DrawerHeader}
        initialParams={{ screenName: "Learning_Project", courseID: route.params?.courseID }}
      />
      <Tab.Screen
        name="Learning_QA"
        component={DrawerHeader}
        initialParams={{ screenName: "Learning_QA", courseID: route.params?.courseID }}
      />
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
    <Provider store={store}>
      <CustomToast>
        <Project />
      </CustomToast>
    </Provider>
  );
}

const Project = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Intro"
          component={Intro}
          options={{ header: () => {} }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ header: () => {} }}
        />
        <Stack.Screen
          name="SignUp"
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
          name="courseListing"
          component={CourseListing}
          options={{ header: () => {} }}
        />

        {/* ===================== course */}
        <Stack.Screen
          name="courseDetailOverView"
          component={DrawerHeader}
          initialParams={{ screenName: "CourseDetailOverView" }}
          options={{ header: () => {} }}
        />
        <Stack.Screen
          name="courseDetailLesson"
          component={DrawerHeader}
          initialParams={{ screenName: "CourseDetailLesson" }}
          options={{ header: () => {} }}
        />
        <Stack.Screen
          name="courseDetailReview"
          component={DrawerHeader}
          initialParams={{ screenName: "CourseDetailReview" }}
          options={{ header: () => {} }}
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
          options={({ navigation, route }) => ({
            header: () => <HeaderCart navigation={navigation} route={route} />,
          })}
        />
        {/* ===================== user - home */}
        <Stack.Screen
          name="homeUser"
          component={HomeUser}
          options={{ header: () => {} }}
        />

        {/* ===================== teacher */}
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
        <Stack.Screen
          name="ManageCourse"
          component={ManageCourse}
          options={{ header: () => {} }}
        />
        <Stack.Screen
          name="ManageLesson"
          component={ManageLesson}
          options={{ header: () => {} }}
        />

        <Stack.Screen
          name="ManageProject"
          component={ManageProject}
          options={{ header: () => {} }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
