import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import io from "socket.io-client";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // Kết nối tới socket.io server
  const socket = io("http://localhost:8080"); // Thay đổi URL nếu cần

  useEffect(() => {
    // Nhận tin nhắn từ server
    socket.on("receive_message", (message) => {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, {
          _id: Math.random().toString(),
          text: message.text,
          createdAt: new Date(),
          user: { _id: 2, name: "Server" },
        })
      );
    });

    return () => {
      socket.off("receive_message");
    };
  }, [socket]);

  const handleSend = (newMessages = []) => {
    const message = newMessages[0];
    socket.emit("send_message", { text: message.text });
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
  };

  return (
    <View style={styles.container}>
      {/* ChatBox Header */}
      <TouchableOpacity
        style={styles.header}
        onPress={() => setIsOpen(!isOpen)}
      >
        <Text style={styles.headerText}>{isOpen ? "Close Chat" : "Open Chat"}</Text>
      </TouchableOpacity>

      {/* ChatBox Body */}
      {isOpen && (
        <View style={styles.chatContainer}>
          <GiftedChat
            messages={messages}
            onSend={(messages) => handleSend(messages)}
            user={{ _id: 1, name: "User" }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 20,
    right: 10,
    width: "80%",
    maxWidth: 300,
  },
  header: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  headerText: {
    color: "#fff",
    fontSize: 16,
  },
  chatContainer: {
    height: 400,
    backgroundColor: "#f8f9fa",
    borderRadius: 5,
    marginTop: 10,
  },
});

export default ChatBox;
