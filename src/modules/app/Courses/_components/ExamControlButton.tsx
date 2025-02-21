import Visibility from "@components/base/visibility";
import React from "react";
import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";

interface IProps {
  onPress: (event?: GestureResponderEvent) => void;
  isLoading?: boolean;
  buttonStyle?: StyleProp<ViewStyle>;
  labelSection: React.ReactNode;
}

export default function ExamControlButton({
  labelSection,
  onPress,
  isLoading = false,
  buttonStyle,
}: IProps) {
  return (
    <TouchableOpacity
      style={[buttonStyle, isLoading && styles.buttonLoading]}
      onPress={onPress}
      disabled={isLoading}
    >
      {labelSection}
      <Visibility visibility={isLoading}>
        <ActivityIndicator color="white" />
      </Visibility>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonLoading: {
    opacity: 0.8,
  },
});
