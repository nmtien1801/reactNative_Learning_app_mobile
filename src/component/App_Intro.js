import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function SignUpScreen() {
  return (
    <View style={styles.container}>
      <Image source={require('../img/Login_Register/App_Intro.jpg')} style={styles.img} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "auto"
  },
  img: {
    flex: 1,
    height: 700,
    width: 430
  },
});
