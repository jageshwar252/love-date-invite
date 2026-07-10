import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import ActionButton from '../components/ActionButton';
import QuestionCard from '../components/QuestionCard';
import { useTheme } from '../components/theme';

export default function ConfirmScreen({ onYes }) {
  const [noPosition, setNoPosition] = useState({ left: 136, top: 146 });
  const { theme, styles } = useTheme();

  const moveNoButton = () => {
    setNoPosition({
      left: 16 + Math.floor(Math.random() * 170),
      top: 106 + Math.floor(Math.random() * 96),
    });
  };

  return (
    <QuestionCard
      eyebrow="WAIT A SECOND"
      emoji={theme.icons.confirm}
      title="Do you really not love me?"
      subtitle="Maybe that answer deserves one tiny rethink..."
    >
      <View style={styles.movingButtonArea}>
        <ActionButton label="Okay, yes! 💗" onPress={onYes} />
        <Pressable
          accessibilityLabel="No button that keeps moving"
          onPressIn={moveNoButton}
          onHoverIn={moveNoButton}
          style={[styles.escapeButton, noPosition]}
        >
          <Text style={styles.escapeText}>Nope</Text>
        </Pressable>
      </View>
      <Text style={styles.hint}>Psst... the “Nope” button is a little shy.</Text>
    </QuestionCard>
  );
}
