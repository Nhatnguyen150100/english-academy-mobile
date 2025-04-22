import React from "react";
import {
  GestureResponderEvent,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Visibility from "./visibility";
import { ActivityIndicator, Text } from "react-native-paper";

interface IProps {
  onPress: (event?: GestureResponderEvent) => void;
  isLoading?: boolean;
  label: string;
  icon?: any;
}

export default function BaseAuthButton({
  label,
  onPress,
  isLoading = false,
  icon,
}: IProps) {
  return (
    <TouchableOpacity
      style={[
        styles.buttonStyle,
        isLoading && styles.buttonLoading,
        {
          backgroundColor: icon ? "#FFFFFF" : "#0756b1",
        },
      ]}
      onPress={onPress}
      disabled={isLoading}
    >
      {icon && <Image source={icon} style={styles.icon} />}
      <Text
        style={[
          styles.buttonText,
          {
            color: icon ? "#000000" : "#FFFFFF",
          },
        ]}
      >
        {label}
      </Text>
      <Visibility visibility={isLoading}>
        <ActivityIndicator color="white" />
      </Visibility>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    marginTop: 20,
    width: "100%",
    height: 46,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 24,
  },
  buttonLoading: {
    opacity: 0.8,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginRight: 10,
  },
});
