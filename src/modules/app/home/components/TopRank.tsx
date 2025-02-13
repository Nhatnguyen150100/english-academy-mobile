import { rankService } from "@src/services";
import { IRank } from "@src/types/rank.types";
import { LightTheme } from "@styles/theme";
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
      const rs = await rankService.getAllRank();
      if (rs.data) {
        setListRanks(rs.data.filter((_item) => _item.rankNumber < 4));
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

  return (
    <View style={styles.root}>
      <Text style={styles.fontBlack}>Top rank</Text>
      <View style={styles.container}>
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
                <Text style={styles.rankId}>{rank._id}</Text>
              </View>
            </View>
            <Text style={styles.rankScore}>{rank.score}</Text>
          </View>
        ))}
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
  rankScore: {
    fontFamily: "Black",
    fontSize: 22,
    color: LightTheme.primary,
    marginBottom: 5, 
  },
});
