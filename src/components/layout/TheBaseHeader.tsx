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
      <View style={styles.backIcon}>
        {isShowBackBtn && (
          <Ionicons
            name="arrow-back"
            size={24}
            color="white"
            onPress={handleBack}
          />
        )}
      </View>

      <Text style={styles.appbarTitle}>{title}</Text>
      <View style={styles.appbarRight}>
        {rightSection ? rightSection : <View></View>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4F8",
  },
  backIcon: {
    position: "absolute",
    left: 20,
    top: 28,
    zIndex: 10,
    backgroundColor: "transparent",
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
  appbarRight: {
    position: "absolute",
    right: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  appbar: {
    position: "relative",
    backgroundColor: LightTheme.primary,
    paddingVertical: 24,
    paddingHorizontal: 20,
    height: 80,
    width: "auto",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  appbarTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});
