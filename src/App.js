import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import CourseSearch from "./page/user/detail-course/Course-Search";
import CourseListing from "./page/user/detail-course/Course-Listing";

import MyCourse from "./page/user/my-course/My-course";

import Intro from "./page/auth/App_Intro";
import RegisterScreen from "./page/auth/Register";
import Login from "./page/auth/Login";
import TeacherOverview from "./page/teacher/TeacherOverview";
import TeacherCourses from "./page/teacher/TeacherCourses";
import TeacherReviews from "./page/teacher/TeacherReviews";
import ManageCourse from "./page/teacher/ManageCourse";
import ManageProject from "./page/teacher/ManageProject";
import ManageLesson from "./page/teacher/ManageLesson";
import FormCourse from "./page/teacher/FormCourse";
import FormLesson from "./page/teacher/FormLesson";
import Setting from "./component/setting/Setting";

import Cart from "./page/user/cart/Cart";
import HistoryCart from "./page/user/cart/History-cart";
import DrawerHeader from "./header/drawerNavigatorHeader/DrawerHeader";
import HomeUser from "./page/user/Home-User";

import HeaderCart from "./header/Header-Cart";

import { store } from "./redux/store";
import { Provider } from "react-redux";
import { CustomToast } from "./component/customToast";
import { useSelector } from "react-redux";
import HeaderSetting from "./header/Header_Setting";

import ChatBox from "./component/chatbox/ChatScreens";
import ChangePassword from "./component/setting/Change-pass";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function LessonTabs({ navigation, route }) {
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
        initialParams={{
          screenName: "Learning_Lesson",
          courseID: route.params.courseID,
        }}
      />
      <Tab.Screen
        name="Learning_Project"
        component={DrawerHeader}
        initialParams={{
          screenName: "Learning_Project",
          courseID: route.params.courseID,
        }}
      />
      <Tab.Screen
        name="Learning_QA"
        component={DrawerHeader}
        initialParams={{
          screenName: "Learning_QA",
          courseID: route.params.courseID,
        }}
      />
    </Tab.Navigator>
  );
}

function TeacherTabs({ navigation, route }) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: "none" },
      }}
    >
      <Tab.Screen
        name="TeacherOverview"
        component={TeacherOverview}
        initialParams={{
          params: route.params,
        }}
      />
      <Tab.Screen
        name="TeacherCourses"
        component={TeacherCourses}
        initialParams={{
          params: route.params,
        }}
      />
      <Tab.Screen
        name="TeacherReviews"
        component={TeacherReviews}
        initialParams={{
          params: route.params,
        }}
      />
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
  const { user, isLogin } = useSelector((state) => state.auth);
  console.log("user: ", user);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {!isLogin ? (
          <>
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
            <Stack.Screen
              name="chatBox"
              component={ChatBox}
              options={{ header: () => {} }}
            />
          </>
        ) : (
          <>
            {user.role === 2 ? (
              <>
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
                  component={DrawerHeader}
                  initialParams={{
                    screenName: "UserProfile",
                  }}
                  options={{ header: () => {} }}
                />

                <Stack.Screen
                  name="cart"
                  component={Cart}
                  options={({ navigation, route }) => ({
                    header: () => (
                      <HeaderCart navigation={navigation} route={route} />
                    ),
                  })}
                />

                <Stack.Screen
                  name="historyCart"
                  component={HistoryCart}
                  options={{ header: () => {} }}
                />
                {/* ===================== user - home */}
                <Stack.Screen
                  name="homeUser"
                  component={HomeUser}
                  options={{ header: () => {} }}
                />

                {/* setting */}
                <Stack.Screen
                  name="setting"
                  component={Setting}
                  options={({ navigation, route }) => ({
                    header: () => (
                      <HeaderSetting navigation={navigation} route={route} />
                    ),
                  })}
                />

                <Stack.Screen
                  name="changePassword"
                  component={ChangePassword}
                  options={{ header: () => {} }}
                />

                <Stack.Screen
                  name="Lesson"
                  component={LessonTabs}
                  options={{ header: () => {} }}
                />

                {/* ===================== teacher */}
                <Stack.Screen
                  name="Teacher"
                  component={TeacherTabs}
                  initialParams={{ screenName: "TeacherOverView" }}
                  options={{ header: () => {} }}
                />
              </>
            ) : (
              <>
                {/* ===================== teacher */}
                <Stack.Screen
                  name="Teacher"
                  component={TeacherTabs}
                  initialParams={{ screenName: "TeacherOverView" }}
                  options={{ header: () => {} }}
                />
                <Stack.Screen
                  name="ManageCourse"
                  component={ManageCourse}
                  options={{ header: () => {} }}
                />
                <Stack.Screen name="ManageLesson" component={ManageLesson} />
                <Stack.Screen name="FormCourse" component={FormCourse} />
                <Stack.Screen name="FormLesson" component={FormLesson} />

                <Stack.Screen name="ManageProject" component={ManageProject} />
              </>
            )}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
