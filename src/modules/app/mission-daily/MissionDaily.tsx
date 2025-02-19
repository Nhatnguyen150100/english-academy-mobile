import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { useSelector } from "react-redux";
import { IRootState } from "@store/index";
import TheLayout from "@components/layout/TheLayOut";
import TheBaseHeader from "@components/layout/TheBaseHeader";
import { LightTheme } from "@styles/theme";

function MissionDaily() {
  const user = useSelector((state: IRootState) => state.AppReducer.user);

  return (
    <TheLayout header={<TheBaseHeader title="Mission Daily" isShowBackBtn />}>
      <Text>
        Mission daily
      </Text>
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
    backgroundColor: LightTheme.primary,
  },
});

export default MissionDaily;
