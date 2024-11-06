import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Layout from "../../component/lesson/Layout_Lesson";

export default function CommentsComponent() {
  const comments = [
    {
      id: 1,
      user: "Huynh Dung",
      time: "a day ago",
      text: "Deserunt enim incididunt alrum nostrud ex voluptate excepteur excepteur minim ex est",
      likes: 23,
      comments: 3,
    },
    {
      id: 2,
      user: "Huynh Dung",
      time: "a day ago",
      text: "Deserunt enim incididunt alrum nostrud ex voluptate excepteur excepteur minim ex est",
      likes: 23,
      comments: 3,
    },
  ];

  return (
    <Layout>
      <View style={styles.comments}>
        {comments.map((comment) => (
          <View key={comment.id} style={styles.commentCard}>
            <View style={styles.commentHeader}>
              <Image
                source={{ uri: "/placeholder.svg?height=40&width=40" }}
                style={styles.avatar}
              />
              <View style={styles.commentMeta}>
                <Text style={styles.userName}>{comment.user}</Text>
                <Text style={styles.timeStamp}>{comment.time}</Text>
              </View>
            </View>
            <Text style={styles.commentText}>{comment.text}</Text>
            <View style={styles.commentActions}>
              <View style={styles.actionButton}>
                <Ionicons name="heart-outline" size={16} color="black" />
                <Text style={styles.actionText}>{comment.likes}</Text>
              </View>
              <View style={styles.actionButton}>
                <Ionicons name="chatbubble-outline" size={16} color="black" />
                <Text style={styles.actionText}>{comment.comments}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
      <View style={styles.bottomInput}>
        <Text style={styles.inputPlaceholder}>Write a Q&A...</Text>
        <Text style={styles.emoji}>✍️ ❤️ 😊 👍 🎉 💡</Text>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  comments: {
    padding: 16,
  },
  commentCard: {
    marginBottom: 16,
  },
  commentHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  commentMeta: {
    flex: 1,
  },
  userName: {
    fontWeight: "600",
    marginBottom: 2,
  },
  timeStamp: {
    fontSize: 12,
    color: "#666",
  },
  commentText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  commentActions: {
    flexDirection: "row",
    gap: 16,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  actionText: {
    fontSize: 12,
    color: "#666",
  },
  bottomInput: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  inputPlaceholder: {
    color: "#666",
    marginBottom: 8,
  },
  emoji: {
    fontSize: 16,
  },
});
