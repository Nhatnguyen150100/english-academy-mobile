import React, { useRef } from "react";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

const Fireworks = ({ play = true }) => {
  const animationRef = useRef<LottieView>(null);

  React.useEffect(() => {
    if (play) {
      animationRef.current?.play();
    } else {
      animationRef.current?.reset();
    }
  }, [play]);

  return (
    <View style={styles.container}>
      <LottieView
        ref={animationRef}
        source={require("@assets/animations/fireworks.json")}
        autoPlay={false}
        loop={false}
        style={styles.animation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    pointerEvents: "none",
    zIndex: 9999,
  },
  animation: {
    width: "150%",
    height: "150%",
  },
});

export default Fireworks;
