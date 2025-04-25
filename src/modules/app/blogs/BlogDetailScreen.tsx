import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Image,
  RefreshControl,
  View,
  Text,
  Animated,
  TouchableOpacity,
} from "react-native";
import { Title, TextInput, Button } from "react-native-paper";
import RenderHtml from "react-native-render-html";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RouteProp, useRoute } from "@react-navigation/native";
import TheLayout from "@components/layout/TheLayOut";
import TheBaseHeader from "@components/layout/TheBaseHeader";
import Routes, { BlogStackParams } from "@utils/Routes";
import { colors } from "@styles/theme";
import { formatDate } from "@src/utils/functions/date";
import { spacing } from "@styles/spacing";
import typography from "@styles/typography";
import { blogService } from "@src/services";
import LoadingScreen from "@components/base/LoadingScreen";
import EmptyComponent from "@components/base/EmptyComponent";
import { IBlogDetail } from "@src/types/blogs.types";
import Toast from "react-native-toast-message";
import { ScrollView } from "react-native-gesture-handler";
import { IRootState } from "@store/index";
import { useSelector } from "react-redux";

// const getStatusColor = (status: TStatusBlog) => {
//   switch (status) {
//     case "APPROVED":
//       return colors.success;
//     case "PENDING_APPROVED":
//       return colors.warning;
//     case "REJECTED":
//       return colors.error;
//     default:
//       return colors.gray500;
//   }
// };

const BlogDetailScreen = () => {
  const user = useSelector((state: IRootState) => state.AppReducer.user);
  const route = useRoute<RouteProp<BlogStackParams, Routes.BlogDetail>>();
  const { blogId } = route.params;
  const [blog, setBlog] = useState<IBlogDetail>();
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [newComment, setNewComment] = useState("");
  const scaleAnim = useState(new Animated.Value(1))[0];

  const handleLike = async () => {
    if (!blogId) {
      Toast.show({
        text1: "BlogId not found",
        type: "error",
      });
      return;
    }
    try {
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();

      await blogService.likeBlog(blogId);
      await fetchBlogDetail();
    } catch (error) {
      console.error("Error liking blog:", error);
    }
  };

  const handleCommentSubmit = async () => {
    if (!blogId) {
      Toast.show({
        text1: "BlogId not found",
        type: "error",
      });
      return;
    }
    if (!newComment.trim()) return;
    try {
      await blogService.commentBlog(blogId, newComment.trim());
      setNewComment("");
      await fetchBlogDetail();
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  const fetchBlogDetail = async () => {
    if (!blogId) return;
    setLoading(true);
    try {
      const response = await blogService.getBlogDetail(blogId);
      setBlog(response.data);
    } catch (error) {
      console.error("Error fetching blog detail:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchBlogDetail();
    setRefreshing(false);
  };

  useEffect(() => {
    if (blogId) fetchBlogDetail();
  }, [blogId]);

  const renderComments = () => (
    <View style={styles.commentsContainer}>
      <Text style={styles.sectionTitle}>
        Comments ({blog?.comments?.length})
      </Text>
      {blog?.comments?.map((comment, index) => (
        <View key={index} style={styles.commentItem}>
          <MaterialCommunityIcons
            name="account-circle"
            size={24}
            color={colors.gray500}
          />
          <View style={styles.commentContent}>
            <Text style={styles.commentAuthor}>
              {comment.userId?.name || "Anonymous"}
            </Text>
            <Text style={styles.commentText}>{comment.commentText}</Text>
            <Text style={styles.commentDate}>
              {formatDate(comment.createdAt)}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );

  const renderCommentInput = () => (
    <View style={styles.commentInputContainer}>
      <TextInput
        mode="outlined"
        label="Enter your comment"
        value={newComment}
        onChangeText={setNewComment}
        style={styles.commentInput}
        outlineColor={colors.gray300}
        activeOutlineColor={colors.primary}
        multiline
      />
      <Button
        mode="contained"
        onPress={handleCommentSubmit}
        style={styles.commentButton}
        labelStyle={{ color: colors.white }}
        disabled={!newComment.trim()}
      >
        Post
      </Button>
    </View>
  );

  return (
    <TheLayout header={<TheBaseHeader title="Blog Detail" isShowBackBtn />}>
      {blog ? (
        <ScrollView
          style={{
            width: "100%",
          }}
          contentContainerStyle={styles.container}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={[colors.primary]}
              progressBackgroundColor={colors.white}
            />
          }
        >
          <Image
            source={{ uri: blog.thumbnail || "https://picsum.photos/200/300" }}
            style={styles.thumbnail}
            resizeMode="cover"
          />

          <Title style={styles.title}>{blog.title}</Title>

          <View style={styles.metaContainer}>
            <View style={styles.metaGroup}>
              <MaterialCommunityIcons
                name="calendar-month-outline"
                size={14}
                color={colors.gray500}
              />
              <Text style={styles.metaText}>{formatDate(blog!.createdAt)}</Text>

              <MaterialCommunityIcons
                name="account-outline"
                size={14}
                color={colors.gray500}
                style={styles.metaIcon}
              />
              <Text style={styles.metaText}>
                {blog!.userId.name ?? blog!.userId.email}
              </Text>
            </View>

            {/* <Chip
              style={[
                styles.statusChip,
                { backgroundColor: getStatusColor(blog!.statusBlog) },
              ]}
              textStyle={styles.statusText}
            >
              <Text style={{ ...typography.caption }}>{blog!.statusBlog}</Text>
            </Chip> */}
          </View>
          <TouchableOpacity onPress={handleLike} style={styles.likeButton}>
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
              <MaterialCommunityIcons
                name={
                  blog.likes.includes(user!._id) ? "heart" : "heart-outline"
                }
                size={24}
                color={colors.error}
              />
            </Animated.View>
            <Text style={styles.likeCount}>{blog.likes?.length}</Text>
          </TouchableOpacity>

          <View style={styles.contentContainer}>
            <RenderHtml
              contentWidth={300}
              source={{ html: blog.content || "<p>No content available</p>" }}
              baseStyle={styles.htmlContent}
            />
          </View>

          {renderComments()}
          {renderCommentInput()}
        </ScrollView>
      ) : loading ? (
        <LoadingScreen />
      ) : (
        <EmptyComponent />
      )}
    </TheLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: spacing[0],
    paddingBottom: spacing[6],
    width: "100%",
  },
  thumbnail: {
    width: "100%",
    height: 230,
    borderRadius: 16,
    marginBottom: spacing[4],
  },
  title: {
    ...typography.subtitle2,
    color: colors.gray900,
    marginBottom: spacing[2],
  },
  meta: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing[4],
    color: colors.gray600,
  },
  metaText: {
    ...typography.body2,
    color: colors.gray600,
    marginRight: spacing[3],
  },
  metaIcon: {
    marginLeft: spacing[3],
  },
  contentContainer: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 8,
    shadowColor: colors.gray800,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 1,
  },
  htmlContent: {
    ...typography.body1,
    color: colors.gray800,
    lineHeight: 24,
  },
  metaContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing[4],
  },
  metaGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusChip: {
    borderRadius: 12,
  },
  statusText: {
    ...typography.caption,
    color: colors.white,
    lineHeight: 18,
  },

  likeButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    padding: 8,
  },
  likeCount: {
    ...typography.body2,
    color: colors.gray600,
  },
  commentsContainer: {
    marginTop: 16,
    paddingHorizontal: spacing[0],
  },
  sectionTitle: {
    ...typography.subtitle2,
    color: colors.gray900,
    marginBottom: 12,
  },
  commentItem: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
    backgroundColor: colors.gray100,
    borderRadius: 8,
    padding: 12,
  },
  commentContent: {
    flex: 1,
  },
  commentAuthor: {
    ...typography.body2,
    fontWeight: "bold",
    color: colors.gray900,
  },
  commentText: {
    ...typography.body1,
    color: colors.gray800,
    marginVertical: 4,
  },
  commentDate: {
    ...typography.caption,
    color: colors.gray500,
  },
  commentInputContainer: {
    marginTop: 16,
    gap: 12,
  },
  commentInput: {
    backgroundColor: colors.white,
  },
  commentButton: {
    borderRadius: 8,
    backgroundColor: colors.primary,
  },
});

export default BlogDetailScreen;
