import { createContext, useContext } from 'react';
import { StyleSheet } from 'react-native';

// Add another object here if you want to create more themes later.
export const themes = [
  {
    id: 'romance',
    name: 'Love mode',
    switchIcon: '💗',
    background: '#fff4f7', card: '#ffffff', primary: '#e9547c', primaryText: '#ffffff',
    secondary: '#fff0f4', secondaryText: '#bd4d6d', text: '#3d2130', muted: '#815c6a',
    accent: '#d75d7f', decoration: '#ffd4df', optionBackground: '#fffafc', optionBorder: '#f5dfe6',
    soft: '#fff0f4', cardRadius: 30, buttonRadius: 16, cardRotation: '0deg', borderWidth: 0,
    decorations: ['♥', '♥'], icons: { quiz: '🔐😒', love: '💌', confirm: '🥺', date: '✨', yay: '💞', fail: '🤬' },
    stickers: ['✨', '💌', '🫶', '🌷'],
  },
  {
    id: 'garden',
    name: 'Flower Garden',
    switchIcon: '🌸',
    background: '#f2fff2', card: '#fffef8', primary: '#4d9a62', primaryText: '#ffffff',
    secondary: '#e2f6e5', secondaryText: '#397b4d', text: '#284534', muted: '#66816e',
    accent: '#4d9a62', decoration: '#bfe9c6', optionBackground: '#fbfff9', optionBorder: '#d2ecd6',
    soft: '#e8f8e8', cardRadius: 22, buttonRadius: 10, cardRotation: '0deg', borderWidth: 1,
    decorations: ['🌸', '🌿'], icons: { quiz: '🦋', love: '🌹', confirm: '🐝', date: '🧺', yay: '🌼', fail: '🍂' },
    stickers: ['🌷', '🦋', '🍃', '🐞'],
  },
  {
    id: 'cartoon',
    name: 'Cartoon',
    switchIcon: '🎨',
    background: '#fff6cf', card: '#fffdf5', primary: '#5a78e6', primaryText: '#ffffff',
    secondary: '#dfe7ff', secondaryText: '#455fb8', text: '#26355f', muted: '#62729c',
    accent: '#ef6a58', decoration: '#ffd65a', optionBackground: '#ffffff', optionBorder: '#26355f',
    soft: '#fff1ac', cardRadius: 14, buttonRadius: 10, cardRotation: '-1deg', borderWidth: 3,
    decorations: ['⭐', '☁️'], icons: { quiz: '🎮', love: '💘', confirm: '😵', date: '🎠', yay: '🎉', fail: '🤪' },
    stickers: ['💥', '🌈', '🛸', '🍭'],
  },
];

export const ThemeContext = createContext(null);

export function useTheme() {
  const value = useContext(ThemeContext);
  if (!value) throw new Error('useTheme must be used inside ThemeContext.Provider');
  return value;
}

export function createStyles(theme) {
  return StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: theme.background },
    container: { flex: 1, justifyContent: 'center', padding: 24 },
    backgroundDecorationOne: { position: 'absolute', top: 86, left: 22, color: theme.decoration, fontSize: 44, transform: [{ rotate: '-18deg' }] },
    backgroundDecorationTwo: { position: 'absolute', bottom: 92, right: 20, color: theme.decoration, fontSize: 52, transform: [{ rotate: '16deg' }] },
    sticker1: { position: 'absolute', top: 150, right: 18, fontSize: 25, transform: [{ rotate: '15deg' }], opacity: 0.8 },
    sticker2: { position: 'absolute', top: 278, left: 9, fontSize: 25, transform: [{ rotate: '-15deg' }], opacity: 0.8 },
    sticker3: { position: 'absolute', bottom: 154, left: 24, fontSize: 24, transform: [{ rotate: '10deg' }], opacity: 0.8 },
    sticker4: { position: 'absolute', bottom: 50, right: 70, fontSize: 26, transform: [{ rotate: '-10deg' }], opacity: 0.8 },
    themeSwitchWrap: { position: 'absolute', zIndex: 2, top: 14, right: 20 },
    themeSwitch: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 9, borderRadius: 99, backgroundColor: theme.card, borderWidth: theme.borderWidth || 1, borderColor: theme.optionBorder, shadowColor: theme.text, shadowOpacity: 0.08, shadowRadius: 8, shadowOffset: { width: 0, height: 3 }, elevation: 3 },
    themeSwitchText: { color: theme.text, fontSize: 12, fontWeight: '800' },
    card: { backgroundColor: theme.card, borderRadius: theme.cardRadius, padding: 28, borderWidth: theme.borderWidth, borderColor: theme.optionBorder, transform: [{ rotate: theme.cardRotation }], shadowColor: theme.text, shadowOpacity: 0.12, shadowRadius: 24, shadowOffset: { width: 0, height: 12 }, elevation: 5 },
    eyebrow: { color: theme.accent, fontSize: 11, letterSpacing: 1.4, fontWeight: '800', textAlign: 'center' },
    emojiBubble: { alignSelf: 'center', alignItems: 'center', justifyContent: 'center', width: 84, height: 84, borderRadius: theme.cardRadius, backgroundColor: theme.soft, marginTop: 18, borderWidth: theme.borderWidth, borderColor: theme.optionBorder },
    heroEmoji: { fontSize: 40 },
    title: { color: theme.text, fontSize: 29, lineHeight: 35, fontWeight: '800', textAlign: 'center', marginTop: 18 },
    subtitle: { color: theme.muted, fontSize: 16, lineHeight: 23, textAlign: 'center', marginTop: 10 },
    content: { marginTop: 28 },
    buttonRow: { gap: 12 },
    button: { minHeight: 52, paddingHorizontal: 18, alignItems: 'center', justifyContent: 'center', borderRadius: theme.buttonRadius, backgroundColor: theme.primary, borderWidth: theme.borderWidth, borderColor: theme.text },
    buttonText: { color: theme.primaryText, fontSize: 16, fontWeight: '800' },
    disabledButton: { opacity: 0.65 },
    secondaryButton: { backgroundColor: theme.secondary, borderColor: theme.optionBorder },
    secondaryButtonText: { color: theme.secondaryText },
    movingButtonArea: { height: 210, position: 'relative', alignItems: 'stretch' },
    escapeButton: { position: 'absolute', minWidth: 78, height: 48, alignItems: 'center', justifyContent: 'center', borderRadius: theme.buttonRadius, backgroundColor: theme.secondary, borderWidth: theme.borderWidth, borderColor: theme.optionBorder },
    escapeText: { color: theme.secondaryText, fontSize: 15, fontWeight: '800' },
    hint: { color: theme.muted, fontSize: 13, fontStyle: 'italic', textAlign: 'center', marginTop: 4 },
    ideas: { gap: 12 }, dateOptionsScroll: { maxHeight: 360 },
    scheduleSection: { overflow: 'hidden', backgroundColor: theme.soft, borderRadius: theme.buttonRadius, padding: 14, borderWidth: theme.borderWidth, borderColor: theme.optionBorder },
    scheduleHeading: { color: theme.text, fontSize: 17, fontWeight: '800', marginBottom: 12 },
    scheduleLabel: { color: theme.muted, fontSize: 12, fontWeight: '800', marginTop: 4, marginBottom: 8 },
    dateTimePickerButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', minHeight: 48, paddingHorizontal: 13, borderRadius: theme.buttonRadius, borderWidth: theme.borderWidth || 1, borderColor: theme.optionBorder, backgroundColor: theme.card },
    dateTimePickerText: { color: theme.text, fontSize: 15, fontWeight: '800' },
    dateTimePickerIcon: { fontSize: 18 },
    webDateTimeInput: { alignSelf: 'stretch', boxSizing: 'border-box', width: '100%', maxWidth: '100%', minHeight: 48, padding: 12, color: theme.text, backgroundColor: theme.card, borderColor: theme.optionBorder, borderWidth: theme.borderWidth || 1, borderRadius: theme.buttonRadius, fontFamily: 'inherit', fontSize: 15, fontWeight: '700' },
    ideaCard: { flexDirection: 'row', alignItems: 'center', borderWidth: theme.borderWidth || 1, borderColor: theme.optionBorder, borderRadius: theme.buttonRadius, padding: 14, backgroundColor: theme.optionBackground },
    ideaEmoji: { fontSize: 28, marginRight: 12 }, ideaCopy: { flex: 1 },
    ideaTitle: { color: theme.text, fontSize: 16, fontWeight: '800' }, ideaNote: { color: theme.muted, fontSize: 12, lineHeight: 17, marginTop: 3 },
    arrow: { color: theme.accent, fontSize: 30, marginLeft: 8, fontWeight: '300' },
    customIdeaSection: { backgroundColor: theme.soft, borderRadius: theme.buttonRadius, padding: 14, borderWidth: theme.borderWidth, borderColor: theme.optionBorder },
    customIdeaTitle: { color: theme.text, fontSize: 15, fontWeight: '800', marginBottom: 10 },
    customIdeaInput: { minHeight: 48, color: theme.text, fontSize: 14, paddingHorizontal: 12, paddingVertical: 10, backgroundColor: theme.card, borderWidth: theme.borderWidth || 1, borderColor: theme.optionBorder, borderRadius: theme.buttonRadius },
    customIdeaButton: { minHeight: 44, alignItems: 'center', justifyContent: 'center', borderRadius: theme.buttonRadius, marginTop: 10, backgroundColor: theme.primary, borderWidth: theme.borderWidth, borderColor: theme.text },
    customIdeaButtonText: { color: theme.primaryText, fontSize: 14, fontWeight: '800' },
    quizOptions: { gap: 10 },
    quizOption: { flexDirection: 'row', alignItems: 'center', borderWidth: theme.borderWidth || 1, borderColor: theme.optionBorder, borderRadius: theme.buttonRadius, paddingVertical: 14, paddingLeft: 16, paddingRight: 12, backgroundColor: theme.optionBackground },
    quizOptionText: { flex: 1, color: theme.text, fontSize: 15, fontWeight: '700' }, quizOptionArrow: { color: theme.accent, fontSize: 27, lineHeight: 28, marginLeft: 8 },
    progressTrack: { height: 6, overflow: 'hidden', backgroundColor: theme.secondary, borderRadius: 99, marginTop: 20 }, progressFill: { height: '100%', backgroundColor: theme.primary, borderRadius: 99 },
    dateChoice: { alignItems: 'center', justifyContent: 'center', backgroundColor: theme.soft, borderRadius: theme.buttonRadius, paddingVertical: 20, marginBottom: 14, borderWidth: theme.borderWidth, borderColor: theme.optionBorder },
    dateChoiceEmoji: { fontSize: 35 }, dateChoiceText: { color: theme.secondaryText, fontSize: 17, fontWeight: '800', marginTop: 6 },
    dateScheduleText: { color: theme.muted, fontSize: 13, fontWeight: '700', marginTop: 4 },
    consentText: { color: theme.muted, fontSize: 13, lineHeight: 18, textAlign: 'center', marginBottom: 10 },
    messagePrompt: { color: theme.text, fontSize: 15, fontWeight: '800', marginBottom: 9 },
    messageInput: { minHeight: 86, maxHeight: 130, color: theme.text, fontSize: 15, lineHeight: 21, textAlignVertical: 'top', padding: 13, marginBottom: 10, backgroundColor: theme.optionBackground, borderWidth: theme.borderWidth || 1, borderColor: theme.optionBorder, borderRadius: theme.buttonRadius },
    submissionSuccess: { color: theme.primary, fontSize: 16, fontWeight: '800', textAlign: 'center', paddingVertical: 16, backgroundColor: theme.soft, borderRadius: theme.buttonRadius },
    submissionError: { color: theme.accent, fontSize: 12, lineHeight: 17, textAlign: 'center', marginTop: 10 },
    askAgainWrap: { marginTop: 12 },
  });
}
