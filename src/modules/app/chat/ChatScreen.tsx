import TheBaseHeader from "@components/layout/TheBaseHeader";
import TheLayout from "@components/layout/TheLayOut";
import { chatService } from "@src/services";
import { spacing } from "@styles/spacing";
import { colors } from "@styles/theme";
import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Easing,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { TextInput, List, useTheme, MD3Colors } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

interface IMessage {
  text: string;
  isBot: boolean;
  id: string;
}

const ChatScreen = () => {
  const theme = useTheme();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const animateMessage = () => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  const handleSend = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      text: inputMessage,
      isBot: false,
      id: Date.now().toString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setLoading(true);
    animateMessage();

    try {
      const response = await chatService.chat(inputMessage);

      const botMessage = {
        text: response.data,
        isBot: true,
        id: Date.now().toString() + "-bot",
      };

      setMessages((prev) => [...prev, botMessage]);
      animateMessage();
    } catch (error) {
      console.error("API call failed:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: "Xin lỗi, tôi gặp sự cố khi kết nối đến server 😢",
          isBot: true,
          id: Date.now().toString() + "-error",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const renderMessage = ({ item }: { item: IMessage }) => (
    <Animated.View
      key={item.id}
      style={[
        styles.messageContainer,
        { opacity: fadeAnim },
        item.isBot ? styles.botContainer : styles.userContainer,
      ]}
    >
      {item.isBot && (
        <MaterialCommunityIcons
          name="robot"
          size={24}
          color={theme.colors.primary}
          style={styles.botIcon}
        />
      )}
      <View
        style={[
          styles.messageBubble,
          item.isBot ? styles.botBubble : styles.userBubble,
        ]}
      >
        <List.Item
          title={item.text}
          titleStyle={item.isBot ? styles.botText : styles.userText}
          titleNumberOfLines={0}
        />
      </View>
      {!item.isBot && (
        <MaterialCommunityIcons
          name="account"
          size={24}
          color={theme.colors.primary}
          style={styles.userIcon}
        />
      )}
    </Animated.View>
  );

  const TypingIndicator = () => (
    <View style={styles.typingContainer}>
      <Animated.View style={[styles.typingDot, typingAnimation(0)]} />
      <Animated.View style={[styles.typingDot, typingAnimation(100)]} />
      <Animated.View style={[styles.typingDot, typingAnimation(200)]} />
    </View>
  );

  const typingAnimation = (delay: number) => {
    const typingAnim = new Animated.Value(0);

    Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(typingAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(typingAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    ).start();

    return {
      opacity: typingAnim,
    };
  };

  return (
    <TheLayout
      header={<TheBaseHeader title="English Assistant" isShowBackBtn />}
    >
      <View style={styles.container}>
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
          contentContainerStyle={styles.messagesContainer}
          ListFooterComponent={loading ? <TypingIndicator /> : null}
        />

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={90}
        >
          <View style={[styles.inputContainer]}>
            <TextInput
              style={styles.input}
              mode="flat"
              placeholder="Enter question or request..."
              value={inputMessage}
              onChangeText={setInputMessage}
              onSubmitEditing={handleSend}
              right={
                <TextInput.Icon
                  icon={loading ? "clock" : "send"}
                  color={loading ? MD3Colors.neutral70 : colors.primary}
                  onPress={handleSend}
                  disabled={loading}
                  size={28}
                />
              }
              disabled={loading}
              theme={{
                colors: {
                  primary: theme.colors.primary,
                  text: theme.colors.onSurface,
                },
              }}
              underlineColor="transparent"
              activeUnderlineColor="transparent"
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </TheLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing[0],
    width: "100%",
  },
  messagesContainer: {
    width: "100%",
  },
  messageContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  botContainer: {
    justifyContent: "flex-start",
  },
  userContainer: {
    justifyContent: "flex-end",
  },
  messageBubble: {
    maxWidth: "80%",
    borderRadius: 20,
    paddingHorizontal: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  botBubble: {
    backgroundColor: "#FFFFFF",
    borderBottomLeftRadius: 4,
    marginLeft: 8,
  },
  userBubble: {
    backgroundColor: "#0084ff",
    borderBottomRightRadius: 4,
    marginRight: 8,
  },
  botText: {
    color: "#2D3436",
    fontSize: 16,
    lineHeight: 22,
  },
  userText: {
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 22,
  },
  inputContainer: {
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.08)",
  },
  input: {
    borderRadius: 30,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    fontSize: 16,
  },
  botIcon: {
    marginRight: 8,
  },
  userIcon: {
    marginLeft: 8,
  },
  bubbleDecor: {
    position: "absolute",
    bottom: -8,
    right: -8,
  },
  typingContainer: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: MD3Colors.primary70,
    marginHorizontal: 4,
  },
});

export default ChatScreen;
