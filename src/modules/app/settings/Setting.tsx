import React, { useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Text, Button, Chip } from "react-native-paper";
import { signOut } from "@src/services/appService";
import TheLayout from "@components/layout/TheLayOut";
import TheBaseHeader from "@components/layout/TheBaseHeader";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Routes, { RootStackParams } from "@utils/Routes";
import ConfirmDialog from "@components/base/ConfirmDialog";
import { LightTheme } from "@styles/theme";
function Setting() {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
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
    <TheLayout header={<TheBaseHeader title="Setting" />}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Image
            source={require("../../../assets/images/english_icon.png")}
            style={styles.logo}
          />
          <Text style={styles.fontBlack}>English Academy V1</Text>
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
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  fontBlack: {
    fontFamily: "Black",
    fontSize: 20,
    marginBottom: 10,
  },
  logoutButton: {
    marginTop: 20,
    width: "100%",
  },
});

export default Setting;
