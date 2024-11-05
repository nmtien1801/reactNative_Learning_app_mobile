import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ShowMenu() {
  const handleSettings = () => {
    // Handle settings action
    console.log('Settings pressed');
  };

  const handleLogout = () => {
    // Handle logout action
    console.log('Logout pressed');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.button} 
        onPress={handleSettings}
      >
        <Text style={styles.buttonText}>Cài đặt</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.button} 
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 8,
  },
  button: {
    backgroundColor: '#00BCD4',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
});