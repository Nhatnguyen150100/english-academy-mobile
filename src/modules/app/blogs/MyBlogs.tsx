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
import { FAB, Badge, ActivityIndicator, Searchbar } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "@styles/theme";
import { formatDate } from "@src/utils/functions/date";
import { spacing } from "@styles/spacing";
import typography from "@styles/typography";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Routes, { BlogStackParams } from "@utils/Routes";
import Visibility from "@components/base/visibility";
import LoadingScreen from "@components/base/LoadingScreen";
import EmptyComponent from "@components/base/EmptyComponent";
import { EStatusBlog } from "@src/constants/status";
import { blogService } from "@src/services";
import useDebounce from "@hooks/useDebounce";
import { IBlogInfo, TStatusBlog } from "@src/types/blogs.types";

const getStatusColor = (status: TStatusBlog) => {
  switch (status) {
    case EStatusBlog.APPROVED:
      return colors.success;
    case EStatusBlog.PENDING_APPROVED:
      return colors.warning;
    case EStatusBlog.REJECTED:
      return colors.error;
    default:
      return colors.gray500;
  }
};

const MyBlogs = () => {
  const navigation = useNavigation<StackNavigationProp<BlogStackParams>>();
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState<IBlogInfo[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const debouncedSearchQuery = useDebounce(searchQuery);

  const handleGetListBlog = useCallback(
    async (isLoadMore = false) => {
      try {
        if (isLoadMore) {
          if (page >= totalPages) return;
          setIsLoadingMore(true);
        } else {
          setLoading(true);
        }

        const rs = await blogService.getAllBlogByUser({
          page,
          search: debouncedSearchQuery,
        });

        setBlogs((prev) =>
          isLoadMore ? [...prev, ...rs.data.data] : rs.data.data
        );
        setTotalPages(rs.data.totalPages);

        if (!isLoadMore) setPage(1);
      } catch (error) {
        console.error(error);
      } finally {
        if (isLoadMore) {
          setIsLoadingMore(false);
        } else {
          setLoading(false);
        }
      }
    },
    [debouncedSearchQuery, page, totalPages]
  );

  const handleRefresh = useCallback(async () => {
    try {
      setRefreshing(true);
      setPage(1);
      const rs = await blogService.getAllBlogByUser({
        page: 1,
        name: debouncedSearchQuery,
      });
      setBlogs(rs.data.data);
      setTotalPages(rs.data.totalPages);
    } catch (error) {
      console.error(error);
    } finally {
      setRefreshing(false);
    }
  }, [debouncedSearchQuery]);

  const loadMoreCourses = () => {
    if (!isLoadingMore && page < totalPages) {
      setPage((prev) => prev + 1);
      handleGetListBlog(true);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      handleGetListBlog();
    }, [debouncedSearchQuery, handleGetListBlog])
  );

  React.useEffect(() => {
    navigation.setOptions({
      gestureEnabled: false,
    });
  }, [navigation]);

  const renderFooter = () => {
    if (!isLoadingMore) return null;

    return (
      <View style={styles.loadingFooter}>
        <ActivityIndicator size="small" color={colors.primary} />
      </View>
    );
  };

  const renderItem = useCallback(
    ({ item }: { item: IBlogInfo }) => (
      <BlogItem
        item={item}
        onPress={() =>
          navigation.navigate(Routes.EditBlog, { blogId: item._id })
        }
      />
    ),
    []
  );

  return (
    <TheLayout header={<TheBaseHeader title="My Blogs" isShowBackBtn />}>
      <View style={styles.container}>
        <Searchbar
          placeholder="Search blog..."
          placeholderTextColor={colors.gray500}
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
          inputStyle={styles.searchInput}
          icon={() => (
            <MaterialCommunityIcons
              name="magnify"
              size={24}
              color={colors.primary}
            />
          )}
        />
        <Visibility
          visibility={blogs}
          suspenseComponent={loading ? <LoadingScreen /> : null}
        >
          <FlatList
            removeClippedSubviews={false}
            keyboardShouldPersistTaps="handled"
            updateCellsBatchingPeriod={100}
            data={blogs}
            keyExtractor={(item) => item._id}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
            style={styles.list}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={EmptyComponent}
            initialNumToRender={10}
            maxToRenderPerBatch={5}
            windowSize={10}
            onEndReached={loadMoreCourses}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooter}
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
  ({ item, onPress }: { item: IBlogInfo; onPress: () => void }) => (
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
            <Badge
              style={[
                styles.statusBadge,
                { backgroundColor: getStatusColor(item.statusBlog) },
              ]}
            >
              {item.statusBlog}
            </Badge>
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
              <Text style={styles.metaText}>{item.userId.slice(-6)}</Text>
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
  list: {
    flex: 1,
    width: "100%",
  },
  searchBar: {
    borderRadius: 12,
    backgroundColor: colors.white,
    marginVertical: spacing[3],
    shadowColor: colors.gray800,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  searchInput: {
    ...typography.body2,
    color: colors.gray800,
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
    right: -spacing[3],
    bottom: -spacing[3],
    borderRadius: 50,
    color: colors.primary,
  },
  loadingFooter: {
    paddingVertical: spacing[4],
    alignItems: "center",
    justifyContent: "center",
  },
  refreshControl: {
    backgroundColor: colors.white,
  },
});

export default MyBlogs;
