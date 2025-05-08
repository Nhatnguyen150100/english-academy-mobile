import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
} from "react-native";
import { useVideoPlayer, VideoView } from "expo-video";

const { width, height } = Dimensions.get("window");

interface FakeAdBannerProps {
  open: boolean;
  close: () => void;
}

const FakeAdBanner = ({ open, close }: FakeAdBannerProps) => {
  const [countdown, setCountdown] = useState(15);
  const videoSource = require("@assets/video/ads.mp4");

  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.play();
  });

  useEffect(() => {
    if (!open) {
      setCountdown(15);
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [open]);

  if (!open) return null;

  return (
    <View style={[styles.container, { width, height }]}>
      <VideoView
        style={styles.video}
        player={player}
        contentFit="cover"
        allowsFullscreen={false}
      />
      <View style={styles.overlay}>
        <View style={styles.countdownCircle}>
          <Text style={styles.countdownText}>{countdown}</Text>
        </View>

        {countdown === 0 && (
          <TouchableOpacity style={styles.closeButton} onPress={close}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "#000",
    zIndex: 9999,
    overflow: "hidden",
  },
  video: {
    flex: 1,
  },
  overlay: {
    position: "absolute",
    top: 80,
    right: 16,
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  countdownCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  countdownText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  closeButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  closeText: {
    color: "#FFF",
    fontSize: 32,
    lineHeight: 38,
    fontWeight: "300",
  },
});

export default FakeAdBanner;
