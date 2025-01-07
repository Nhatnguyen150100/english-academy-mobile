import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";
import { useDispatch } from "react-redux";
import { setUser } from "@store/redux/appSlice";
import Icon from "react-native-vector-icons/Ionicons";
import Toast from "react-native-toast-message";
import { INavigatorProps } from "@src/types/navigator.types";
import Routes from "@utils/Routes";

interface IRegister {
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Register({ navigation }: INavigatorProps) {
  const dispatch = useDispatch();
  const [form, setForm] = useState<IRegister>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const goHomePage = useCallback(() => {
    if (!(form.email && form.password)) {
      Toast.show({
        type: "error",
        text1: "Please enter your email address and password",
      });
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
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          value={form.password}
          onChangeText={(value: string) => {
            setForm({ ...form, password: value });
          }}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          onPress={() => setShowPassword((prev) => !prev)}
          style={styles.togglePassword}
        >
          <Icon
            name={showPassword ? "eye-off" : "eye"}
            size={20}
            color="#000"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.confirmPasswordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          value={form.password}
          onChangeText={(value: string) => {
            setForm({ ...form, password: value });
          }}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          onPress={() => setShowPassword((prev) => !prev)}
          style={styles.togglePassword}
        >
          <Icon
            name={showPassword ? "eye-off" : "eye"}
            size={20}
            color="#000"
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.buttonStyle} onPress={goHomePage}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <View style={styles.separator}>
        <View style={styles.line} />
        <Text style={styles.separatorText}>or</Text>
        <View style={styles.line} />
      </View>
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
    padding: 20,
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
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  confirmPasswordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#fff",
    marginTop: 10,
  },
  passwordInput: {
    height: 50,
    flex: 1,
    paddingHorizontal: 10,
  },
  togglePassword: {
    padding: 10,
  },
  buttonStyle: {
    marginTop: 32,
    width: "100%",
    height: 46,
    backgroundColor: "#007BFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 24,
    marginBottom: 20,
  },
  separator: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    width: "100%",
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
  separatorText: {
    marginHorizontal: 10,
    fontSize: 16,
    color: "#888",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  registerButton: {
    marginTop: 15,
  },
  registerText: {
    color: "#007BFF",
    textAlign: "center",
  },
});
