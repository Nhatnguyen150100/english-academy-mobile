import React, { useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
  RefreshControl,
  Image,
} from "react-native";
import TheLayout from "@components/layout/TheLayOut";
import TheBaseHeader from "@components/layout/TheBaseHeader";
import { FAB, Badge } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "@styles/theme";
import { formatDate } from "@src/utils/functions/date";
import { spacing } from "@styles/spacing";
import typography from "@styles/typography";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Routes, { BlogStackParams } from "@utils/Routes";
import Visibility from "@components/base/visibility";
import LoadingScreen from "@components/base/LoadingScreen";
import EmptyComponent from "@components/base/EmptyComponent";

type Blog = {
  _id: string;
  __v: number;
  userId: string;
  title: string;
  thumbnail?: string;
  description: string;
  statusBlog: "APPROVED" | "PENDING_APPROVED";
  createdAt: string;
  updatedAt: string;
};

const mockBlogs: Blog[] = [
  {
    _id: "67bdee1b13ee2eef1d5798d2",
    userId: "67bdee1b13ee2eef1d579861",
    title: "Hướng dẫn học ReactJS từ cơ bản",
    thumbnail: "https://picsum.photos/200/300",
    description: "Nhập môn ReactJS cho người mới bắt đầu",
    statusBlog: "APPROVED",
    __v: 0,
    createdAt: "2025-02-25T16:21:47.819Z",
    updatedAt: "2025-02-25T16:21:47.819Z",
  },
  {
    _id: "67bdee1b13ee2eef1d5798d3",
    userId: "67bdee1b13ee2eef1d579861",
    title: "Toàn tập về Node.js",
    thumbnail: "https://picsum.photos/200/300",
    description: "Xây dựng ứng dụng web với Node.js",
    statusBlog: "PENDING_APPROVED",
    __v: 0,
    createdAt: "2025-02-25T16:21:47.819Z",
    updatedAt: "2025-02-25T16:21:47.819Z",
  },
  {
    _id: "67bdee1b13ee2eef1d5798d4",
    userId: "67bdee1b13ee2eef1d579861",
    title: "Hướng dẫn đến với Web Development",
    thumbnail: "https://picsum.photos/200/300",
    description: "Bài viết tổng quan về con đường trở thành Web Developer",
    statusBlog: "APPROVED",
    __v: 0,
    createdAt: "2025-02-25T16:21:47.819Z",
    updatedAt: "2025-02-25T16:21:47.819Z",
  },
  {
    _id: "67bdee1b13ee2eefcxvv1d5798d5",
    userId: "67bdee1b13ee2eef1d579861",
    title: "Machine Learning cơ bản",
    thumbnail: "https://picsum.photos/200/300",
    description: "Giới thiệu các khái niệm cơ bản trong Machine Learning",
    statusBlog: "PENDING_APPROVED",
    __v: 0,
    createdAt: "2025-02-25T16:21:47.819Z",
    updatedAt: "2025-02-25T16:21:47.819Z",
  },
  {
    _id: "67bdee1b13ee2edsfsdef1d5798d5",
    userId: "67bdee1b13ee2eef1d579861",
    title: "Machine Learning cơ bản",
    thumbnail: "https://picsum.photos/200/300",
    description: "Giới thiệu các khái niệm cơ bản trong Machine Learning",
    statusBlog: "PENDING_APPROVED",
    __v: 0,
    createdAt: "2025-02-25T16:21:47.819Z",
    updatedAt: "2025-02-25T16:21:47.819Z",
  },
  {
    _id: "67bdee1b13ee2eef1d5vxcv798d5",
    userId: "67bdee1b13ee2eef1d579861",
    title: "Machine Learning cơ bản",
    thumbnail: "https://picsum.photos/200/300",
    description: "Giới thiệu các khái niệm cơ bản trong Machine Learning",
    statusBlog: "PENDING_APPROVED",
    __v: 0,
    createdAt: "2025-02-25T16:21:47.819Z",
    updatedAt: "2025-02-25T16:21:47.819Z",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "APPROVED":
      return colors.success;
    case "PENDING_APPROVED":
      return colors.warning;
    case "REJECTED":
      return colors.error;
    default:
      return colors.gray500;
  }
};

const BlogListScreen = () => {
  const navigation = useNavigation<StackNavigationProp<BlogStackParams>>();
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState<Blog[]>(mockBlogs);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    try {
      setRefreshing(true);
      // Add actual refresh logic here
    } catch (error) {
      console.error(error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: Blog }) => (
      <BlogItem
        item={item}
        onPress={() =>
          navigation.navigate(Routes.BlogDetail, { blogId: item._id })
        }
      />
    ),
    []
  );

  return (
    <TheLayout header={<TheBaseHeader title="Blogs" />}>
      <View style={styles.container}>
        <Visibility
          visibility={blogs}
          suspenseComponent={loading ? <LoadingScreen /> : null}
        >
          <FlatList
            data={blogs}
            keyExtractor={(item) => item._id}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={EmptyComponent}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                colors={[colors.primary]}
                progressBackgroundColor={colors.white}
              />
            }
          />
        </Visibility>

        <FAB
          style={[styles.fab, { backgroundColor: colors.primary }]}
          icon="plus"
          color="white"
          onPress={() => navigation.navigate(Routes.CreateBlog)}
        />
      </View>
    </TheLayout>
  );
};

const BlogItem = React.memo(
  ({ item, onPress }: { item: Blog; onPress: () => void }) => (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View style={styles.blogContainer}>
        <Image
          source={{ uri: item.thumbnail || "https://picsum.photos/200/300" }}
          style={styles.thumbnail}
          resizeMode="cover"
        />

        <View style={styles.blogInfo}>
          <View style={styles.headerRow}>
            <Text style={styles.title} numberOfLines={2}>
              {item.title}
            </Text>
            {/* <Badge
              style={[
                styles.statusBadge,
                { backgroundColor: getStatusColor(item.statusBlog) },
              ]}
            >
              {item.statusBlog}
            </Badge> */}
          </View>

          <Text style={styles.description} numberOfLines={3}>
            {item.description || "No description"}
          </Text>

          <View style={styles.metaContainer}>
            <View style={styles.metaItem}>
              <MaterialCommunityIcons
                name="calendar-month-outline"
                size={14}
                color={colors.gray500}
              />
              <Text style={styles.metaText}>{formatDate(item.createdAt)}</Text>
            </View>

            <View style={styles.metaItem}>
              <MaterialCommunityIcons
                name="account-outline"
                size={14}
                color={colors.gray500}
              />
              <Text style={styles.metaText}>
                {item.userId.slice(-6)} {/* Hiển thị 6 ký tự cuối của userId */}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing[0],
    width: "100%",
  },
  listContent: {
    paddingBottom: spacing[6],
    paddingHorizontal: spacing[3],
  },
  blogContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 16,
    marginBottom: spacing[5],
    padding: spacing[3],
    shadowColor: colors.gray800,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: spacing[3],
  },
  blogInfo: {
    flex: 1,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: spacing[2],
  },
  title: {
    ...typography.subtitle1,
    color: colors.gray900,
    flex: 1,
    marginRight: spacing[2],
  },
  statusBadge: {
    alignSelf: "flex-start",
    backgroundColor: colors.gray500,
  },
  description: {
    ...typography.body2,
    color: colors.gray600,
    marginBottom: spacing[2],
  },
  metaContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[4],
    marginTop: spacing[1],
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[1],
  },
  metaText: {
    ...typography.caption,
    color: colors.gray500,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: spacing[3],
    bottom: spacing[3],
    borderRadius: 50,
  },
});

export default BlogListScreen;
