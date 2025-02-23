import EmptyComponent from "@components/base/EmptyComponent";
import Visibility from "@components/base/visibility";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { rankService } from "@src/services";
import { IRank } from "@src/types/rank.types";
import { spacing } from "@styles/spacing";
import { colors } from "@styles/theme";
import typography from "@styles/typography";
import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Toast from "react-native-toast-message";

const rankImages = [
  require("@assets/images/rank/rank_1.png"),
  require("@assets/images/rank/rank_2.png"),
  require("@assets/images/rank/rank_3.png"),
];

export default function TopRank() {
  const [listRanks, setListRanks] = useState<IRank[]>([]);

  const handleGetListRanks = async () => {
    try {
      const rs = await rankService.getAllRank({
        limit: 3,
      });
      if (rs.data) {
        setListRanks(rs.data.data.filter((_item) => _item.rankNumber < 4));
      }
    } catch (error) {
      Toast.show({
        text1: "Error fetching data",
        type: "error",
      });
    }
  };

  React.useEffect(() => {
    handleGetListRanks();
  }, []);

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

  return (
    <View style={styles.root}>
      <Text style={styles.fontBlack}>Top rank</Text>
      <View style={styles.container}>
        <Visibility
          visibility={listRanks.length}
          suspenseComponent={<EmptyComponent />}
        >
          {listRanks.map((rank, index) => (
            <View key={index} style={styles.rankContainer}>
              <View style={styles.rankInfo}>
                <Image source={rankImages[index]} style={styles.rankImage} />
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Text style={styles.rankName}>{rank.name}</Text>
                  <View style={styles.accountTypeWrapper}>
                    <MaterialCommunityIcons
                      name={getAccountTypeIcon(rank.accountType)}
                      size={14}
                      color={colors.primary}
                    />
                    <Text style={styles.accountTypeText}>
                      {rank.accountType}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.scoreWrapper}>
                <MaterialCommunityIcons
                  name="trophy"
                  size={20}
                  color={colors.primary}
                />
                <Text style={styles.rankScore}>
                  {rank.score.toLocaleString()}
                </Text>
              </View>
            </View>
          ))}
        </Visibility>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "center",
    width: "100%",
    marginTop: 10,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  fontBlack: {
    fontFamily: "Black",
    fontSize: 20,
    marginBottom: 10,
  },
  rankContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    backgroundColor: "#f9f9ff",
    borderRadius: 20,
    padding: 12,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  rankInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  rankImage: {
    height: 44,
    width: 44,
    marginRight: 10,
  },
  rankName: {
    fontSize: 14,
    color: "Black",
    fontFamily: "Bold",
  },
  rankId: {
    fontSize: 12,
    color: "gray",
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
});
