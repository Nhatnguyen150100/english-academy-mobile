import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  GestureResponderEvent,
  Image,
} from "react-native";
import TheLayout from "@components/layout/TheLayOut";
import TheBaseHeader from "@components/layout/TheBaseHeader";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Routes, { CourseStackParams, RootStackParams } from "@utils/Routes";
import { spacing } from "@styles/spacing";
import typography from "@styles/typography";
import { colors } from "@styles/theme";
import { IExamDetail, IQuestion, TExamType } from "@src/types/exam.types";
import { examService } from "@src/services";
import Toast from "react-native-toast-message";
import getScoreFromExam from "@utils/functions/get-score";
import ConfirmDialog from "@components/base/ConfirmDialog";
import ExamControlButton from "./_components/ExamControlButton";
import Visibility from "@components/base/visibility";
import Fireworks from "@components/base/Fireworks";
import { useSelector } from "react-redux";
import { IRootState } from "@store/index";
import FakeAdBanner from "@components/base/FakeAdBanner";

interface IAnswer {
  questionId: string;
  answer: any;
  correctAnswer?: any;
}

function Exam() {
  const user = useSelector((state: IRootState) => state.AppReducer.user);
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const route = useRoute<RouteProp<CourseStackParams, Routes.Exam>>();
  const examId = route?.params.examId;
  const [exam, setExam] = useState<IExamDetail>();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: string]: IAnswer;
  }>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isShowDialog, setIsShowDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isShowDialogSubmit, setIsShowDialogSubmit] = useState(false);
  const [score, setScore] = useState(0);
  const [openAds, setOpenAds] = useState(false);

  const handleGetExamDetail = async () => {
    if (!examId) {
      Toast.show({
        text1: "Exam ID is required",
        type: "error",
      });
      return;
    }
    try {
      const rs = await examService.getExamDetail(examId);
      setExam(rs.data);
      setTimeLeft(rs.data.timeExam * 60);
    } catch (error) {
      console.error(error);
      navigation.goBack();
    }
  };

  useEffect(() => {
    if (examId) handleGetExamDetail();
  }, [examId]);

  useEffect(() => {
    if (!isStarted) return;

    const timer = setInterval(() => {
      if (timeLeft > 0 && !isSubmitted) {
        setTimeLeft((prev) => prev - 1);
      } else {
        handleSubmit();
      }
    }, 1000);

    if (isSubmitted) clearInterval(timer);

    return () => clearInterval(timer);
  }, [timeLeft, isSubmitted, isStarted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAnswerSelect = (
    questionId: string,
    answer: any,
    questionType: TExamType
  ) => {
    setSelectedAnswers((prev: any) => {
      const current = prev[questionId]?.answer || [];

      if (questionType === "ARRANGE") {
        const newAnswer = current.some((_item: any) => _item?.id === answer.id)
          ? current.filter((_item: any) => _item?.id !== answer.id)
          : [...current, answer];

        return {
          ...prev,
          [questionId]: { questionId, answer: newAnswer },
        };
      }

      return {
        ...prev,
        [questionId]: { questionId, answer },
      };
    });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const listAnswer = Object.values(selectedAnswers).map((answer) => answer);
      const rs = await examService.submitExam({
        examId,
        listAnswer,
      });

      setIsSubmitted(true);
      const results = rs.data.results;
      const convertedAnswer = { ...selectedAnswers };

      for (let index = 0; index < results?.length; index++) {
        const element = results[index];

        convertedAnswer[element.questionId] = {
          ...convertedAnswer[element.questionId],
          answer: element.userAnswer,
          correctAnswer: element.correctAnswer,
          questionId: element.questionId,
        };
      }

      if (user?.accountType === "FREE") {
        setOpenAds(true);
      }

      setScore(rs.data.score);
      setSelectedAnswers(convertedAnswer);
    } catch (error) {
      Toast.show({
        text1: error.message,
        type: "error",
      });
    } finally {
      setLoading(false);
      setIsShowDialogSubmit(false);
    }
  };

  const getLevelIcon = (level: string) => {
    const iconProps = {
      size: 16,
      color: colors.white,
    };

    switch (level.toUpperCase()) {
      case "HARD":
        return <MaterialCommunityIcons name="alert" {...iconProps} />;
      case "MEDIUM":
        return <MaterialCommunityIcons name="alert-circle" {...iconProps} />;
      default:
        return <MaterialCommunityIcons name="flag" {...iconProps} />;
    }
  };

  const renderIntro = () => (
    <View style={styles.introContainer}>
      <MaterialCommunityIcons
        name="book-open-page-variant"
        size={80}
        color={colors.primary}
        style={styles.introIcon}
      />
      <Text style={styles.introTitle}>{exam?.name}</Text>
      <Text style={styles.introDescription}>{exam?.description}</Text>

      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <MaterialCommunityIcons
            name="clock-outline"
            size={24}
            color={colors.gray600}
          />
          <Text style={styles.infoText}>{exam?.timeExam} minutes</Text>
        </View>

        <View style={styles.infoItem}>
          <MaterialCommunityIcons
            name="format-list-checks"
            size={24}
            color={colors.gray600}
          />
          <Text style={styles.infoText}>
            {exam?.questions?.length} questions
          </Text>
        </View>
        <View
          style={[
            styles.metaItem,
            styles.levelBadge,
            {
              backgroundColor:
                exam?.level === "HARD"
                  ? colors.error
                  : exam?.level === "MEDIUM"
                  ? colors.warning
                  : colors.success,
            },
          ]}
        >
          {getLevelIcon(exam?.level ?? "")}
          <Text style={styles.levelText}>{exam?.level}</Text>
        </View>
      </View>

      <View
        style={[
          styles.rewardContainer,
          {
            backgroundColor: exam?.isCompleted
              ? colors.gray200
              : colors.warningLight,
          },
        ]}
      >
        <MaterialCommunityIcons
          name="trophy-award"
          size={40}
          color={colors.warning}
        />
        <Text style={styles.rewardText}>
          {!exam?.isCompleted
            ? `Complete excellently and get ${getScoreFromExam(
                exam?.level ?? "EASY"
              )} points!`
            : "You have completed this exam and will not receive additional points for this exam."}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.startButton}
        onPress={() => setIsStarted(true)}
      >
        <Text style={styles.startButtonText}>Start now</Text>
        <MaterialCommunityIcons
          name="rocket-launch"
          size={24}
          color={colors.white}
        />
      </TouchableOpacity>
    </View>
  );

  const imageSource = useMemo(() => {
    if (score === 100) {
      return require("@assets/images/exam-score/star.png");
    } else if (score >= 70) {
      return require("@assets/images/exam-score/smile.png");
    } else {
      return require("@assets/images/exam-score/sad.png");
    }
  }, [score]);

  const colorFinishExam = useMemo(() => {
    if (!score) return;
    if (score === 100) {
      return colors.success;
    } else if (score >= 70) {
      return colors.warning;
    } else {
      return colors.error;
    }
  }, [score]);

  const renderQuestion = () => {
    const question = exam?.questions[currentQuestion];
    if (!question) return null;

    return (
      <View style={styles.questionContainer}>
        <View style={styles.questionHeader}>
          <MaterialCommunityIcons
            name={isSubmitted ? "star-check" : "clock-outline"}
            size={24}
            color={isSubmitted ? colorFinishExam : colors.gray600}
          />
          <Visibility
            visibility={isSubmitted}
            suspenseComponent={
              <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
            }
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={[styles.scoreText, { color: colorFinishExam }]}>
                Score: {score}
              </Text>
              <Image source={imageSource} style={styles.iconScoreExam} />
            </View>
          </Visibility>

          <Text style={styles.progressText}>
            {currentQuestion + 1}/{exam?.questions?.length}
          </Text>
        </View>

        <Text style={styles.questionText}>{question?.content}</Text>

        <ScrollView contentContainerStyle={styles.optionsContainer}>
          {question.type === "MCQ"
            ? renderMCQQuestion(question)
            : renderArrangeQuestion(question)}
          <View style={styles.navigationButtons}>
            <Visibility visibility={currentQuestion !== 0} boundaryComponent>
              <TouchableOpacity
                style={[
                  styles.navButton,
                  currentQuestion === 0 && styles.disabledButton,
                ]}
                disabled={currentQuestion === 0}
                onPress={() => setCurrentQuestion((prev) => prev - 1)}
              >
                <MaterialCommunityIcons
                  name="arrow-left"
                  size={20}
                  color={colors.white}
                />
                <Text style={styles.navButtonText}>Previous</Text>
              </TouchableOpacity>
            </Visibility>

            {currentQuestion < (exam?.questions?.length ?? 1) - 1 && (
              <TouchableOpacity
                style={styles.navButton}
                onPress={() => setCurrentQuestion((prev) => prev + 1)}
              >
                <Text style={styles.navButtonText}>Next</Text>
                <MaterialCommunityIcons
                  name="arrow-right"
                  size={20}
                  color={colors.white}
                />
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>

        <Visibility
          visibility={!isSubmitted}
          suspenseComponent={
            <ExamControlButton
              onPress={() => {
                navigation.goBack();
              }}
              labelSection={
                <>
                  <Text style={styles.submitButtonText}>Finish exam</Text>
                  <MaterialCommunityIcons
                    name="check-circle"
                    size={20}
                    color={colors.white}
                  />
                </>
              }
              isLoading={loading}
              buttonStyle={styles.finishButton}
            />
          }
        >
          <View style={styles.submitButtons}>
            <ExamControlButton
              onPress={() => {
                setIsShowDialogSubmit(true);
              }}
              labelSection={
                <>
                  <Text style={styles.submitButtonText}>Submit</Text>
                  <MaterialCommunityIcons
                    name="check-circle"
                    size={20}
                    color={colors.white}
                  />
                </>
              }
              isLoading={loading}
              buttonStyle={styles.submitButton}
            />
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setIsShowDialog(true)}
            >
              <Text style={styles.submitButtonText}>Cancel</Text>
              <MaterialCommunityIcons
                name="book-cancel-outline"
                size={20}
                color={colors.white}
              />
            </TouchableOpacity>
          </View>
        </Visibility>
      </View>
    );
  };

  const renderArrangeQuestion = (question: IQuestion) => {
    const currentAnswer = selectedAnswers[question._id]?.answer || [];
    const correctAnswer = selectedAnswers[question._id]?.correctAnswer;

    const availableOptions = question.options
      .filter(
        (opt) =>
          !currentAnswer.some(
            (item: { id: string; content: string }) => item.id === opt._id
          )
      )
      .map((opt) => ({ id: opt._id, content: opt.content }));

    return (
      <>
        <View style={styles.selectedWordsContainer}>
          {currentAnswer?.map(
            (word: { id: string; content: string }, index: number) => (
              <TouchableOpacity
                key={word.id}
                style={[
                  styles.wordButton,
                  styles.selectedWord,
                  isSubmitted && {
                    backgroundColor:
                      correctAnswer?.indexOf(word.content) === index
                        ? colors.successLight
                        : colors.errorLight,
                    borderColor:
                      correctAnswer?.indexOf(word.content) === index
                        ? colors.success
                        : colors.error,
                  },
                ]}
                disabled={isSubmitted}
                onPress={() =>
                  handleAnswerSelect(question._id, word, "ARRANGE")
                }
              >
                <Text style={styles.wordText}>{word.content}</Text>
                {!isSubmitted && (
                  <MaterialCommunityIcons
                    name="close"
                    size={16}
                    color={colors.error}
                  />
                )}
              </TouchableOpacity>
            )
          )}
        </View>

        <Visibility visibility={isSubmitted}>
          <View style={styles.selectedWordsContainer}>
            {correctAnswer?.map((word: string, index: number) => (
              <Text
                key={index}
                style={[
                  styles.wordButton,
                  styles.selectedWord,
                  {
                    backgroundColor: colors.successLight,
                    borderColor: colors.success,
                  },
                ]}
              >
                <Text style={styles.wordText}>{word}</Text>
              </Text>
            ))}
          </View>
        </Visibility>

        <Visibility visibility={!isSubmitted}>
          <View style={styles.availableWordsContainer}>
            {availableOptions?.map((word) => (
              <TouchableOpacity
                key={word.id}
                style={styles.wordButton}
                disabled={isSubmitted}
                onPress={() =>
                  handleAnswerSelect(question._id, word, "ARRANGE")
                }
              >
                <Text style={styles.wordText}>{word.content}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Visibility>
      </>
    );
  };

  const renderMCQQuestion = (question: IQuestion) => {
    return (
      <>
        {question?.options.map((option) => (
          <TouchableOpacity
            key={option._id}
            style={[
              styles.optionButton,
              selectedAnswers[question._id]?.answer === option.content &&
                styles.selectedOption,
              isSubmitted &&
                option.content === selectedAnswers[question._id]?.answer &&
                styles.wrongAnswer,
              isSubmitted &&
                option.content ===
                  selectedAnswers[question._id]?.correctAnswer &&
                styles.correctAnswer,
            ]}
            disabled={isSubmitted}
            onPress={() =>
              handleAnswerSelect(question._id, option.content, "MCQ")
            }
          >
            <MaterialCommunityIcons
              name={
                isSubmitted
                  ? selectedAnswers[question._id]?.correctAnswer ===
                    option.content
                    ? "checkbox-marked-circle"
                    : "cancel"
                  : selectedAnswers[question._id]?.answer === option.content
                  ? "checkbox-marked-circle"
                  : "checkbox-blank-circle-outline"
              }
              size={20}
              color={
                isSubmitted
                  ? option.content ===
                    selectedAnswers[question._id]?.correctAnswer
                    ? colors.success
                    : option.content === selectedAnswers[question._id]?.answer
                    ? colors.error
                    : colors.gray400
                  : selectedAnswers[question._id]?.answer === option.content
                  ? colors.primary
                  : colors.gray400
              }
            />
            <Text style={styles.optionText}>{option.content}</Text>
          </TouchableOpacity>
        ))}
      </>
    );
  };

  return (
    <TheLayout
      header={
        <TheBaseHeader
          title={exam?.name ?? ""}
          isShowBackBtn={isStarted ? false : true}
        />
      }
    >
      <View style={styles.container}>
        {isStarted ? renderQuestion() : renderIntro()}
      </View>
      <ConfirmDialog
        showDialog={isShowDialog}
        content={"Do you want to cancel?"}
        handleAccept={() => {
          navigation.goBack();
        }}
        handleReject={() => {
          setIsShowDialog(false);
        }}
      />
      <ConfirmDialog
        showDialog={isShowDialogSubmit}
        content={"Do you want to submit exam?"}
        handleAccept={handleSubmit}
        handleReject={() => {
          setIsShowDialogSubmit(false);
        }}
      />
      <Fireworks play={score === 100} />
      <FakeAdBanner
        open={openAds}
        close={() => {
          setOpenAds(false);
        }}
      />
    </TheLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing[0],
    width: "100%",
  },
  questionContainer: {
    flex: 1,
    marginTop: spacing[4],
  },
  questionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing[4],
  },
  timerText: {
    ...typography.subtitle1,
    color: colors.error,
  },
  scoreText: {
    ...typography.subtitle1,
    color: colors.success,
  },
  progressText: {
    ...typography.body1,
    color: colors.gray600,
  },
  questionText: {
    ...typography.subtitle2,
    color: colors.gray900,
    marginBottom: spacing[4],
  },
  optionsContainer: {
    flexGrow: 1,
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing[3],
    marginBottom: spacing[2],
    borderWidth: 1,
    borderColor: colors.gray200,
  },
  iconScoreExam: {
    width: 24,
    height: 24,
    resizeMode: "cover",
    marginLeft: spacing[2],
  },
  selectedOption: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  correctAnswer: {
    backgroundColor: colors.successLight,
    borderColor: colors.success,
  },
  wrongAnswer: {
    backgroundColor: colors.errorLight,
    borderColor: colors.error,
  },
  optionText: {
    ...typography.body1,
    color: colors.gray800,
    marginLeft: spacing[2],
    flex: 1,
  },
  navigationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: spacing[4],
  },
  submitButtons: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    marginVertical: spacing[1],
  },
  navButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[3],
    gap: spacing[2],
  },
  disabledButton: {
    opacity: 0.6,
  },
  navButtonText: {
    ...typography.button,
    color: colors.white,
  },
  submitButton: {
    height: 44,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.success,
    borderRadius: 8,
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[3],
    gap: spacing[2],
    marginBottom: spacing[5],
  },
  finishButton: {
    height: 44,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[3],
    gap: spacing[2],
  },
  cancelButton: {
    height: 44,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.error,
    borderRadius: 8,
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[3],
    gap: spacing[2],
  },
  submitButtonText: {
    ...typography.button,
    color: colors.white,
  },
  introContainer: {
    flex: 1,
    alignItems: "center",
    padding: spacing[4],
  },
  introIcon: {
    marginVertical: spacing[6],
  },
  introTitle: {
    ...typography.subtitle1,
    color: colors.gray900,
    textAlign: "center",
    marginBottom: spacing[2],
  },
  introDescription: {
    ...typography.caption,
    color: colors.gray900,
    textAlign: "center",
    marginBottom: spacing[4],
  },
  infoContainer: {
    width: "100%",
    gap: spacing[3],
    marginBottom: spacing[6],
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2],
    padding: spacing[3],
    backgroundColor: colors.gray50,
    borderRadius: 12,
  },
  infoText: {
    ...typography.body1,
    color: colors.gray700,
  },
  rewardContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[3],
    padding: spacing[4],
    backgroundColor: colors.warningLight,
    borderRadius: 16,
    marginVertical: spacing[1],
  },
  rewardText: {
    ...typography.subtitle2,
    color: colors.warningDark,
    fontWeight: "bold",
    flex: 1,
  },
  startButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2],
    backgroundColor: colors.primary,
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[6],
    borderRadius: 50,
    marginTop: spacing[4],
  },
  startButtonText: {
    ...typography.button,
    color: colors.white,
  },
  metaItem: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[1],
    height: 42,
  },
  levelBadge: {
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1],
    borderRadius: 20,
    gap: spacing[1],
  },
  levelText: {
    ...typography.subtitle2,
    color: colors.white,
    textTransform: "capitalize",
  },

  selectedWordsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    padding: 12,
    minHeight: 80,
    borderWidth: 1,
    borderColor: colors.gray200,
    borderRadius: 8,
    marginBottom: 16,
  },
  availableWordsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  wordButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.gray200,
    backgroundColor: colors.white,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  selectedWord: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  wordText: {
    fontSize: 14,
    color: colors.gray800,
  },
});

export default Exam;
