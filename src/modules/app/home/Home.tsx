import React from "react";
import { Text, StyleSheet, View } from "react-native";
import TheLayout from "@components/layout/TheLayOut";
import Slider from "@components/base/Slider";
import TopRank from "./components/TopRank";
import MyAchievements from "./components/MyAchievements";

function Home() {
  return (
    <TheLayout>
      <Slider />
      <View
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          width: "100%",
          paddingTop: 30,
        }}
      >
        <TopRank />
        <MyAchievements />
      </View>
    </TheLayout>
  );
}

export default Home;
