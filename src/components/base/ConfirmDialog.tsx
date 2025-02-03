import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Dialog, Portal, Text } from "react-native-paper";

interface IProps {
  showDialog: boolean;
  content: string;
  acceptTitleBtn?: string;
  rejectTitleBtn?: string;
  handleAccept: () => void;
  handleReject: () => void;
}

const ConfirmDialog = ({
  content,
  acceptTitleBtn,
  rejectTitleBtn,
  handleAccept,
  showDialog,
  handleReject,
}: IProps) => {
  return (
    <Portal>
      <Dialog visible={showDialog} onDismiss={handleReject}>
        <Dialog.Title>Confirm</Dialog.Title>
        <Dialog.Content>
          <Text>{content}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <TouchableOpacity onPress={handleReject}>
            <Text>{rejectTitleBtn ?? "Cancel"}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleAccept} style={styles.acceptBtn}>
            <Text>{acceptTitleBtn ?? "Accept"}</Text>
          </TouchableOpacity>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  acceptBtn: {
    marginLeft: 8,
  }
})

export default ConfirmDialog;
