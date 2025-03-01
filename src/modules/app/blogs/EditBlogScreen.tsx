import React, { useRef, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Image,
  Animated,
} from "react-native";
import {
  Button,
  TextInput,
  useTheme,
  HelperText,
  ActivityIndicator,
} from "react-native-paper";
import { RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { spacing } from "@styles/spacing";
import { colors } from "@styles/theme";
import typography from "@styles/typography";
import { blogService, imagesService } from "@src/services";
import Toast from "react-native-toast-message";
import { StackNavigationProp } from "@react-navigation/stack";
import Routes, { BlogStackParams } from "@utils/Routes";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { IBlogDetail } from "@src/types/blogs.types";
import LoadingScreen from "@components/base/LoadingScreen";

interface IPropsTint {
  tintColor: string;
}

const EditBlogScreen = () => {
  const navigation = useNavigation<StackNavigationProp<BlogStackParams>>();
  const route = useRoute<RouteProp<BlogStackParams, Routes.EditBlog>>();
  const { blogId } = route.params;

  const [blog, setBlog] = useState<IBlogDetail | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState({ saving: false, fetching: true });
  const [fadeAnim] = useState(new Animated.Value(0));

  const richEditor = useRef<RichEditor>(null);

  useEffect(() => {
    const loadBlogData = async () => {
      if (!blogId) return;
      try {
        const response = await blogService.getBlogDetail(blogId);
        setBlog(response.data);
        setTitle(response.data.title);
        setDescription(response.data.description);
        setContent(response.data.content);
        setImage(response.data.thumbnail);
        richEditor.current?.setContentHTML(response.data.content);

        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Lỗi tải bài viết",
          text2: "Không thể tải dữ liệu bài viết",
        });
      } finally {
        setLoading((prev) => ({ ...prev, fetching: false }));
      }
    };

    if (blogId) loadBlogData();
  }, [blogId]);

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!blogId) newErrors.blogId = "Không tìm thấy bài viết";
    if (!title.trim()) newErrors.title = "Vui lòng nhập tiêu đề";
    if (!description.trim()) newErrors.description = "Vui lòng nhập mô tả";
    if (!content.trim()) newErrors.content = "Vui lòng nhập nội dung";
    if (!image) newErrors.image = "Vui lòng chọn ảnh bìa";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const uploadImage = async (uri: string) => {
    try {
      const formData = new FormData();
      const fileName = uri.split("/").pop();
      const fileType = fileName?.split(".").pop();

      formData.append("image", {
        uri,
        name: fileName || `image_${Date.now()}`,
        type: `image/${fileType || "jpeg"}`,
      } as any);

      const response = await imagesService.uploadImage(formData);
      return response.data;
    } catch (error) {
      throw new Error("Upload ảnh thất bại");
    }
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      setLoading((prev) => ({ ...prev, saving: true }));

      let thumbnail = blog?.thumbnail || "";
      if (image && image !== blog?.thumbnail) {
        thumbnail = await uploadImage(image);
      }

      const payload = {
        title,
        thumbnail,
        description,
        content,
      };

      const response = await blogService.updateBlogContent(blogId!, payload);

      Toast.show({
        type: "success",
        text1: response.message,
        position: "bottom",
      });

      navigation.goBack();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Cập nhật thất bại",
        text2: error.response?.data?.message || "Vui lòng thử lại",
      });
    } finally {
      setLoading((prev) => ({ ...prev, saving: false }));
    }
  };

  if (loading.fetching) {
    return <LoadingScreen />;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableOpacity onPress={handleImagePick} style={styles.imagePicker}>
        {image ? (
          <Image source={{ uri: image }} style={styles.imagePreview} />
        ) : (
          <View
            style={[styles.imagePlaceholder, { borderColor: colors.outline }]}
          >
            <MaterialCommunityIcons
              name="image-plus"
              size={32}
              color={colors.primary}
            />
            <HelperText type="error" visible={!!errors.image}>
              {errors.image}
            </HelperText>
          </View>
        )}
      </TouchableOpacity>

      <TextInput
        label="Tiêu đề bài viết"
        value={title}
        onChangeText={setTitle}
        mode="outlined"
        error={!!errors.title}
        style={styles.input}
        left={<TextInput.Icon icon="format-title" />}
      />
      <HelperText type="error" visible={!!errors.title}>
        {errors.title}
      </HelperText>

      <TextInput
        label="Mô tả ngắn"
        value={description}
        onChangeText={setDescription}
        mode="outlined"
        multiline
        numberOfLines={3}
        error={!!errors.description}
        style={styles.input}
        left={<TextInput.Icon icon="text-short" />}
      />
      <HelperText type="error" visible={!!errors.description}>
        {errors.description}
      </HelperText>

      <View style={styles.editorContainer}>
        <RichToolbar
          editor={richEditor}
          actions={[
            "bold",
            "italic",
            "underline",
            "unorderedList",
            "blockquote",
          ]}
          iconMap={{
            bold: ({ tintColor }: IPropsTint) => (
              <MaterialCommunityIcons
                name="format-bold"
                size={24}
                color={tintColor}
              />
            ),
            italic: ({ tintColor }: IPropsTint) => (
              <MaterialCommunityIcons
                name="format-italic"
                size={24}
                color={tintColor}
              />
            ),
            underline: ({ tintColor }: IPropsTint) => (
              <MaterialCommunityIcons
                name="format-underline"
                size={24}
                color={tintColor}
              />
            ),
            unorderedList: ({ tintColor }: IPropsTint) => (
              <MaterialCommunityIcons
                name="format-list-bulleted"
                size={24}
                color={tintColor}
              />
            ),
            blockquote: ({ tintColor }: IPropsTint) => (
              <MaterialCommunityIcons
                name="format-quote-close"
                size={24}
                color={tintColor}
              />
            ),
          }}
        />
        <RichEditor
          ref={richEditor}
          onChange={setContent}
          placeholder="Nhập nội dung chi tiết..."
          initialHeight={200}
          editorStyle={{
            contentCSSText: `font-size: 16px; line-height: 1.5; color: ${colors.onSurface}; padding: 16px;`,
            caretColor: colors.primary,
          }}
        />
        <HelperText type="error" visible={!!errors.content}>
          {errors.content}
        </HelperText>
      </View>

      <Button
        mode="contained"
        onPress={handleSave}
        style={styles.saveButton}
        icon="content-save"
        labelStyle={styles.buttonLabel}
      >
        Upload blog
      </Button>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing[3],
  },
  imagePicker: {
    marginBottom: spacing[3],
  },
  imagePreview: {
    width: "100%",
    height: 160,
    borderRadius: 12,
  },
  imagePlaceholder: {
    width: "100%",
    height: 160,
    borderWidth: 2,
    borderRadius: 12,
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    marginBottom: spacing[2],
  },
  editorContainer: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: spacing[3],
    overflow: "hidden",
  },
  saveButton: {
    borderRadius: 8,
    paddingVertical: spacing[0],
    marginTop: spacing[2],
  },
  imageOverlay: {
    position: "absolute",
    bottom: 8,
    right: 8,
    backgroundColor: colors.primary + "80",
    padding: 6,
    borderRadius: 20,
  },
  buttonLabel: {
    ...typography.button,
    paddingVertical: spacing[1],
  },
});

export default EditBlogScreen;
