import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Intro() {
  const navigation = useNavigation();

  useEffect(() => {
    console.log("Chuyển hướng sẽ chạy sau 3 giây...");
    const timer = setTimeout(() => {
      console.log("Đang chuyển hướng...");
      navigation.navigate("Login");
    }, 3000);

    // Dọn dẹp timer khi component unmount
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../img/Login_Register/Intro.png")}
        style={styles.img}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    // width: "100%",
    height: "100%",
    resizeMode: "contain", // Đảm bảo hình ảnh không bị méo
  },
});
