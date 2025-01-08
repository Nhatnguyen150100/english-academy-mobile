import BaseAuthButton from "@components/base/BaseAuthButton";
import SeparatorLine from "@components/base/SeparatorLine";
import { addStoreDataAsync } from "@helpers/storage";
import { StoreEnum } from "@helpers/storage/storeEnum";
import { CommonActions } from "@react-navigation/native";
import { INavigatorProps } from "@src/types/navigator.types";
import Routes from "@utils/Routes";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function OneStepScreen({ navigation }: INavigatorProps) {
  const handlePress = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: Routes.Login }],
      })
    );
    addStoreDataAsync(StoreEnum.isStarted, "true");
  };

  return (
    <View style={styles.container}>
      <View style={styles.viewTitle}>
        <Text style={styles.title}>The English Academy</Text>
      </View>
      <View style={styles.body}>
        <Image
          source={require("@assets/images/academy_started.png")}
          style={styles.image}
        />
        <View style={styles.startView}>
          <Text style={styles.instruction}>
            Start your English Academy journey.
          </Text>
          <BaseAuthButton onPress={handlePress} label="Login" />
        </View>
        <SeparatorLine />
        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => {
            navigation.navigate(Routes.Register);
          }}
        >
          <Text style={styles.registerText}>
            Don't have an account? Register
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#F9F9F9",
  },
  viewTitle: {
    height: 200,
    width: "100%",
    backgroundColor: "#0756b1",
    borderBottomEndRadius: "30%",
    borderBottomStartRadius: "30%",
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
  },
  startView: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  body: {
    marginTop: 50,
    marginBottom: 80,
    padding: 20,
    borderRadius: 10,
    width: "80%",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: {
    width: 260,
    height: 240,
    marginBottom: 20,
    borderRadius: 10,
  },
  instruction: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 20,
    color: "#b9052d",
  },
  registerButton: {
    marginTop: 15,
  },
  registerText: {
    color: "#0756b1",
    textAlign: "center",
  },
});
