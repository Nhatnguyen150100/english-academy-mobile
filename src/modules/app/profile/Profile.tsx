import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { Text, Button, Chip } from "react-native-paper";
import { useSelector } from "react-redux";
import { IRootState } from "@store/index";
import TheLayout from "@components/layout/TheLayOut";
import TheBaseHeader from "@components/layout/TheBaseHeader";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Routes, { RootStackParams } from "@utils/Routes";
import { colors, LightTheme } from "@styles/theme";
import { AntDesign } from "@expo/vector-icons";
import AccountChip from "@components/base/AccountChip";
import MyAchievements from "../home/components/MyAchievements";
import Icon from "react-native-vector-icons/Ionicons";
import { examService } from "@src/services";
import Visibility from "@components/base/visibility";

function InformationSection({
  label,
  value,
  iconNext,
  onPress,
}: {
  label: string;
  value?: string;
  iconNext: React.ReactNode;
  onPress?: () => void;
}) {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  return (
    <TouchableOpacity
      onPress={() => {
        onPress ? onPress() : navigation.navigate(Routes.EditProfile);
      }}
    >
      <View style={styles.rowInfo}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.row}>
          <Text style={styles.info}>{value}</Text>
          {iconNext}
        </View>
      </View>
    </TouchableOpacity>
  );
}

function Profile() {
  const user = useSelector((state: IRootState) => state.AppReducer.user);
  const [numberAttempt, setNumberAttempt] = useState<number | "UNLIMITED">();
  console.log("🚀 ~ Profile ~ numberAttempt:", numberAttempt);

  const handleGetExamAttempt = async () => {
    const rs = await examService.checkNumberExamAttempt();
    if (rs.data) {
      setNumberAttempt(rs.data);
    }
  };

  useEffect(() => {
    handleGetExamAttempt();
  }, []);

  const iconNext = (
    <Icon
      name="chevron-forward-outline"
      size={16}
      style={{
        marginLeft: 3,
      }}
      color="#8c8c8c"
    />
  );

  return (
    <TheLayout header={<TheBaseHeader title="Profile" isShowBackBtn />}>
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <View style={styles.avatarContainer}>
              <AntDesign name="user" size={44} color={LightTheme.primary} />
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <Text style={styles.title}>{user?.name ?? user?.email}</Text>
              <Text style={styles.subTitle}>{user?._id}</Text>
              <AccountChip accountType={user?.accountType ?? "FREE"} />
            </View>
            <View style={styles.infoContainer}>
              <InformationSection
                label="Email"
                value={user?.email}
                iconNext={iconNext}
              />
              <InformationSection
                label="Phone number"
                value={user?.phone_number}
                iconNext={iconNext}
              />
              <InformationSection
                label="Address"
                value={user?.address}
                iconNext={iconNext}
              />
              <InformationSection
                label="History exams completed"
                value={""}
                iconNext={iconNext}
              />
              <View style={styles.rowInfo}>
                <Text style={styles.label}>Number of exams can attempt</Text>
                <Text style={{ color: "#00000", fontWeight: "bold" }}>
                  {numberAttempt}
                </Text>
              </View>
              <Visibility visibility={user?.accountType === "FREE"}>
                <Button
                  mode="contained"
                  buttonColor={colors.primary}
                  // onPress={() => setIsShowDialog(true)}
                  style={styles.editInfoButton}
                >
                  Update plan
                </Button>
              </Visibility>
            </View>
            <MyAchievements />
          </View>
        </View>
      </KeyboardAvoidingView>
    </TheLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
  },
  headerContainer: {
    flex: 1,
    justifyContent: "flex-start",
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
  },
  fontBlack: {
    fontFamily: "Black",
    fontSize: 20,
    marginBottom: 10,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: LightTheme.primary,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  rowInfo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  subTitle: {
    fontSize: 10,
    color: "#888",
    marginBottom: 5,
  },
  infoContainer: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    height: 30,
    borderStyle: "solid",
    borderColor: "#ccc",
    borderWidth: 1,
    fontSize: 14,
    borderTopStartRadius: 8,
    borderTopEndRadius: 8,
    borderBottomStartRadius: 8,
    borderBottomEndRadius: 8,
    width: 220,
    paddingHorizontal: 8,
    backgroundColor: "transparent",
  },
  info: {
    color: "#555",
  },
  logoutButton: {
    marginTop: 20,
    width: "100%",
  },
  editInfoButton: {
    width: "100%",
    backgroundColor: colors.primary,
  },
});

export default Profile;
