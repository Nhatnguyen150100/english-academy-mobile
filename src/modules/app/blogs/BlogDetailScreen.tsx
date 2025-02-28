import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Image,
  RefreshControl,
  View,
  Text,
} from "react-native";
import { Title, Chip } from "react-native-paper";
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
import { IBlogDetail, TStatusBlog } from "@styles/blogs";

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
  const route = useRoute<RouteProp<BlogStackParams, Routes.BlogDetail>>();
  const { blogId } = route.params;
  const [blog, setBlog] = useState<IBlogDetail>();
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

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

          <View style={styles.contentContainer}>
            <RenderHtml
              contentWidth={300}
              source={{ html: blog.content || "<p>No content available</p>" }}
              baseStyle={styles.htmlContent}
            />
          </View>
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
});

export default BlogDetailScreen;
