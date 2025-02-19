import { IMyRank } from "@src/types/rank.types";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

interface IProps {
  title?: string;
  data: IMyRank;
}

export default function Achievements({ title, data }: IProps) {
  return (
    <View style={styles.root}>
      <Text style={styles.fontBlack}>{title}</Text>
      <View style={styles.container}>
        <View style={styles.rankContainer}>
          <Image
            source={require("@assets/images/achievements/rank_top.png")}
            style={styles.icon}
          />
          <Text style={styles.rankValue}>{data?.rank}</Text>
          <Text style={styles.rankLabel}>Rank</Text>
        </View>
        <View style={styles.rankContainer}>
          <Image
            source={require("@assets/images/achievements/hight_score.png")}
            style={styles.icon}
          />
          <Text style={styles.rankValue}>{data?.score}</Text>
          <Text style={styles.rankLabel}>Score</Text>
        </View>
        <View style={styles.rankContainer}>
          <Image
            source={require("@assets/images/achievements/exam.png")}
            style={styles.icon}
          />
          <Text style={styles.rankValue}>{data?.completedExams}</Text>
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
