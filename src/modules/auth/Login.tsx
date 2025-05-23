import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";
import { useDispatch } from "react-redux";
import { setUser } from "@store/redux/appSlice";
import { ILogin } from "@src/types/auth.types";
import Toast from "react-native-toast-message";
import SeparatorLine from "@components/base/SeparatorLine";
import { authService } from "@src/services";
import { addStoreDataAsync } from "@helpers/storage";
import { StoreEnum } from "@helpers/storage/storeEnum";
import BaseAuthButton from "@components/base/BaseAuthButton";
import InputPassword from "@components/base/InputPassword";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Routes, { RootStackParams } from "@utils/Routes";
import { useGoogleAuth } from "@src/services/googleAuth";

export default function Login() {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const route = useRoute<RouteProp<RootStackParams, Routes.Login>>();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState<ILogin>({
    email: "",
    password: "",
  });
  const { googleSignIn } = useGoogleAuth();

  useEffect(() => {
    if (route.params?.email) setForm({ ...form, email: route.params?.email });
  }, [route.params?.email]);

  const handleLogin = async () => {
    if (!(form.email && form.password)) {
      Toast.show({
        type: "error",
        text1: "Please enter your email address and password",
      });
      return;
    }

    try {
      setIsLoading(true);
      const rs = await authService.login({
        email: form.email,
        password: form.password,
      });

      await addStoreDataAsync(StoreEnum.AccessToken, rs.data.accessToken);
      dispatch(setUser(rs.data.user));
      navigation.reset({ index: 0, routes: [{ name: Routes.Home }] });
    } catch (error) {
      console.log("🚫 Login error:", error);
      Toast.show({
        type: "error",
        text1: "Login failed. Please check your email and password",
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
      <Text style={styles.welcome}>Welcome to ENGLISH ACADEMY</Text>
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
      <TouchableOpacity
        style={styles.forgotPassword}
        onPress={() => {
          navigation.navigate(Routes.ForgotPassword, {
            email: form.email,
          });
        }}
      >
        <Text style={styles.forgotPasswordText}>Forgot your password</Text>
      </TouchableOpacity>
      <BaseAuthButton
        isLoading={isLoading}
        label="Login"
        onPress={handleLogin}
      />
      <BaseAuthButton
        isLoading={false}
        label="Continue with Google"
        onPress={googleSignIn}
        icon={require("@assets/images/google_icon.png")}
      />
      <SeparatorLine />
      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => {
          navigation.navigate(Routes.Register);
        }}
      >
        <Text style={styles.registerText}>Don't have an account? Register</Text>
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
  forgotPassword: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
  },
  forgotPasswordText: {
    color: "#0756b1",
    textAlign: "right",
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 10,
    borderRadius: 20,
  },
  closeText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
