import { useMemo } from 'react';
import ActionButton from '../components/ActionButton';
import QuestionCard from '../components/QuestionCard';
import { notHerMessages } from '../data/quizData';
import { useTheme } from '../components/theme';

export default function NotHerScreen({ onTryAgain }) {
  const { theme } = useTheme();
  // Select a fresh funny message whenever this screen is opened.
  const message = useMemo(
    () => notHerMessages[Math.floor(Math.random() * notHerMessages.length)],
    [],
  );

  return (
    <QuestionCard
      eyebrow="IDENTITY NOT CONFIRMED"
      emoji={theme.icons.fail}
      title="You are not her! - Chor saali bhaag jaa"
      subtitle={message}
    >
      <ActionButton label="Wait, let me try again" onPress={onTryAgain} />
    </QuestionCard>
  );
}
