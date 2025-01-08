import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import Toast from "react-native-toast-message";
import SeparatorLine from "@components/base/SeparatorLine";
import BaseAuthButton from "@components/base/BaseAuthButton";
import InputPassword from "@components/base/InputPassword";
import { authService } from "@src/services";
import Routes, { RootStackParams } from "@utils/Routes";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

interface IRegister {
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Register() {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [form, setForm] = useState<IRegister>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const goHomePage = useCallback(async () => {
    if (!(form.email && form.password)) {
      Toast.show({
        type: "error",
        text1: "Please enter your email address and password",
      });
    }
    if (form.password !== form.confirmPassword) {
      Toast.show({
        type: "error",
        text1: "Passwords do not match",
      });
      return;
    }
    try {
      setIsLoading(true);
      const rs = await authService.register({
        email: form.email,
        password: form.password,
      });
      navigation.navigate(Routes.Login, {
        email: rs.data.email,
      })
      Toast.show({
        text1: rs.message,
        type: "success",
      });
    } finally {
      setIsLoading(false);
    }
  }, [form]);

  return (
    <View style={styles.root}>
      <Image
        source={require("../../assets/images/english_icon.png")}
        style={styles.logo}
      />
      <Text style={styles.welcome}>Register new account</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={form.email}
        onChangeText={(value: string) => {
          setForm({ ...form, email: value });
        }}
        autoCapitalize="none"
      />
      <InputPassword
        value={form.password}
        onChangeText={(value: string) => {
          setForm({ ...form, password: value });
        }}
      />
      <View style={styles.confirmPasswordContainer}>
        <InputPassword
          value={form.confirmPassword}
          onChangeText={(value: string) => {
            setForm({ ...form, confirmPassword: value });
          }}
          placeholder="Confirm password"
        />
      </View>
      <BaseAuthButton onPress={goHomePage} label="Register" isLoading={isLoading} />
      <SeparatorLine />
      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Text style={styles.registerText}>
          You have an account? Back to login
        </Text>
      </TouchableOpacity>
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
  confirmPasswordContainer: {
    marginTop: 10,
  },
  togglePassword: {
    padding: 10,
  },
  registerButton: {
    marginTop: 15,
  },
  registerText: {
    color: "#0756b1",
    textAlign: "center",
  },
});
