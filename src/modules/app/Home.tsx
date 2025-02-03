import React from "react";
import { Text, StyleSheet, View } from "react-native";
import TheLayout from "@components/layout/TheLayOut";
import Slider from "@components/base/Slider";

function Home() {
  return (
    <TheLayout>
      <Slider />
      <View
        style={{
          flex: 1,
        }}
      >
        <Text style={styles.fontBlack}>Home</Text>
      </View>
    </TheLayout>
  );
}

const styles = StyleSheet.create({
  fontBlack: {
    fontFamily: "Black",
    marginTop: 20,
    fontSize: 20,
  },
});

export default Home;
