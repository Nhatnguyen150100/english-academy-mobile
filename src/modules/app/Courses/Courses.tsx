import React, { useState, useCallback } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import TheLayout from "@components/layout/TheLayOut";
import TheBaseHeader from "@components/layout/TheBaseHeader";
import { ActivityIndicator, FAB, Searchbar } from "react-native-paper";
import { ICourse } from "@src/types/course.types";
import { courseService } from "@src/services";
import Visibility from "@components/base/visibility";
import LoadingScreen from "@components/base/LoadingScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "@styles/theme";
import { formatDate } from "@src/utils/functions/date";
import { spacing } from "@styles/spacing";
import typography from "@styles/typography";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Routes, { CourseStackParams } from "@utils/Routes";
import { FlatList, RefreshControl } from "react-native-gesture-handler";
import EmptyComponent from "@components/base/EmptyComponent";
import useDebounce from "@hooks/useDebounce";

function Courses() {
  const navigation = useNavigation<StackNavigationProp<CourseStackParams>>();
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [listCourses, setListCourses] = useState<Array<ICourse>>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const debouncedSearchQuery = useDebounce(searchQuery);

  const handleGetListCourse = useCallback(
    async (isLoadMore = false) => {
      try {
        if (isLoadMore) {
          if (page >= totalPages) return;
          setIsLoadingMore(true);
        } else {
          setLoading(true);
        }

        const rs = await courseService.getAllCourse({
          page,
          name: debouncedSearchQuery,
        });

        setListCourses((prev) =>
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
      const rs = await courseService.getAllCourse({
        page: 1,
        name: debouncedSearchQuery,
      });
      setListCourses(rs.data.data);
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
      handleGetListCourse(true);
    }
  };

  React.useEffect(() => {
    handleGetListCourse();
  }, [debouncedSearchQuery, handleGetListCourse]);

  const renderFooter = () => {
    if (!isLoadingMore) return null;

    return (
      <View style={styles.loadingFooter}>
        <ActivityIndicator size="small" color={colors.primary} />
      </View>
    );
  };

  const renderItem = useCallback(({ item }: { item: ICourse }) => {
    const totalExams = item.chapters.reduce(
      (acc, chapter) => acc + chapter.exams.length,
      0
    );

    return (
      <CourseItem
        item={item}
        totalExams={totalExams}
        onPress={(item) => {
          navigation.navigate(Routes.CourseDetail, {
            courseId: item._id,
          });
        }}
      />
    );
  }, []);

  return (
    <TheLayout header={<TheBaseHeader title="Course" />}>
      <View style={styles.container}>
        <Searchbar
          placeholder="Search course..."
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
          visibility={listCourses}
          suspenseComponent={loading ? <LoadingScreen /> : null}
        >
          <FlatList
            data={listCourses}
            keyExtractor={(item) => item._id}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            initialNumToRender={10}
            maxToRenderPerBatch={5}
            windowSize={10}
            onEndReached={loadMoreCourses}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooter}
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
      </View>
      <FAB
        icon="book"
        color={colors.white}
        size="medium"
        style={{
          position: "absolute",
          right: 10,
          bottom: 20,
          backgroundColor: colors.primary,
          zIndex: 2,
        }}
        onPress={() => {
          navigation.navigate(Routes.Dictionary);
        }}
      />
    </TheLayout>
  );
}

const CourseItem = React.memo(
  ({
    item,
    totalExams,
    onPress,
  }: {
    item: ICourse;
    totalExams: number;
    onPress: (item: ICourse) => void;
  }) => (
    <TouchableOpacity activeOpacity={0.8} onPress={() => onPress(item)}>
      <View style={styles.courseContainer}>
        <View style={styles.iconContainer}>
          <Image
            source={require("@assets/images/course_icon.png")}
            style={styles.icon}
            resizeMode="cover"
          />
        </View>

        <View style={styles.courseInfo}>
          <Text style={styles.nameCourse} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.description} numberOfLines={2}>
            {item.description || "No description"}
          </Text>

          <View style={styles.metaContainer}>
            <View style={styles.metaItem}>
              <MaterialCommunityIcons
                name="book"
                size={14}
                color={colors.gray500}
              />
              <Text style={styles.metaText}>
                {item.chapters.length} chapters
              </Text>
            </View>

            <View style={styles.metaItem}>
              <MaterialCommunityIcons
                name="file-document"
                size={14}
                color={colors.gray500}
              />
              <Text style={styles.metaText}>{totalExams} exams</Text>
            </View>

            <View style={styles.metaItem}>
              <MaterialCommunityIcons
                name="calendar"
                size={14}
                color={colors.gray500}
              />
              <Text style={styles.metaText}>{formatDate(item.createdAt)}</Text>
            </View>
          </View>
        </View>

        <MaterialCommunityIcons
          name="chevron-right"
          size={24}
          color={colors.gray400}
        />
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
  },
  courseContainer: {
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
  iconContainer: {
    backgroundColor: colors.primaryLight,
    borderRadius: 12,
    padding: spacing[2],
    marginRight: spacing[3],
  },
  courseInfo: {
    flex: 1,
    marginRight: spacing[2],
  },
  icon: {
    width: 40,
    height: 40,
    resizeMode: "cover",
    borderRadius: 8,
  },
  nameCourse: {
    ...typography.subtitle1,
    color: colors.gray900,
    marginBottom: spacing[1],
  },
  description: {
    ...typography.body2,
    color: colors.gray600,
    marginBottom: spacing[2],
  },
  metaContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[3],
    flexWrap: "wrap",
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[1],
    marginRight: spacing[2],
  },
  metaText: {
    ...typography.caption,
    color: colors.gray500,
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

export default Courses;
