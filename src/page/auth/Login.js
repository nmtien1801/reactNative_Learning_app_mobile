import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {  useToast } from "../../component/customToast";

import { useDispatch, useSelector } from 'react-redux'
import { handleLogin } from "../../redux/authSlice";



export default function LoginScreen({ navigation, route }) {
  const [email, setEmail] = useState(""); // email đăng nhập
  const [password, setPassword] = useState(""); // password đăng nhập
  const [errMessage, setErrMessage] = useState(""); // chữ đỏ thông báo lỗi khi nhập sai
  const [isValidValueEmail, setIsValidValueEmail] = useState(true); // kiểm tra email hợp lệ
  const [isValidValuePassword, setIsValidValuePassword] = useState(true); // kiểm tra password hợp lệ
  
  const user = useSelector((state) => state.auth.user); // lấy thông tin user từ store khi đăng nhập thành công
  const dispatch = useDispatch();
  const toast = useToast();

  const OnClickLogin = async () => {

    setErrMessage("");  

    if (!email) {
      toast("please enter your email or phone number", "error");
      setIsValidValueEmail(false);
      return;
    }
    if (!password) {
      toast("please enter your password", "error");
      setIsValidValuePassword(false);
      return;
    }

    let res = await dispatch(handleLogin({email, password}));
    console.log("res: ", res);
    
    if (res.payload && +res.payload.EC === 0) {
      toast(res.payload.EM);
      navigation.navigate("homeUser");
    } else {
      toast(res.payload.EM, "error");
      setErrMessage(res.payload.EM);
    }
  };
  return (
    <View style={styles.container}>
      <LinearGradient colors={["#FFC0CB", "#A9C6EB"]} style={styles.background}>
        <View style={styles.content}>
          <Image
            source={require("../../../img/Login_Register/Login.jpg")}
            style={styles.img}
          />
          <View style={styles.formContainer}>
            <Text style={styles.title}>Login</Text>
            <TextInput
              style={styles.input}
              placeholder="Username/Email"
              placeholderTextColor="#999"
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#999"
              secureTextEntry
              onChangeText={setPassword}
            />

            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => OnClickLogin()}
            >
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
            <Text style={styles.errorText}>
              Username hoặc mật khẩu không chính xác
            </Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 20,
                marginTop: 20,
              }}
            >
              <TouchableOpacity>
                <Text style={styles.forgotPassword}>Forgot Password?</Text>
              </TouchableOpacity>
              <Text>|</Text>
              <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                <Text style={styles.signupText}>Not a member? Signup</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  content: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: "center",
    padding: 20,
  },
  img: {
    width: 150,
    height: 150,
    marginLeft: 180,
    marginTop: 40,
  },
  formContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: 400,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#484646",
    borderBottomWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  forgotPassword: {
    color: "#999",
    fontStyle: "italic",
  },
  loginButton: {
    backgroundColor: "#1E90FF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
  signupText: {
    color: "#1E90FF",
  },
});
