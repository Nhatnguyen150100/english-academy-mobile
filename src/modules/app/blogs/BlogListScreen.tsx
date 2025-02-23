import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { Card, Title, useTheme, FAB } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Routes, { BlogStackParams } from "@utils/Routes";

// Mock data
const mockBlogs = [
  {
    id: "1",
    title: "Hướng dẫn React Native cơ bản",
    excerpt: "Bài viết hướng dẫn những kiến thức cơ bản về React Native...",
    createdAt: "2023-08-01",
    author: "Admin",
  },
];

const BlogListScreen = () => {
  const navigation = useNavigation<StackNavigationProp<BlogStackParams>>();
  const { colors } = useTheme();
  const [blogs, setBlogs] = useState(mockBlogs);

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(Routes.BlogDetail, { blogId: item.id })
      }
    >
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>{item.title}</Title>
          <Card style={styles.metaContainer}>
            <MaterialIcons name="person" size={14} color={colors.primary} />
            <Title style={styles.metaText}>{item.author}</Title>
            <MaterialIcons name="date-range" size={14} color={colors.primary} />
            <Title style={styles.metaText}>{item.createdAt}</Title>
          </Card>
          <Title style={styles.excerpt}>{item.excerpt}</Title>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  return (
    <>
      <FlatList
        data={blogs}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />

      <FAB
        style={[styles.fab, { backgroundColor: colors.primary }]}
        icon="plus"
        color="white"
        onPress={() => navigation.navigate(Routes.CreateBlog)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
    elevation: 4,
  },
  title: {
    fontSize: 18,
    marginBottom: 8,
  },
  excerpt: {
    fontSize: 14,
    color: "#666",
    marginTop: 8,
  },
  metaContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    padding: 8,
  },
  metaText: {
    fontSize: 12,
    marginLeft: 4,
    marginRight: 16,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default BlogListScreen;
