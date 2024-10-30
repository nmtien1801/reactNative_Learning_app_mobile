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
import Teacher_Profile from "./page/Teacher_Profile";

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
    <LoginScreen />
    // <RegisterScreen />
    // <User_Profile />
    // <Teacher_Profile />
  );
}
