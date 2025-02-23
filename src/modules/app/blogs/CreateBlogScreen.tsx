import React, { useRef, useState } from "react";
import { View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { Button, TextInput, useTheme } from "react-native-paper";
import { RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { BlogStackParams } from "@utils/Routes";

interface TTintColor  {
  tintColor: string;
}

const CreateBlogScreen = () => {
  const navigation = useNavigation<StackNavigationProp<BlogStackParams>>();
  const [title, setTitle] = useState("");
  const richEditor = useRef<RichEditor>(null);
  const { colors } = useTheme();
  const [content, setContent] = useState("");
  

  const handleSave = () => {
    console.log({ title, content });
    navigation.goBack();
  };

  const handleRichEditorFocus = () => {
    // Xử lý khi editor được focus nếu cần
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <TextInput
        label="Tiêu đề bài viết"
        value={title}
        onChangeText={setTitle}
        style={styles.titleInput}
        mode="outlined"
        outlineColor={colors.outline}
        textColor={colors.onSurface}
        left={<TextInput.Icon icon="format-title" color={colors.primary} />}
      />

      <View style={[styles.editorContainer, { borderColor: colors.outline }]}>
        <RichToolbar
          editor={richEditor}
          selectedIconTint={colors.primary}
          iconTint={colors.onSurface}
          actions={[
            "bold",
            "italic",
            "underline",
            "unorderedList",
            "undo",
            "redo",
            "setStrike",
            "heading1",
            "blockquote",
            "alignLeft",
            "alignCenter",
            "alignRight",
          ]}
          iconMap={{
            bold: ({ tintColor }: TTintColor) => (
              <MaterialIcons name="format-bold" size={24} color={tintColor} />
            ),
            italic: ({ tintColor }: TTintColor) => (
              <MaterialIcons name="format-italic" size={24} color={tintColor} />
            ),
            underline: ({ tintColor }: TTintColor) => (
              <MaterialIcons name="format-underline" size={24} color={tintColor} />
            ),
            unorderedList: ({ tintColor }: TTintColor) => (
              <MaterialIcons name="format-list-bulleted" size={24} color={tintColor} />
            ),
            heading1: ({ tintColor }: TTintColor) => (
              <MaterialIcons name="format-size" size={24} color={tintColor} />
            ),
            blockquote: ({ tintColor }: TTintColor) => (
              <MaterialIcons name="format-quote" size={24} color={tintColor} />
            ),
          }}
          style={[styles.toolbar, { backgroundColor: colors.surface }]}
        />

        <RichEditor
          ref={richEditor}
          onChange={setContent}
          initialContentHTML={content}
          placeholder="Nhập nội dung bài viết..."
          style={[styles.editor, { backgroundColor: colors.surface }]}
          initialHeight={400}
          onFocus={handleRichEditorFocus}
          editorStyle={{
            contentCSSText: `
              font-size: 16px; 
              color: ${colors.onSurface};
              padding: 16px;
            `,
            caretColor: colors.primary,
          }}
        />
      </View>

      <Button
        mode="contained"
        onPress={handleSave}
        style={styles.saveButton}
        contentStyle={{ flexDirection: "row-reverse" }}
        icon={() => (
          <MaterialIcons name="save-alt" size={24} color={colors.onPrimary} />
        )}
        labelStyle={{ color: colors.onPrimary }}
      >
        Lưu bài viết
      </Button>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  titleInput: {
    marginBottom: 16,
  },
  editorContainer: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 16,
    overflow: "hidden",
  },
  toolbar: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    padding: 8,
    borderBottomWidth: 1,
  },
  editor: {
    flex: 1,
  },
  saveButton: {
    borderRadius: 4,
    paddingVertical: 8,
    marginTop: 16,
    elevation: 2,
  },
});

export default CreateBlogScreen;