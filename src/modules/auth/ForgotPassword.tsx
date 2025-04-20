import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, TextInput } from "react-native";
import Toast from "react-native-toast-message";
import BaseAuthButton from "@components/base/BaseAuthButton";
import { authService } from "@src/services";
import Routes from "@utils/Routes";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParams } from "@utils/Routes";
import { Text, TouchableRipple } from "react-native-paper";
import SeparatorLine from "@components/base/SeparatorLine";

export default function ForgotPassword() {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const route = useRoute<RouteProp<RootStackParams, Routes.ForgotPassword>>();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (route.params?.email) setEmail(route.params.email);
  }, [route.params?.email]);

  const handleSendOTP = async () => {
    if (!email) {
      Toast.show({ type: "error", text1: "Please enter your email." });
      return;
    }

    try {
      setIsLoading(true);
      const response = await authService.forgotPassword(email);
      Toast.show({
        type: "success",
        text1: response?.data?.message || "Sent OTP success",
      });

      navigation.navigate(Routes.verifyOTP, { email });
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: error?.response?.data?.message || "Sent OTP fail",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.root}>
      <Image
        source={require("../../assets/images/english_icon.png")}
        style={styles.logo}
      />
      <Text variant="headlineMedium" style={styles.welcome}>
        Forgot Password
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <BaseAuthButton
        label="Sent OTP"
        isLoading={isLoading}
        onPress={handleSendOTP}
      />
      <SeparatorLine />

      <TouchableRipple
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Text style={styles.backText}>Back to Login</Text>
      </TouchableRipple>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    backgroundColor: "#f5f5f5",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  welcome: {
    fontFamily: "Bold",
    textAlign: "center",
    fontSize: 25,
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  backButton: {
    marginTop: 15,
  },
  backText: {
    color: "#0756b1",
    textAlign: "center",
  },
});
