import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
} from "react-native";
import TheLayout from "@components/layout/TheLayOut";
import TheBaseHeader from "@components/layout/TheBaseHeader";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "@styles/theme";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Routes, { CourseStackParams, RootStackParams } from "@utils/Routes";
import { spacing } from "@styles/spacing";
import typography from "@styles/typography";
import { formatDate } from "@utils/functions/date";
import { ICourse } from "@src/types/course.types";
import { courseService } from "@src/services";
import Toast from "react-native-toast-message";
import Visibility from "@components/base/visibility";
import LoadingScreen from "@components/base/LoadingScreen";

function CourseDetail() {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const route = useRoute<RouteProp<CourseStackParams, Routes.CourseDetail>>();
  const courseId = route?.params.courseId;
  const [courseDetail, setCourseDetail] = useState<ICourse>();
  const [loading, setLoading] = useState<boolean>(false);

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

  const renderExamItem = ({ item }: { item: any }) => (
    <View style={styles.examCard}>
      <View style={styles.examHeader}>
        <MaterialCommunityIcons
          name="clipboard-text"
          size={24}
          color={colors.primary}
        />
        <Text style={styles.examName}>{item.name}</Text>
      </View>

      <Text style={styles.examDescription} numberOfLines={2}>
        {item.description || "No description available"}
      </Text>

      <View style={styles.examMeta}>
        <View style={styles.metaItem}>
          <MaterialCommunityIcons
            name="clock-time-three"
            size={16}
            color={colors.gray500}
          />
          <Text style={styles.metaText}>{item.timeExam} mins</Text>
        </View>

        <View
          style={[
            styles.metaItem,
            styles.levelBadge,
            {
              backgroundColor:
                item.level === "HARD"
                  ? colors.error
                  : item.level === "MEDIUM"
                  ? colors.warning
                  : colors.success,
            },
          ]}
        >
          {getLevelIcon(item.level)}
          <Text style={styles.levelText}>{item.level}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.startButton}
        onPress={() => navigation.navigate(Routes.Exam, { examId: item._id })}
      >
        <Text style={styles.startButtonText}>View Exam</Text>
        <MaterialCommunityIcons
          name="arrow-right"
          size={20}
          color={colors.white}
        />
      </TouchableOpacity>
    </View>
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
                name="calendar"
                size={16}
                color={colors.gray500}
              />
              <Text style={styles.metaText}>
                Created {formatDate(courseDetail?.createdAt ?? "")}
              </Text>
            </View>

            <View style={styles.metaItem}>
              <MaterialCommunityIcons
                name="clipboard-list"
                size={16}
                color={colors.gray500}
              />
              <Text style={styles.metaText}>
                {courseDetail?.exams.length} exams
              </Text>
            </View>
          </View>
        </View>

        <Visibility
          visibility={courseDetail}
          suspenseComponent={loading ? <LoadingScreen /> : null}
        >
          <FlatList
            data={courseDetail?.exams}
            keyExtractor={(item) => item._id}
            renderItem={renderExamItem}
            contentContainerStyle={styles.listContent}
            ListHeaderComponent={
              <Text style={styles.examsTitle}>Available Exams</Text>
            }
            showsVerticalScrollIndicator={false}
          />
        </Visibility>
      </View>
    </TheLayout>
  );
}

const getLevelIcon = (level: string) => {
  const iconProps = {
    size: 16,
    color: colors.white,
  };

  switch (level.toUpperCase()) {
    case "HARD":
      return <MaterialCommunityIcons name="alert" {...iconProps} />;
    case "MEDIUM":
      return <MaterialCommunityIcons name="alert-circle" {...iconProps} />;
    default:
      return <MaterialCommunityIcons name="flag" {...iconProps} />;
  }
};

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
  listContent: {
    paddingBottom: spacing[6],
  },
  examCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: spacing[4],
    marginBottom: spacing[3],
    shadowColor: colors.gray800,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  examHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2],
    marginBottom: spacing[2],
  },
  examName: {
    ...typography.subtitle2,
    color: colors.gray900,
    flex: 1,
  },
  examDescription: {
    ...typography.body2,
    color: colors.gray600,
    marginBottom: spacing[3],
  },
  examMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing[3],
  },
  levelBadge: {
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1],
    borderRadius: 20,
    gap: spacing[1],
  },
  levelText: {
    ...typography.caption,
    color: colors.white,
    textTransform: "capitalize",
  },
  startButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing[2],
    backgroundColor: colors.primary,
    paddingVertical: spacing[2],
    borderRadius: 12,
  },
  startButtonText: {
    ...typography.button,
    color: colors.white,
  },
});

export default CourseDetail;
