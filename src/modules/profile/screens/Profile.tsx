import React, { useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Text, Button } from "react-native-paper";
import { useSelector } from "react-redux";
import { IRootState } from "@store/index";
import { signOut } from "@src/services/appService";
import TheLayout from "@components/layout/TheLayOut";
import TheBaseHeader from "@components/layout/TheBaseHeader";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Routes, { RootStackParams } from "@utils/Routes";
import ConfirmDialog from "@components/base/ConfirmDialog";
import { LightTheme } from "@styles/theme";
import { AntDesign } from "@expo/vector-icons";
import MyAchievements from "@modules/app/home/components/MyAchievements";

function Profile() {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const user = useSelector((state: IRootState) => state.AppReducer.user);
  const [isShowDialog, setIsShowDialog] = useState(false);

  const handleLogOut = () => {
    setIsShowDialog(false);
    signOut();
    navigation.reset({
      index: 0,
      routes: [{ name: Routes.Login }],
    });
  };

  return (
    <TheLayout header={<TheBaseHeader title="Profile" />}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.avatarContainer}>
            <AntDesign name="user" size={44} color={LightTheme.primary} />
          </View>
          <Text style={styles.title}>{user?.name ?? user?.email}</Text>
          <View style={styles.infoContainer}>
            <View style={styles.rowInfo}>
              <Text style={styles.label}>Name: </Text>
              <Text style={styles.info}>{user?.name}</Text>
            </View>

            <Text style={styles.label}>Email: </Text>
            <Text style={styles.info}>{user?.email}</Text>

            <Text style={styles.label}>Phone: </Text>
            <Text style={styles.info}>{user?.phone_number}</Text>

            <Text style={styles.label}>Address: </Text>
            <Text style={styles.info}>{user?.address}</Text>

            <Text style={styles.label}>Role: </Text>
            <Text style={styles.info}>{user?.role}</Text>
          </View>
          <MyAchievements />
        </View>

        <Button
          mode="contained"
          buttonColor={LightTheme.primary}
          onPress={() => setIsShowDialog(true)}
          style={styles.logoutButton}
        >
          Log Out
        </Button>

        <ConfirmDialog
          showDialog={isShowDialog}
          content={"Do you want to log out?"}
          handleAccept={handleLogOut}
          handleReject={() => {
            setIsShowDialog(false);
          }}
        />
      </View>
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
    borderWidth: 0.8,
    borderColor: "#333",
    borderRadius: 20,
    padding: 8,
    marginBottom: 4,
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  infoContainer: {
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
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
  },
  info: {
    color: "#555",
  },
  logoutButton: {
    marginTop: 20,
    width: "100%",
  },
});

export default Profile;
