import { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import ActionButton from '../components/ActionButton';
import QuestionCard from '../components/QuestionCard';
import { useTheme } from '../components/theme';

export default function YayScreen({ choice, onAskAgain, onSubmit, onSent }) {
  const dateTitle = choice?.title || 'date';
  const { theme, styles } = useTheme();
  const [submissionState, setSubmissionState] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [message, setMessage] = useState('');

  const submit = async () => {
    setSubmissionState('sending');
    setErrorMessage('');

    try {
      await onSubmit(message.trim());
      onSent();
    } catch (error) {
      setSubmissionState('error');
      setErrorMessage(error.message || 'Could not send the response. Please try again.');
    }
  };

  return (
    <QuestionCard
      eyebrow="IT'S A DATE"
      emoji={theme.icons.yay}
      title="Yay, I can't wait!"
      subtitle={`Our ${dateTitle.toLowerCase()} is going to be lovely.`}
    >
      <View style={styles.dateChoice}>
        <Text style={styles.dateChoiceEmoji}>{choice?.emoji || '✨'}</Text>
        <Text style={styles.dateChoiceText}>{dateTitle}</Text>
        {choice?.schedule && <Text style={styles.dateScheduleText}>{choice.schedule.date} · {choice.schedule.time}</Text>}
      </View>
      <Text style={styles.messagePrompt}>Do you want to tell Jaggu something?</Text>
      <TextInput
        value={message}
        onChangeText={setMessage}
        placeholder="Write a sweet message..."
        placeholderTextColor={theme.muted}
        multiline
        maxLength={500}
        style={styles.messageInput}
      />
      <Text style={styles.consentText}>This sends your choices and message to Jaggu.</Text>
      <ActionButton
        label={submissionState === 'sending' ? 'Sending...' : 'Send my response 💌'}
        onPress={submit}
        disabled={submissionState === 'sending'}
      />
      {submissionState === 'error' && <Text style={styles.submissionError}>{errorMessage}</Text>}
      <View style={styles.askAgainWrap}>
        <ActionButton label="Ask me again" variant="secondary" onPress={onAskAgain} />
      </View>
    </QuestionCard>
  );
}
