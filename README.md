# A Little Question

A JavaScript React Native (Expo) app with a playful date invitation flow.

## Run it

```bash
npm install
npm start
```

Use the Expo Go app to scan the QR code, or press `i`, `a`, or `w` in the Expo terminal to open iOS, Android, or web.

## Project structure

- `App.js` — decides which screen to show and moves between screens.
- `screens/` — one file for each page of the app: quiz, love question, confirmation, date picker, and celebration.
- `components/` — small shared UI pieces used by several screens, such as the card and button.
- `data/quizData.js` — the five quiz questions, correct answers, and funny rejection messages. Edit this file to personalize the quiz.
- `data/dateIdeas.js` — the date options shown after she says yes.
- `components/theme.js` — the Romance, Flower Garden, and Cartoon themes. The theme button on the first page cycles through them.

## Firebase responses

The final page has a visible **Send my response** button. It saves the quiz answers and date choice only after the person taps it.

1. Create a Firebase project and register a Web app.
2. Copy `.env.example` to `.env`, then add the Firebase configuration values there. Never commit `.env`.
3. Enable **Anonymous** sign-in in Firebase Authentication.
4. Create a Cloud Firestore database and use rules that permit signed-in users to create responses, but never read them:

```text
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /dateResponses/{document} {
      allow create: if request.auth != null
        && request.resource.data.keys().hasOnly([
          'quizAnswers', 'loveAnswer', 'dateChoice', 'theme', 'message', 'date', 'time', 'dateIdea', 'submittedAt'
        ])
        && request.resource.data.quizAnswers is list
        && request.resource.data.loveAnswer == 'Yes, I do!'
        && request.resource.data.dateChoice is map
        && request.resource.data.theme is string
        && request.resource.data.message is string
        && request.resource.data.date is string
        && request.resource.data.time is string
        && request.resource.data.dateIdea is string;
      allow read, update, delete: if false;
    }
  }
}
```

View submitted responses in Firebase Console → Firestore Database → `dateResponses`.
