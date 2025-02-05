import { rankService } from "@src/services";
import { IMyRank } from "@src/types/rank.types";
import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Toast from "react-native-toast-message";

export default function MyAchievements() {
  const [myRank, setMyRank] = useState<IMyRank>();

  const handleGetMyRank = async () => {
    try {
      const rs = await rankService.getMyRank();
      if (rs.data) {
        setMyRank(rs.data);
      }
    } catch (error) {
      Toast.show({
        text1: "Error fetching data",
        type: "error",
      });
    }
  };

  React.useEffect(() => {
    handleGetMyRank();
  }, []);

  return (
    <View style={styles.root}>
      <Text style={styles.fontBlack}>My achievements</Text>
      <View style={styles.container}>
        <View style={styles.rankContainer}>
          <Image
            source={require("@assets/images/achievements/rank_top.png")}
            style={styles.icon}
          />
          <Text style={styles.rankValue}>{myRank?.rank}</Text>
          <Text style={styles.rankLabel}>Rank</Text>
        </View>
        <View style={styles.rankContainer}>
          <Image
            source={require("@assets/images/achievements/hight_score.png")}
            style={styles.icon}
          />
          <Text style={styles.rankValue}>{myRank?.score}</Text>
          <Text style={styles.rankLabel}>Score</Text>
        </View>
        <View style={styles.rankContainer}>
          <Image
            source={require("@assets/images/achievements/exam.png")}
            style={styles.icon}
          />
          <Text style={styles.rankValue}>{myRank?.completedExams}</Text>
          <Text style={styles.rankLabel}>Completed</Text>
        </View>
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
  },
  fontBlack: {
    fontFamily: "Black",
    fontSize: 20,
    marginBottom: 10,
  },
  rankContainer: {
    alignItems: "center", 
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    marginVertical: 10,
    width: 100,
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  rankValue: {
    fontFamily: "Black",
    fontSize: 24,
    color: "#333",
    marginBottom: 5, 
  },
  rankLabel: {
    fontFamily: "Regular",
    fontSize: 12,
    color: "#777",
  },
});
