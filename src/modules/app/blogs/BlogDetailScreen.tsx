import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Title, Paragraph, useTheme } from "react-native-paper";
import RenderHtml from "react-native-render-html";
import { MaterialIcons } from "@expo/vector-icons";
import { RouteProp, useRoute } from "@react-navigation/native";
import Routes, { BlogStackParams } from "@utils/Routes";
import { colors } from "@styles/theme";

const blog = {
  id: "1",
  title: "Hướng dẫn React Native cơ bản",
  excerpt: "Bài viết hướng dẫn những kiến thức cơ bản về React Native...",
  createdAt: "2023-08-01",
  author: "Admin",
  content: `
    <p>React Native là một framework JavaScript phổ biến cho ứng dụng mobile. Đây là bài viết hướng dẫn những kiến thức cơ bản về React Native.</p>
    <p>Trước tiên, bạn cần cài đặt Node.js và npm (Node Package Manager) trên máy tính của bạn. N </p> `,
};

const BlogDetailScreen = () => {
  const route = useRoute<RouteProp<BlogStackParams, Routes.BlogDetail>>();
  const { blogId } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Title style={styles.title}>{blog.title}</Title>

      <Paragraph style={styles.meta}>
        <MaterialIcons name="person" size={14} color={colors.primary} />
        {` ${blog.author}  `}
        <MaterialIcons name="date-range" size={14} color={colors.primary} />
        {` ${blog.createdAt}`}
      </Paragraph>

      <RenderHtml
        contentWidth={300}
        source={{ html: blog.content || "<p>Nội dung bài viết</p>" }}
        baseStyle={{ color: colors.black, fontSize: 16 }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  meta: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    color: "#666",
  },
});

export default BlogDetailScreen;
