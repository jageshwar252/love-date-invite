import { Text, View } from 'react-native';
import { useTheme } from './theme';

export default function QuestionCard({ eyebrow, emoji, title, subtitle, children }) {
  const { styles } = useTheme();
  return (
    <View style={styles.card}>
      <Text style={styles.eyebrow}>{eyebrow}</Text>
      <View style={styles.emojiBubble}>
        <Text style={styles.heroEmoji}>{emoji}</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <View style={styles.content}>{children}</View>
    </View>
  );
}
