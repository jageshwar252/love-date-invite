import { useState } from 'react';
import { Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import QuestionCard from '../components/QuestionCard';
import { useTheme } from '../components/theme';
import { dateIdeas } from '../data/dateIdeas';

export default function DateScreen({ onChooseDate }) {
  const { theme, styles } = useTheme();
  const [selectedDate, setSelectedDate] = useState(getTomorrow());
  const [selectedTime, setSelectedTime] = useState(getDefaultTime());
  const [customIdea, setCustomIdea] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const selectDateIdea = (idea) => {
    onChooseDate({
      ...idea,
      schedule: {
        date: formatDate(selectedDate),
        isoDate: toDateInputValue(selectedDate),
        time: formatTime(selectedTime),
        isoTime: toTimeInputValue(selectedTime),
      },
    });
  };

  const selectCustomIdea = () => {
    const title = customIdea.trim();
    if (!title) return;

    selectDateIdea({
      emoji: '💡',
      title,
      note: 'A special idea picked by her.',
    });
  };

  const updateDate = (event, nextDate) => {
    if (Platform.OS !== 'ios') setShowDatePicker(false);
    if (nextDate) setSelectedDate(nextDate);
  };

  const updateTime = (event, nextTime) => {
    if (Platform.OS !== 'ios') setShowTimePicker(false);
    if (nextTime) setSelectedTime(nextTime);
  };

  return (
    <QuestionCard
      eyebrow="THE BEST PART"
      emoji={theme.icons.date}
      title="Then can I take you on a date?"
      subtitle="Choose when, then pick the adventure that sounds most like us."
    >
      <ScrollView
        style={styles.dateOptionsScroll}
        contentContainerStyle={styles.ideas}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.scheduleSection}>
          <Text style={styles.scheduleHeading}>When should we go?</Text>
          <Text style={styles.scheduleLabel}>Choose the date</Text>
          {Platform.OS === 'web' ? (
            <input
              aria-label="Choose the date"
              min={toDateInputValue(getTomorrow())}
              onChange={(event) => setSelectedDate(new Date(`${event.target.value}T12:00:00`))}
              style={styles.webDateTimeInput}
              type="date"
              value={toDateInputValue(selectedDate)}
            />
          ) : (
            <>
              <Pressable onPress={() => setShowDatePicker(true)} style={styles.dateTimePickerButton}>
                <Text style={styles.dateTimePickerText}>{formatDate(selectedDate)}</Text>
                <Text style={styles.dateTimePickerIcon}>📅</Text>
              </Pressable>
              {showDatePicker && (
                <DateTimePicker
                  minimumDate={getTomorrow()}
                  mode="date"
                  onChange={updateDate}
                  value={selectedDate}
                />
              )}
            </>
          )}

          <Text style={styles.scheduleLabel}>Choose the time</Text>
          {Platform.OS === 'web' ? (
            <input
              aria-label="Choose the time"
              onChange={(event) => setSelectedTime(timeFromInputValue(event.target.value))}
              style={styles.webDateTimeInput}
              type="time"
              value={toTimeInputValue(selectedTime)}
            />
          ) : (
            <>
              <Pressable onPress={() => setShowTimePicker(true)} style={styles.dateTimePickerButton}>
                <Text style={styles.dateTimePickerText}>{formatTime(selectedTime)}</Text>
                <Text style={styles.dateTimePickerIcon}>🕐</Text>
              </Pressable>
              {showTimePicker && (
                <DateTimePicker
                  mode="time"
                  onChange={updateTime}
                  value={selectedTime}
                />
              )}
            </>
          )}
        </View>

        <Text style={styles.scheduleLabel}>Pick the date idea</Text>
        {dateIdeas.map((idea) => (
          <Pressable key={idea.title} onPress={() => selectDateIdea(idea)} style={styles.ideaCard}>
            <Text style={styles.ideaEmoji}>{idea.emoji}</Text>
            <View style={styles.ideaCopy}>
              <Text style={styles.ideaTitle}>{idea.title}</Text>
              <Text style={styles.ideaNote}>{idea.note}</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </Pressable>
        ))}

        <View style={styles.customIdeaSection}>
          <Text style={styles.customIdeaTitle}>Or plan your own date 💡</Text>
          <TextInput
            value={customIdea}
            onChangeText={setCustomIdea}
            placeholder="For example: bookstore, beach walk..."
            placeholderTextColor={theme.muted}
            maxLength={80}
            style={styles.customIdeaInput}
          />
          <Pressable
            accessibilityState={{ disabled: !customIdea.trim() }}
            disabled={!customIdea.trim()}
            onPress={selectCustomIdea}
            style={[styles.customIdeaButton, !customIdea.trim() && styles.disabledButton]}
          >
            <Text style={styles.customIdeaButtonText}>Choose this idea</Text>
          </Pressable>
        </View>
      </ScrollView>
    </QuestionCard>
  );
}

function getTomorrow() {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  date.setHours(12, 0, 0, 0);
  return date;
}

function getDefaultTime() {
  const time = new Date();
  time.setHours(18, 30, 0, 0);
  return time;
}

function toDateInputValue(date) {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

function toTimeInputValue(time) {
  const hours = String(time.getHours()).padStart(2, '0');
  const minutes = String(time.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

function timeFromInputValue(value) {
  const [hours, minutes] = value.split(':').map(Number);
  const time = new Date();
  time.setHours(hours, minutes, 0, 0);
  return time;
}

function formatDate(date) {
  return date.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

function formatTime(time) {
  return time.toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true });
}
