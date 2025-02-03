import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, StyleSheet, Button, StatusBar } from "react-native";
import TheHeader from "./TheHeader";
import { LightTheme } from "@styles/theme";

interface IProps {
  children: React.ReactNode
}

function TheLayout({children}: IProps) {
  return (
    <SafeAreaView style={styles.safeView}>
      <StatusBar barStyle="light-content" backgroundColor={LightTheme.primary} />
      <TheHeader />
      <View style={styles.root}>
        <View style={styles.container}>
          {children}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    backgroundColor: LightTheme.primary,
  },

  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },

  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
});

export default TheLayout;
