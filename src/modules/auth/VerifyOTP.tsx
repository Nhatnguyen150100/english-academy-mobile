import React, { useState } from "react";
import { View, StyleSheet, Image, TextInput } from "react-native";
import Toast from "react-native-toast-message";
import BaseAuthButton from "@components/base/BaseAuthButton";
import { authService } from "@src/services";
import Routes from "@utils/Routes";
import { useNavigation, RouteProp, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParams } from "@utils/Routes";
import { Text, TouchableRipple } from "react-native-paper";
import SeparatorLine from "@components/base/SeparatorLine";

export default function VerifyOTP() {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const route = useRoute<RouteProp<RootStackParams, Routes.verifyOTP>>();

  const { email } = route.params;
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleVerifyOTP = async () => {
    if (!email) {
      Toast.show({ type: "error", text1: "Email is required!" });
      navigation.goBack();
      return;
    }

    if (!otp) {
      Toast.show({ type: "error", text1: "Please enter OTP!" });
      return;
    }

    try {
      setIsLoading(true);
      const response = await authService.verifyOtpAndResetPassword({
        otp,
        email,
      });
      Toast.show({
        type: "success",
        text1: response?.data?.message || "Reset password success",
      });

      navigation.reset({
        index: 0,
        routes: [{ name: Routes.Login }],
      });
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: error?.response?.data?.message || "Reset password fail",
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
      <Text variant="headlineMedium" style={styles.title}>
        Verify OTP
      </Text>

      <TextInput
        placeholder="OTP code"
        style={styles.input}
        value={otp}
        onChangeText={setOtp}
        keyboardType="numeric"
      />

      <BaseAuthButton
        label="Submit"
        isLoading={isLoading}
        onPress={handleVerifyOTP}
      />
      <SeparatorLine />

      <TouchableRipple
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Text style={styles.backText}>Resent OTP</Text>
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
  title: {
    textAlign: "center",
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
    alignSelf: "center",
  },
  backText: {
    color: "#007AFF",
  },
});
