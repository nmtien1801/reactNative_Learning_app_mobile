import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { X, Eye, EyeOff } from 'lucide-react-native';

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [error, setError] = useState(true);

  const handleChangePassword = () => {
    // Implement password change logic
    console.log('Changing password...');
  };

  const handleClose = () => {
    // Implement close modal logic
    console.log('Closing modal...');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Đổi mật khẩu</Text>
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <X size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <Text style={styles.description}>
        Mật khẩu của bạn phải gồm 8 kí tự, bao gồm cả chữ số, chữ cái và kí tự đặc biệt
      </Text>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <TextInput
            mode="outlined"
            label="Mật khẩu hiện tại"
            value={currentPassword}
            onChangeText={setCurrentPassword}
            secureTextEntry={!showCurrentPassword}
            error={error}
            right={
              <TextInput.Icon
                icon={() => (showCurrentPassword ? 
                  <EyeOff size={24} color="#666" /> : 
                  <Eye size={24} color="#666" />
                )}
                onPress={() => setShowCurrentPassword(!showCurrentPassword)}
              />
            }
            style={styles.input}
          />
          {error && (
            <Text style={styles.errorText}>Vui lòng nhập mật khẩu hiện tại</Text>
          )}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            mode="outlined"
            label="Mật khẩu mới"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry={!showNewPassword}
            right={
              <TextInput.Icon
                icon={() => (showNewPassword ? 
                  <EyeOff size={24} color="#666" /> : 
                  <Eye size={24} color="#666" />
                )}
                onPress={() => setShowNewPassword(!showNewPassword)}
              />
            }
            style={styles.input}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            mode="outlined"
            label="Mật lại khẩu mới"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
            right={
              <TextInput.Icon
                icon={() => (showConfirmPassword ? 
                  <EyeOff size={24} color="#666" /> : 
                  <Eye size={24} color="#666" />
                )}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            }
            style={styles.input}
          />
        </View>

        <TouchableOpacity 
          style={styles.submitButton}
          onPress={handleChangePassword}
        >
          <Text style={styles.submitButtonText}>Đổi mật khẩu</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
    lineHeight: 20,
  },
  form: {
    gap: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#fff',
  },
  errorText: {
    color: '#FF0000',
    fontSize: 12,
    marginTop: 4,
  },
  submitButton: {
    backgroundColor: '#00BCD4',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});