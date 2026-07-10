import { useMemo, useRef, useState } from 'react';
import { Animated, Easing, SafeAreaView, StatusBar, Text, View } from 'react-native';
import ThemeSwitcher from './components/ThemeSwitcher';
import { createStyles, ThemeContext, themes } from './components/theme';
import { saveDateResponse } from './services/firebaseService';
import ConfirmScreen from './screens/ConfirmScreen';
import DateScreen from './screens/DateScreen';
import LoveScreen from './screens/LoveScreen';
import NotHerScreen from './screens/NotHerScreen';
import QuizScreen from './screens/QuizScreen';
import ResponseSentScreen from './screens/ResponseSentScreen';
import YayScreen from './screens/YayScreen';

export default function App() {
  const [screen, setScreen] = useState('quiz');
  const [dateChoice, setDateChoice] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState([]);
  const [themeIndex, setThemeIndex] = useState(0);
  const themeFade = useRef(new Animated.Value(1)).current;
  const themeScale = useRef(new Animated.Value(1)).current;
  const theme = themes[themeIndex];
  const styles = useMemo(() => createStyles(theme), [theme]);

  const openDate = () => setScreen('date');

  const chooseDate = (idea) => {
    setDateChoice(idea);
    setScreen('yay');
  };

  const cycleTheme = () => {
    Animated.parallel([
      Animated.timing(themeFade, { toValue: 0, duration: 120, easing: Easing.out(Easing.quad), useNativeDriver: true }),
      Animated.timing(themeScale, { toValue: 0.94, duration: 120, easing: Easing.out(Easing.quad), useNativeDriver: true }),
    ]).start(() => {
      setThemeIndex((index) => (index + 1) % themes.length);
      Animated.parallel([
        Animated.timing(themeFade, { toValue: 1, duration: 260, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
        Animated.spring(themeScale, { toValue: 1, friction: 5, tension: 80, useNativeDriver: true }),
      ]).start();
    });
  };

  const submitResponse = (message) => saveDateResponse({
    quizAnswers,
    loveAnswer: 'Yes, I do!',
    dateChoice,
    theme: theme.name,
    message,
    date: dateChoice?.schedule?.date || '',
    time: dateChoice?.schedule?.time || '',
    dateIdea: dateChoice?.title || '',
  });

  const renderScreen = () => {
    switch (screen) {
      case 'quiz':
        return <QuizScreen onComplete={(answers) => { setQuizAnswers(answers); setScreen('love'); }} onFail={() => setScreen('not-her')} />;
      case 'not-her':
        return <NotHerScreen onTryAgain={() => setScreen('quiz')} />;
      case 'love':
        return <LoveScreen onYes={openDate} onNo={() => setScreen('confirm')} />;
      case 'confirm':
        return <ConfirmScreen onYes={openDate} />;
      case 'date':
        return <DateScreen onChooseDate={chooseDate} />;
      case 'yay':
        return <YayScreen choice={dateChoice} onAskAgain={() => setScreen('love')} onSubmit={submitResponse} onSent={() => setScreen('response-sent')} />;
      case 'response-sent':
        return <ResponseSentScreen choice={dateChoice} onAskAgain={() => setScreen('love')} />;
      default:
        return <QuizScreen onComplete={(answers) => { setQuizAnswers(answers); setScreen('love'); }} onFail={() => setScreen('not-her')} />;
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, styles }}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" />
        <Text style={styles.backgroundDecorationOne}>{theme.decorations[0]}</Text>
        <Text style={styles.backgroundDecorationTwo}>{theme.decorations[1]}</Text>
        {theme.stickers.map((sticker, index) => (
          <Text key={`${theme.id}-${sticker}`} pointerEvents="none" style={styles[`sticker${index + 1}`]}>{sticker}</Text>
        ))}
        {screen === 'quiz' && (
          <View style={styles.themeSwitchWrap}>
            <ThemeSwitcher onPress={cycleTheme} />
          </View>
        )}
        <Animated.View style={[styles.container, { opacity: themeFade, transform: [{ scale: themeScale }] }]}>
          {renderScreen()}
        </Animated.View>
      </SafeAreaView>
    </ThemeContext.Provider>
  );
}
