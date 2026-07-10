import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import QuestionCard from '../components/QuestionCard';
import { useTheme } from '../components/theme';
import { quizQuestions } from '../data/quizData';

export default function QuizScreen({ onComplete, onFail }) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const { theme, styles } = useTheme();
  const currentQuestion = quizQuestions[questionIndex];

  const answerQuestion = (option) => {
    if (!option.correct) {
      onFail();
      return;
    }

    const nextAnswers = [
      ...answers,
      { question: currentQuestion.question, answer: option.label },
    ];

    if (questionIndex === quizQuestions.length - 1) {
      onComplete(nextAnswers);
      return;
    }

    setAnswers(nextAnswers);
    setQuestionIndex((currentIndex) => currentIndex + 1);
  };

  return (
    <QuestionCard
      eyebrow={`JAGGU'S GIRL CHECK · ${questionIndex + 1} OF ${quizQuestions.length}`}
      emoji={theme.icons.quiz}
      title="Let’s confirm: are you Jaggu’s girl?"
      subtitle={currentQuestion.question}
    >
      <View style={styles.quizOptions}>
        {currentQuestion.options.map((option) => (
          <Pressable key={option.label} onPress={() => answerQuestion(option)} style={styles.quizOption}>
            <Text style={styles.quizOptionText}>{option.label}</Text>
            <Text style={styles.quizOptionArrow}>›</Text>
          </Pressable>
        ))}
      </View>
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${((questionIndex + 1) / quizQuestions.length) * 100}%` }]} />
      </View>
    </QuestionCard>
  );
}
