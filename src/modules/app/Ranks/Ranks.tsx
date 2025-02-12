import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import Toast from "react-native-toast-message";
import { IRank } from "@src/types/rank.types";
import { rankService } from "@src/services";
import TheLayout from "@components/layout/TheLayOut";
import TheBaseHeader from "@components/layout/TheBaseHeader";
import TopRank from "../home/components/TopRank";
import { FlatList } from "react-native-gesture-handler";
import { LightTheme } from "@styles/theme";

function Ranks() {
  const [listRanks, setListRanks] = useState<IRank[]>([]);

  const handleGetListRanks = async () => {
    try {
      const rs = await rankService.getAllRank();
      if (rs.data) {
        setListRanks(rs.data.slice(3));
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

  const renderItem = ({ item }: { item: IRank }) => (
    <View style={styles.rankContainer}>
      <View style={styles.rankInfo}>
        <Text style={styles.rankNumber}>{item.score}</Text>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Text style={styles.rankName}>{item.name}</Text>
          <Text style={styles.rankId}>{item._id}</Text>
        </View>
      </View>
      <Text style={styles.rankScore}>{item.score}</Text>
    </View>
  );

  return (
    <TheLayout header={<TheBaseHeader title="Ranks" />}>
      <View style={styles.container}>
        <TopRank />
        <FlatList
          data={listRanks}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
        />
      </View>
    </TheLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },

  fontBlack: {
    fontFamily: "Black",
    marginTop: 20,
    fontSize: 20,
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
  rankNumber: {
    fontFamily: "Black",
    fontSize: 22,
    color: "#000000",
    marginRight: 25,
    marginBottom: 5,
  }
});

export default Ranks;
