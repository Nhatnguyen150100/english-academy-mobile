import React, { useState, useCallback } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message";
import { IRank } from "@src/types/rank.types";
import { rankService } from "@src/services";
import TheLayout from "@components/layout/TheLayOut";
import TheBaseHeader from "@components/layout/TheBaseHeader";
import { FlatList, RefreshControl } from "react-native-gesture-handler";
import Visibility from "@components/base/visibility";
import { ActivityIndicator, Searchbar } from "react-native-paper";
import useDebounce from "@hooks/useDebounce";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Routes, { RootStackParams } from "@utils/Routes";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "@styles/theme";
import { spacing } from "@styles/spacing";
import typography from "@styles/typography";

const rankImages = [
  require("@assets/images/rank/rank_1.png"),
  require("@assets/images/rank/rank_2.png"),
  require("@assets/images/rank/rank_3.png"),
];

function Ranks() {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const [listRanks, setListRanks] = useState<IRank[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGetListRanks = useCallback(async () => {
    try {
      console.log(page);
      setLoading(true);
      const rs = await rankService.getAllRank({
        name: debouncedSearchQuery,
        page,
        limit: 10,
      });

      setListRanks((prev) =>
        page !== 1 ? [...prev, ...rs.data.data] : rs.data.data
      );
      setTotalPages(rs.data.totalPages);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Load ranks failed",
        text2: "Please try again later",
      });
    } finally {
      setIsLoadingMore(false);
      setLoading(false);
    }
  }, [debouncedSearchQuery, page, totalPages]);

  const loadMoreRanks = () => {
    if (!isLoadingMore && page < totalPages) {
      setIsLoadingMore(true);
      setPage(page + 1);
    }
  };

  const handleRefresh = () => {
    setPage(1);
    handleGetListRanks();
  };

  React.useEffect(() => {
    handleGetListRanks();
  }, [debouncedSearchQuery, handleGetListRanks, page]);

  const renderFooter = () => {
    if (!isLoadingMore) return null;
    return (
      <View style={styles.loadingFooter}>
        <ActivityIndicator size="small" color={colors.primary} />
      </View>
    );
  };

  const renderItem = useCallback(
    ({ item }: { item: IRank }) => (
      <RankItem item={item} onPress={navigation.navigate} />
    ),
    [navigation.navigate]
  );

  return (
    <TheLayout header={<TheBaseHeader title="Ranks" />}>
      <View style={styles.container}>
        <Searchbar
          placeholder="Search user..."
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

        <FlatList
          data={listRanks}
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
          onEndReached={loadMoreRanks}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
        />
      </View>
    </TheLayout>
  );
}

const RankItem = React.memo(
  ({
    item,
    onPress,
  }: {
    item: IRank;
    onPress: StackNavigationProp<RootStackParams>["navigate"];
  }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => onPress(Routes.UserProfile, { userId: item._id })}
    >
      <LinearGradient
        colors={
          item.rankNumber < 4 ? ["#f8f9ff", "#eef2ff"] : ["#ffffff", "#f8fafc"]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.rankContainer}
      >
        <View style={styles.rankInfo}>
          <Visibility
            visibility={item.rankNumber < 4}
            suspenseComponent={
              <View style={styles.rankNumberWrapper}>
                <Text style={styles.rankNumber}>#{item.rankNumber}</Text>
              </View>
            }
          >
            <Image
              source={rankImages[item.rankNumber - 1]}
              style={styles.rankImage}
              resizeMode="contain"
            />
          </Visibility>

          <View style={styles.userInfo}>
            <Text style={styles.rankName} numberOfLines={1}>
              {item.name}
            </Text>
            <View style={styles.accountTypeWrapper}>
              <MaterialCommunityIcons
                name={getAccountTypeIcon(item.accountType)}
                size={14}
                color={colors.primary}
              />
              <Text style={styles.accountTypeText}>{item.accountType}</Text>
            </View>
          </View>
        </View>

        <View style={styles.scoreWrapper}>
          <MaterialCommunityIcons
            name="trophy"
            size={20}
            color={colors.primary}
          />
          <Text style={styles.rankScore}>{item.score.toLocaleString()}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  )
);

const getAccountTypeIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case "premium":
      return "crown";
    case "vip":
      return "star";
    default:
      return "account";
  }
};

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
  rankContainer: {
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
  rankInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  rankImage: {
    width: 48,
    height: 48,
    marginRight: spacing[3],
  },
  rankNumberWrapper: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing[3],
  },
  rankNumber: {
    ...typography.subtitle1,
    color: colors.gray600,
  },
  userInfo: {
    flex: 1,
    marginRight: spacing[2],
  },
  rankName: {
    ...typography.subtitle2,
    color: colors.gray900,
    marginBottom: spacing[1],
  },
  accountTypeWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2],
  },
  accountTypeText: {
    ...typography.caption,
    color: colors.primary,
    textTransform: "capitalize",
  },
  scoreWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2],
  },
  rankScore: {
    ...typography.subtitle1,
    color: colors.primary,
  },
  loadingFooter: {
    paddingVertical: spacing[4],
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Ranks;
