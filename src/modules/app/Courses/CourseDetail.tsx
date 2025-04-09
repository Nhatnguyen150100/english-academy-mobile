import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import TheLayout from "@components/layout/TheLayOut";
import TheBaseHeader from "@components/layout/TheBaseHeader";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "@styles/theme";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Routes, { CourseStackParams } from "@utils/Routes";
import { spacing } from "@styles/spacing";
import typography from "@styles/typography";
import { formatDate } from "@utils/functions/date";
import { ICourse } from "@src/types/course.types";
import { courseService } from "@src/services";
import Toast from "react-native-toast-message";
import Visibility from "@components/base/visibility";
import LoadingScreen from "@components/base/LoadingScreen";
import { IChapterInfo } from "@src/types/chapter.types";
import EmptyComponent from "@components/base/EmptyComponent";
import { FlatList } from "react-native-gesture-handler";

function CourseDetail() {
  const navigation = useNavigation<StackNavigationProp<CourseStackParams>>();
  const route = useRoute<RouteProp<CourseStackParams, Routes.CourseDetail>>();
  const courseId = route?.params.courseId;
  const [courseDetail, setCourseDetail] = useState<ICourse>();
  const [loading, setLoading] = useState<boolean>(false);

  const totalExams =
    courseDetail?.chapters?.reduce(
      (acc, chapter) => acc + chapter.exams.length,
      0
    ) || 0;

  const handleGetCourseDetail = async () => {
    if (!courseId) {
      Toast.show({
        text1: "Course ID is required",
        type: "error",
      });
      return;
    }
    try {
      setLoading(true);
      const rs = await courseService.getCourseDetail(courseId);
      setCourseDetail(rs.data);
    } catch (error) {
      Toast.show({
        text1: error.message,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (courseId) handleGetCourseDetail();
  }, [courseId]);

  const renderChapterItem = ({ item }: { item: IChapterInfo }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(Routes.ChapterDetail, { chapterId: item._id })
      }
    >
      <View style={styles.chapterContainer}>
        <View style={styles.chapterHeader}>
          <MaterialCommunityIcons
            name="bookmark-outline"
            size={24}
            color={colors.primary}
          />
          <View style={styles.chapterInfo}>
            <Text style={styles.chapterTitle}>{item.title}</Text>
            <Text style={styles.chapterDescription} numberOfLines={2}>
              {item.description || "No description available"}
            </Text>
            <View style={{ ...styles.metaItem, marginTop: 10 }}>
              <MaterialCommunityIcons
                name="file-document"
                size={16}
                color={colors.gray500}
              />
              <Text style={styles.metaText}>{item.exams.length} exams</Text>
            </View>
          </View>
          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color={colors.gray400}
          />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <TheLayout header={<TheBaseHeader title="Course Detail" isShowBackBtn />}>
      <View style={styles.container}>
        <View style={styles.courseHeader}>
          <MaterialCommunityIcons
            name="book-open-page-variant"
            size={48}
            color={colors.primary}
          />
          <Text style={styles.courseTitle}>{courseDetail?.name}</Text>
          <Text style={styles.courseDescription}>
            {courseDetail?.description}
          </Text>

          <View style={styles.courseMeta}>
            <View style={styles.metaItem}>
              <MaterialCommunityIcons
                name="book"
                size={16}
                color={colors.gray500}
              />
              <Text style={styles.metaText}>
                {courseDetail?.chapters?.length} chapters
              </Text>
            </View>

            <View style={styles.metaItem}>
              <MaterialCommunityIcons
                name="file-document"
                size={16}
                color={colors.gray500}
              />
              <Text style={styles.metaText}>{totalExams} exams</Text>
            </View>

            <View style={styles.metaItem}>
              <MaterialCommunityIcons
                name="calendar"
                size={16}
                color={colors.gray500}
              />
              <Text style={styles.metaText}>
                {formatDate(courseDetail?.createdAt ?? "")}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.listWrapper}>
          <Visibility
            visibility={courseDetail}
            suspenseComponent={loading ? <LoadingScreen /> : null}
          >
            <FlatList
              data={courseDetail?.chapters}
              keyExtractor={(item) => item._id}
              renderItem={renderChapterItem}
              contentContainerStyle={styles.listContent}
              ListEmptyComponent={EmptyComponent}
              ListHeaderComponent={
                <Text style={styles.examsTitle}>Course Chapters</Text>
              }
              showsVerticalScrollIndicator={false}
            />
          </Visibility>
        </View>
      </View>
    </TheLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing[0],
    width: "100%",
  },
  courseHeader: {
    alignItems: "center",
    paddingVertical: spacing[4],
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
    marginBottom: spacing[3],
  },
  listWrapper: {
    flex: 1,
    paddingHorizontal: spacing[0],
  },
  listContent: {
    flexGrow: 1,
    padding: spacing[0],
    paddingBottom: spacing[6],
  },
  courseTitle: {
    ...typography.subtitle2,
    color: colors.gray900,
    marginVertical: spacing[3],
    textAlign: "center",
  },
  courseDescription: {
    ...typography.body1,
    color: colors.gray600,
    textAlign: "center",
    marginBottom: spacing[4],
  },
  courseMeta: {
    flexDirection: "row",
    gap: spacing[4],
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
  examsTitle: {
    ...typography.subtitle1,
    color: colors.gray900,
    marginBottom: spacing[3],
  },
  chapterContainer: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: spacing[3],
    marginBottom: spacing[3],
    shadowColor: colors.gray800,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  chapterHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing[2],
  },
  chapterInfo: {
    flex: 1,
    marginLeft: spacing[2],
  },
  chapterTitle: {
    ...typography.subtitle2,
    color: colors.gray900,
  },
  chapterDescription: {
    ...typography.body2,
    color: colors.gray600,
  },
  examCard: {
    backgroundColor: colors.gray50,
    borderRadius: 12,
    padding: spacing[3],
    marginTop: spacing[2],
  },
});

export default CourseDetail;
