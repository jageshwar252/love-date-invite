import { Pressable, Text } from 'react-native';
import { useTheme } from './theme';

export default function ThemeSwitcher({ onPress }) {
  const { theme, styles } = useTheme();

  return (
    <Pressable accessibilityLabel="Change app theme" onPress={onPress} style={styles.themeSwitch}>
      <Text>{theme.switchIcon}</Text>
      <Text style={styles.themeSwitchText}>{theme.name}</Text>
    </Pressable>
  );
}
