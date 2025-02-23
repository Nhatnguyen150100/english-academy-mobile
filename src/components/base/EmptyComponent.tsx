import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { IconButton, Text, Button, useTheme } from "react-native-paper";

interface EmptyComponentProps {
  icon?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  onPressButton?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
}

const EmptyComponent: React.FC<EmptyComponentProps> = ({
  icon = "clipboard-text-outline",
  title = "No data found",
  description = "There is no data to display at the moment",
  buttonText,
  onPressButton,
  containerStyle,
}) => {
  const theme = useTheme();

  return (
    <View style={[styles.container, containerStyle]}>
      <IconButton
        icon={icon}
        size={64}
        iconColor={theme.colors.backdrop}
        style={styles.icon}
      />

      <Text
        variant="titleMedium"
        style={[styles.title, { color: theme.colors.onSurfaceDisabled }]}
      >
        {title}
      </Text>

      <Text
        variant="bodyMedium"
        style={[styles.description, { color: theme.colors.onSurfaceDisabled }]}
      >
        {description}
      </Text>

      {buttonText && onPressButton && (
        <Button
          mode="outlined"
          style={styles.button}
          labelStyle={{ color: theme.colors.primary }}
          onPress={onPressButton}
        >
          {buttonText}
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  icon: {
    marginBottom: 16,
  },
  title: {
    textAlign: "center",
    marginBottom: 8,
  },
  description: {
    textAlign: "center",
    marginBottom: 24,
    maxWidth: 300,
  },
  button: {
    borderColor: "#0066CC",
  },
});

export default EmptyComponent;
