import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";


export default function Intro() {
  const navigation = useNavigation();

  useEffect(() => {
    // Chuyển sang trang login sau 2 giây
    const timer = setTimeout(() => {
      navigation.replace("login");
    }, 2000);

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
    height: "auto",
  },
  img: {
    flex: 1,
    height: 700,
    width: 400,
  },
});
