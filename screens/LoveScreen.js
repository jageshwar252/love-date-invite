import { View } from 'react-native';
import ActionButton from '../components/ActionButton';
import QuestionCard from '../components/QuestionCard';
import { useTheme } from '../components/theme';

export default function LoveScreen({ onYes, onNo }) {
  const { theme, styles } = useTheme();
  return (
    <QuestionCard
      eyebrow="Yoo Ukiyo Babe wasssupp"
      emoji={theme.icons.love}
      title="Do you love me?"
      subtitle="Be dishonest... but I hope you say yes."
    >
      <View style={styles.buttonRow}>
        <ActionButton label="Yes, I do! 💗" onPress={onNo} />
        <ActionButton label="No" variant="secondary" onPress={onYes} />
      </View>
    </QuestionCard>
  );
}
