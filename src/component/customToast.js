import React, { useState, useEffect, createContext, useContext } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';

// Tạo Context
const ToastContext = createContext();

export const CustomToast = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [
      ...prev,
      {
        id,
        message,
        type,
      },
    ]);
  };

  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(() => {
        setToasts((prev) => prev.slice(1));
      }, 3000); // Mặc định autoClose 3 giây

      return () => clearTimeout(timer);
    }
  }, [toasts]);

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <View style={styles.toastContainer}>
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} />
        ))}
      </View>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);

const Toast = ({ toast }) => {
  const { message, type } = toast;
  const bounceAnim = new Animated.Value(-100);

  useEffect(() => {
    Animated.spring(bounceAnim, {
      toValue: 0,
      friction: 6,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.toast,
        type === 'success' ? styles.success : styles.error,
        { transform: [{ translateY: bounceAnim }] },
      ]}
    >
      <Text style={styles.toastText}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    top: 20,
    right: 10,
    zIndex: 1000,
  },
  toast: {
    margin: 10,
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  success: {
    backgroundColor: '#4CAF50',
  },
  error: {
    backgroundColor: '#F44336',
  },
  toastText: {
    color: '#fff',
    fontSize: 16,
  },
});
