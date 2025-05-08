// components/base/FakeAdBanner.tsx
import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { useVideoPlayer, VideoView } from "expo-video";

const { width } = Dimensions.get("window");

const FakeAdBanner = () => {
  const videoSource = require("@assets/video/ads.mp4");

  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.play();
  });

  return (
    <View style={styles.container}>
      <VideoView
        style={styles.video}
        player={player}
        allowsFullscreen
        allowsPictureInPicture
        contentFit="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    height: 60,
    backgroundColor: "#000",
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    zIndex: 1,
  },
  video: {
    width: "100%",
    height: "100%",
  },
});

export default FakeAdBanner;
