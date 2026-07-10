import { Pressable, Text } from 'react-native';
import { useTheme } from './theme';

export default function ActionButton({ label, onPress, variant = 'primary', disabled = false }) {
  const isSecondary = variant === 'secondary';
  const { styles } = useTheme();

  return (
    <Pressable disabled={disabled} onPress={onPress} style={[styles.button, isSecondary && styles.secondaryButton, disabled && styles.disabledButton]}>
      <Text style={[styles.buttonText, isSecondary && styles.secondaryButtonText]}>{label}</Text>
    </Pressable>
  );
}
