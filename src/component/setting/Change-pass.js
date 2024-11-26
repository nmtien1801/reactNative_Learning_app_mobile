import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import { X, Eye, EyeOff } from "lucide-react-native";
import { handleChangePassword } from "../../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "../../component/customToast";

export default function ChangePassword({ navigation, route }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const email = useSelector((state) => state.auth.user.email); // lấy email của user login

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState(false);
  const [error2, setError2] = useState(false);
  const [error3, setError3] = useState(false);
  const dispatch = useDispatch();
  const toast = useToast();

  const ChangePassword = async () => {
    setError(false); // Reset lỗi trước
    setError2(false);
    if (currentPassword === "") {
      setError(true);
      return; // Ngừng thực hiện nếu lỗi
    }
    if (newPassword.length < 4) {
      setError2(true);
      return; // Ngừng thực hiện nếu lỗi
    }
    if (confirmPassword !== newPassword) {
      setError3(true);
      return; // Ngừng thực hiện nếu lỗi
    }

    try {
      let res = await dispatch(
        handleChangePassword({ currentPassword, newPassword, email })
      );
      
      if (res && +res.payload.EC === 0) {
        toast(res.payload.EM);
        navigation.goBack();
      } else {
        toast(res.payload.EM, "error");
      }
    } catch (err) {
      console.error("Lỗi khi đổi mật khẩu: ", err);
      toast("Đã xảy ra lỗi, vui lòng thử lại sau.", "error");
    }
    
  };

  const handleClose = () => {
    navigation.goBack();
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
        Mật khẩu của bạn phải gồm 8 kí tự, bao gồm cả chữ số, chữ cái và kí tự
        đặc biệt
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
                icon={() =>
                  showCurrentPassword ? (
                    <EyeOff size={24} color="#666" />
                  ) : (
                    <Eye size={24} color="#666" />
                  )
                }
                onPress={() => setShowCurrentPassword(!showCurrentPassword)}
              />
            }
            style={styles.input}
          />
          {error && (
            <Text style={styles.errorText}>
              Vui lòng nhập mật khẩu hiện tại
            </Text>
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
                icon={() =>
                  showNewPassword ? (
                    <EyeOff size={24} color="#666" />
                  ) : (
                    <Eye size={24} color="#666" />
                  )
                }
                onPress={() => setShowNewPassword(!showNewPassword)}
              />
            }
            style={styles.input}
          />
           {error2 && <Text style={styles.errorText}>mật khẩu phải từ 4 kí tự</Text>}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            mode="outlined"
            label="Nhập lại khẩu mới"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
            error={error2}
            right={
              <TextInput.Icon
                icon={() =>
                  showConfirmPassword ? (
                    <EyeOff size={24} color="#666" />
                  ) : (
                    <Eye size={24} color="#666" />
                  )
                }
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            }
            style={styles.input}
          />
          {error3 && <Text style={styles.errorText}>Mật khẩu không khớp</Text>}
        </View>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => ChangePassword()}
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
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  closeButton: {
    padding: 4,
  },
  description: {
    fontSize: 14,
    color: "#666",
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
    backgroundColor: "#fff",
  },
  errorText: {
    color: "#FF0000",
    fontSize: 12,
    marginTop: 4,
  },
  submitButton: {
    backgroundColor: "#00BCD4",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
