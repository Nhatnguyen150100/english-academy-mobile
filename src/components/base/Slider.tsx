import * as React from "react";
import {
  Dimensions,
  Image,
  ImageSourcePropType,
  StyleSheet,
  View,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";

const width = Dimensions.get("window").width - 40;

function Slider() {
  const data = [
    require("@assets/images/slider/bg_1.jpg"),
    require("@assets/images/slider/bg_2.jpg"),
    require("@assets/images/slider/bg_3.jpg"),
    require("@assets/images/slider/bg_4.jpg"),
    require("@assets/images/slider/bg_5.jpg"),
  ];

  const renderItem = ({ item }: { item: ImageSourcePropType }) => (
    <View style={styles.slide}>
      <Image source={item} style={styles.image} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Carousel
        width={width}
        autoPlay
        loop
        autoPlayInterval={5000}
        height={width / 2}
        data={data}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 160,
  },
  slide: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: width,
    height: width / 2,
    borderRadius: 40,
  },
});

export default Slider;
