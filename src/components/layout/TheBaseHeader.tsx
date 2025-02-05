import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { LightTheme } from "@styles/theme";
import { RootStackParams } from "@utils/Routes";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface IProps {
  title: string;
  isShowBackBtn?: boolean;
  rightSection?: React.ReactNode;
}

export default function TheBaseHeader({
  title,
  isShowBackBtn = false,
  rightSection,
}: IProps) {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.appbar}>
      <View style={styles.decorator}></View>
      {isShowBackBtn ? (
        <Ionicons
          name="arrow-back"
          size={24}
          color="white"
          onPress={handleBack}
        />
      ) : (
        <View></View>
      )}

      <Text style={styles.appbarTitle}>{title}</Text>

      {rightSection ? rightSection : <View></View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4F8",
  },
  decorator: {
    height: 280,
    width: 280,
    position: "absolute",
    borderRadius: "50%",
    backgroundColor: "white",
    zIndex: 0,
    right: -150,
    top: -160,
    transform: [{ rotate: "45deg" }],
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    opacity: 0.2,
  },
  appbar: {
    position: "relative",
    backgroundColor: LightTheme.primary,
    paddingVertical: 24,
    paddingHorizontal: 20,
    height: 80,
    width: "auto",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  appbarTitle: {
    position: "absolute",
    left: 178,
    top: 26,
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});
