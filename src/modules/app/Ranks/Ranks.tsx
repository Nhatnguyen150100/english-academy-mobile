import React, { useState } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message";
import { IRank } from "@src/types/rank.types";
import { rankService } from "@src/services";
import TheLayout from "@components/layout/TheLayOut";
import TheBaseHeader from "@components/layout/TheBaseHeader";
import { FlatList } from "react-native-gesture-handler";
import { LightTheme } from "@styles/theme";
import Visibility from "@components/base/visibility";
import { Searchbar } from "react-native-paper";
import useDebounce from "@hooks/useDebounce";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Routes, { RootStackParams } from "@utils/Routes";

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
  

  const handleGetListRanks = React.useCallback(async () => {
    try {
      const rs = await rankService.getAllRank({
        name: debouncedSearchQuery
      });
      if (rs.data) {
        setListRanks(rs.data);
      }
    } catch (error) {
      Toast.show({
        text1: "Error fetching data",
        type: "error",
      });
    }
  }, [debouncedSearchQuery]);

  React.useEffect(() => {
    handleGetListRanks();
  }, [debouncedSearchQuery]);

  const renderItem = ({ item }: { item: IRank }) => (
    <TouchableOpacity onPress={() => {
      navigation.navigate(Routes.UserProfile, {
        userId: item._id
      })
    }}>

    <View style={styles.rankContainer}>
      <View style={styles.rankInfo}>
        <Visibility
          visibility={item.rankNumber < 4}
          suspenseComponent={
            <Text style={styles.rankNumber}>{item.rankNumber}</Text>
          }
        >
          <Image
            source={rankImages[item.rankNumber - 1]}
            style={styles.rankImage}
          />
        </Visibility>
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
    </TouchableOpacity>
  );

  return (
    <TheLayout header={<TheBaseHeader title="Ranks" />}>
      <View style={styles.container}>
        <Searchbar
          placeholder="Search user..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
          inputStyle={styles.searchInput}
          iconColor="#000000"
          placeholderTextColor="#000000"
        />
        <FlatList
          data={listRanks}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          style={{
            paddingHorizontal: 5,
          }}
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
  searchBar: {
    borderRadius: 25,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#000000",
    shadowColor: "transparent",
    elevation: 0,
    width: "98%",
    marginBottom: 10
  },
  searchInput: {
    fontSize: 12,
    color: "#000000",
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
    backgroundColor: "#f9f9ff",
    borderRadius: 20,
    marginBottom: 10,
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
    marginLeft: 12,
    marginBottom: 5,
  },
});

export default Ranks;
