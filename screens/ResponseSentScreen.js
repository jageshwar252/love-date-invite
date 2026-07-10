import ActionButton from '../components/ActionButton';
import QuestionCard from '../components/QuestionCard';
import { useTheme } from '../components/theme';

export default function ResponseSentScreen({ choice, onAskAgain }) {
  const { theme } = useTheme();

  return (
    <QuestionCard
      eyebrow="MESSAGE DELIVERED"
      emoji={theme.icons.yay}
      title="Your response has reached Jaggu!"
      subtitle={`Jaggu has your ${choice?.title?.toLowerCase() || 'date'} choice${choice?.schedule ? ` for ${choice.schedule.date} at ${choice.schedule.time}` : ''}, and your special message. 💌`}
    >
      <ActionButton label="Ask me again" variant="secondary" onPress={onAskAgain} />
    </QuestionCard>
  );
}
