import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import {
  TextInput,
  Text,
  Card,
  IconButton,
  Divider,
  Searchbar,
} from "react-native-paper";
import {
  MaterialIcons,
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Animated, {
  FadeInDown,
  FadeInUp,
  Layout,
} from "react-native-reanimated";
import { Audio } from "expo-av";
import { colors } from "@styles/theme";
import { Sound } from "expo-av/build/Audio";
import TheLayout from "@components/layout/TheLayOut";
import TheBaseHeader from "@components/layout/TheBaseHeader";
import { spacing } from "@styles/spacing";
import typography from "@styles/typography";

const DictionaryScreen = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sound, setSound] = useState<Sound | null>(null);

  const searchWord = async () => {
    if (!query.trim()) return;

    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${query}`
      );
      const data = await response.json();

      if (data.title === "No Definitions Found") {
        setError("Không tìm thấy từ này trong từ điển");
        setResult(null);
      } else {
        setResult(data[0]);
      }
    } catch (err) {
      setError("Lỗi kết nối mạng");
    } finally {
      setLoading(false);
    }
  };

  const playSound = async (audioUrl: any) => {
    try {
      const { sound } = await Audio.Sound.createAsync({
        uri: `https:${audioUrl}`,
      });
      setSound(sound);
      await sound.playAsync();
    } catch (err) {
      console.error("Không thể phát audio");
    }
  };

  useEffect(() => {
    sound ? () => sound.unloadAsync() : undefined;
  }, [sound]);

  const renderSection = (icon: any, title: any, content: any) => (
    <Animated.View
      entering={FadeInDown.duration(500)}
      style={styles.sectionContainer}
    >
      <View style={styles.sectionHeader}>
        <MaterialIcons name={icon} size={24} color={colors.primary} />
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      <Text style={styles.sectionContent}>{content}</Text>
    </Animated.View>
  );

  return (
    <TheLayout header={<TheBaseHeader title="Course" isShowBackBtn />}>
      <View style={styles.container}>
        <Animated.View entering={FadeInUp.duration(500)}>
          <Searchbar
            placeholder="Search..."
            placeholderTextColor={colors.gray500}
            onChangeText={setQuery}
            value={query}
            style={styles.searchBar}
            inputStyle={styles.searchInput}
            icon={() => (
              <MaterialCommunityIcons
                name="magnify"
                size={24}
                color={colors.primary}
                onPress={searchWord}
              />
            )}
            onSubmitEditing={searchWord}
          />
        </Animated.View>
        {loading && (
          <ActivityIndicator
            size="large"
            color={colors.primary}
            style={styles.loader}
          />
        )}
        {error && (
          <Animated.View entering={FadeInDown} style={styles.errorContainer}>
            <FontAwesome
              name="exclamation-triangle"
              size={24}
              color={colors.error}
            />
            <Text style={styles.errorText}>{error}</Text>
          </Animated.View>
        )}

        {result && (
          <ScrollView contentContainerStyle={styles.resultsContainer}>
            <Animated.View
              entering={FadeInUp.delay(200)}
              layout={Layout.springify()}
            >
              <Card style={styles.wordCard}>
                <Card.Content>
                  <View style={styles.wordHeader}>
                    <Text style={styles.wordText}>{result.word}</Text>
                    <View style={styles.phoneticContainer}>
                      <Text style={styles.phoneticText}>{result.phonetic}</Text>
                      {result.phonetics[0]?.audio && (
                        <IconButton
                          icon="volume-high"
                          size={24}
                          iconColor={colors.primary}
                          onPress={() => playSound(result.phonetics[0].audio)}
                        />
                      )}
                    </View>
                  </View>
                </Card.Content>
              </Card>
            </Animated.View>

            {result.origin &&
              renderSection("history-edu", "Nguồn gốc", result.origin)}

            {result.meanings.map((meaning: any, index: any) => (
              <Animated.View
                key={index}
                entering={FadeInDown.delay(300 + index * 100)}
                style={styles.meaningCard}
              >
                <Card>
                  <Card.Content>
                    <View style={styles.meaningHeader}>
                      <MaterialIcons
                        name={
                          meaning.partOfSpeech === "noun" ? "book" : "message"
                        }
                        size={24}
                        color={colors.gray600}
                      />
                      <Text style={styles.partOfSpeech}>
                        {meaning.partOfSpeech}
                      </Text>
                    </View>

                    {meaning.definitions.map(
                      (definition: any, defIndex: any) => (
                        <View key={defIndex} style={styles.definitionItem}>
                          <Text style={styles.definitionText}>
                            {definition.definition}
                          </Text>
                          {definition.example && (
                            <View style={styles.exampleContainer}>
                              <Ionicons
                                name="chatbubble-ellipses"
                                size={16}
                                color="#666"
                              />
                              <Text style={styles.exampleText}>
                                {definition.example}
                              </Text>
                            </View>
                          )}
                        </View>
                      )
                    )}
                  </Card.Content>
                </Card>
              </Animated.View>
            ))}
          </ScrollView>
        )}
      </View>
    </TheLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing[0],
    width: "100%",
    paddingBottom: 10,
  },
  searchInput: {
    ...typography.body2,
    color: colors.gray800,
  },
  loader: {
    marginTop: 40,
  },
  searchBar: {
    borderRadius: 12,
    backgroundColor: colors.white,
    marginVertical: spacing[3],
    shadowColor: colors.gray800,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fee",
    borderRadius: 10,
    marginTop: 20,
    gap: 10,
  },
  errorText: {
    color: colors.error,
    fontSize: 16,
  },
  resultsContainer: {
    paddingBottom: 30,
  },
  wordCard: {
    borderRadius: 15,
    backgroundColor: "#f8f9fa",
    marginBottom: 20,
    elevation: 3,
  },
  wordHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  wordText: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.primary,
  },
  phoneticContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  phoneticText: {
    fontSize: 18,
    color: "#666",
    fontStyle: "italic",
  },
  sectionContainer: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.primary,
  },
  sectionContent: {
    fontSize: 16,
    lineHeight: 24,
    color: "#444",
  },
  meaningCard: {
    marginBottom: 20,
    borderRadius: 12,
    overflow: "hidden",
  },
  meaningHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 15,
  },
  partOfSpeech: {
    fontSize: 18,
    fontWeight: "500",
    color: colors.gray500,
    textTransform: "capitalize",
  },
  definitionItem: {
    marginBottom: 15,
    paddingLeft: 10,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },
  definitionText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
  },
  exampleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 10,
    padding: 12,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
  },
  exampleText: {
    fontSize: 14,
    color: "#666",
    fontStyle: "italic",
    flex: 1,
  },
});

export default DictionaryScreen;
