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
import { toast } from "react-toastify";

import { useDispatch, useSelector } from 'react-redux'
import { handleRegister } from "../../redux/authSlice";

export default function RegisterScreen({navigation, route}) {
  const [email, setEmail] = useState(""); // email đăng nhập
  const [password, setPassword] = useState(""); // password đăng nhập
  const [userName, setUserName] = useState(""); // tên người dùng
  const [confirmPassword, setConfirmPassword] = useState(""); // xác nhận password
  const dispatch = useDispatch();

  onClickRegister = async () => {
    let res = await dispatch(handleRegister({email, userName, password}));
    
    if(res.payload.EC == 0){
      toast.success(res.payload.EM);
      navigation.navigate("Login")
    }else{
      toast.error(res.payload.EM);
    }
  };
  return (
    <View style={styles.container}>
      <LinearGradient colors={["#A9C6EB", "#FFC0CB"]} style={styles.background}>
        <View style={styles.content}>
          <Image
            source={require("../../../img/Login_Register/Login.jpg")}
            style={styles.img}
          />
          <View style={styles.formContainer}>
            <Text style={styles.title}>Sign up</Text>
            <TextInput
              style={styles.input}
              placeholder="UserName"
              placeholderTextColor="#999"
              onChangeText={setUserName}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
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
            <TextInput
              style={styles.input}
              placeholder="Confirm password"
              placeholderTextColor="#999"
              secureTextEntry
              
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.createButton]}
                onPress={() => onClickRegister()}
              >
                <Text style={styles.buttonText}>Create</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => navigation.navigate("Login")}
              >
                <Text style={styles.buttonText}>Cancel</Text>
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
    // alignItems: 'center',
    padding: 20,
  },
  img: {
    width: 150,
    height: 150,
    marginTop: 40,
    marginLeft: 0,
  },
  formContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    height: 400,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ddd",
    borderBottomWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: "48%",
    alignItems: "center",
  },
  createButton: {
    backgroundColor: "#1DCCE4",
  },
  cancelButton: {
    backgroundColor: "#94E66E",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
