import React, { useState, useCallback } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import Toast from "react-native-toast-message";
import TheLayout from "@components/layout/TheLayOut";
import TheBaseHeader from "@components/layout/TheBaseHeader";
import { FlatList, RefreshControl } from "react-native-gesture-handler";
import { ActivityIndicator } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "@styles/theme";
import { spacing } from "@styles/spacing";
import typography from "@styles/typography";
import { IHistory } from "@src/types/exam.types";
import { examService } from "@src/services";
import EmptyComponent from "@components/base/EmptyComponent";

const HistoryExam = () => {
  const [listHistories, setListHistories] = useState<IHistory[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGetListHistory = useCallback(async () => {
    try {
      setLoading(true);
      const response = await examService.getHistory({
        page,
        limit: 10,
      });

      setListHistories((prev) =>
        page !== 1 ? [...prev, ...response.data.data] : response.data.data
      );
      setTotalPages(response.data.totalPages);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Load history failed",
        text2: "Please try again later",
      });
    } finally {
      setIsLoadingMore(false);
      setLoading(false);
    }
  }, [page, totalPages]);

  const loadMore = () => {
    if (!isLoadingMore && page < totalPages) {
      setIsLoadingMore(true);
      setPage(page + 1);
    }
  };

  const handleRefresh = () => {
    setPage(1);
    handleGetListHistory();
  };

  React.useEffect(() => {
    handleGetListHistory();
  }, [handleGetListHistory]);

  const renderFooter = () => {
    if (!isLoadingMore) return null;
    return (
      <View style={styles.loadingFooter}>
        <ActivityIndicator size="small" color={colors.primary} />
      </View>
    );
  };

  const renderItem = useCallback(
    ({ item }: { item: IHistory }) => <HistoryItem item={item} key={item._id}/>,
    []
  );

  return (
    <TheLayout header={<TheBaseHeader title="Exam History" isShowBackBtn/>}>
      <View style={styles.container}>
        <FlatList
          data={listHistories}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          initialNumToRender={10}
          maxToRenderPerBatch={5}
          windowSize={10}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={handleRefresh}
              colors={[colors.primary]}
              progressBackgroundColor={colors.white}
            />
          }
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={EmptyComponent}
        />
      </View>
    </TheLayout>
  );
};

const HistoryItem = React.memo(({ item }: { item: IHistory }) => {
  const getLevelIcon = (level: string) => {
    switch (level.toLowerCase()) {
      case "advanced":
        return "rocket-launch";
      case "intermediate":
        return "school";
      default:
        return "book-open";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <LinearGradient
      colors={["#f8f9ff", "#eef2ff"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.historyContainer}
    >
      <View style={styles.historyInfo}>
        <MaterialCommunityIcons
          name={getLevelIcon(item.examId.level)}
          size={32}
          color={colors.primary}
          style={styles.levelIcon}
        />
        <View style={styles.examDetails}>
          <Text style={styles.examName} numberOfLines={1}>
            {item.examId.name}
          </Text>
          <Text style={styles.examLevel}>{item.examId.level}</Text>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.scoreContainer}>
          <MaterialCommunityIcons
            name="trophy"
            size={20}
            color={colors.primary}
          />
          <Text style={styles.scoreText}>{item.score} points</Text>
        </View>
        <Text style={styles.dateText}>{formatDate(item.completedDate)}</Text>
      </View>
    </LinearGradient>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing[0],
    width: "100%"
  },
  listContent: {
    paddingBottom: spacing[6],
  },
  historyContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 16,
    marginBottom: spacing[3],
    padding: spacing[4],
    shadowColor: colors.gray800,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  historyInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  levelIcon: {
    marginRight: spacing[3],
  },
  examDetails: {
    flex: 1,
  },
  examName: {
    ...typography.subtitle2,
    color: colors.gray900,
    marginBottom: spacing[1],
  },
  examLevel: {
    ...typography.caption,
    color: colors.primary,
    textTransform: "capitalize",
  },
  statsContainer: {
    alignItems: "flex-end",
  },
  scoreContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing[2],
  },
  scoreText: {
    ...typography.subtitle1,
    color: colors.primary,
    marginLeft: spacing[2],
  },
  dateText: {
    ...typography.caption,
    color: colors.gray600,
  },
  loadingFooter: {
    paddingVertical: spacing[4],
    alignItems: "center",
    justifyContent: "center",
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing[10],
  },
  emptyText: {
    ...typography.body1,
    color: colors.gray500,
    marginTop: spacing[2],
  },
});

export default HistoryExam;