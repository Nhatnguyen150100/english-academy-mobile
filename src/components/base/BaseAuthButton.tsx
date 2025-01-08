import React from "react";
import {
  GestureResponderEvent,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Visibility from "./visibility";
import { ActivityIndicator, Text } from "react-native-paper";

interface IProps {
  onPress: (event?: GestureResponderEvent) => void;
  isLoading?: boolean;
  label: string;
}

export default function BaseAuthButton({
  label,
  onPress,
  isLoading = false,
}: IProps) {
  return (
    <TouchableOpacity
      style={[styles.buttonStyle, isLoading && styles.buttonLoading]}
      onPress={onPress}
      disabled={isLoading}
    >
      <Text style={styles.buttonText}>{label}</Text>
      <Visibility visibility={isLoading}>
        <ActivityIndicator color="white" />
      </Visibility>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    marginTop: 32,
    width: "100%",
    height: 46,
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#0756b1",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 24,
    marginBottom: 20,
  },
  buttonLoading: {
    opacity: 0.8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginRight: 10,
  },
});
