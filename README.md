# Quiz Application

A dynamic quiz application built with React that offers an interactive quiz experience with question tracking, timer functionality, and progress monitoring. Live demo: [Quiz App](https://quiz-app-jade-delta-97.vercel.app/quiz)

## 🎯 Project Overview

This quiz application was developed as part of the CausalFunnel assignment. The main focus was to create an intuitive quiz interface that effectively tracks user progress and manages question states.

### Key Components

1. **QuestionTracker**
   - Manages states: Unvisited, Visited, Answered, and Marked for Review
   - Visual indicators for question status
   - Grid-based navigation system

2. **Timer Component**
   - 30-minute countdown implementation
   - Synchronized with question loading
   - Starts only after questions are successfully fetched
   - Automatic submission on timeout

3. **Question Display**
   - Dynamic rendering of multiple-choice questions
   - Option selection handling
   - Question navigation controls

4. **Report Generation**
   - Comprehensive end-of-quiz summary
   - Side-by-side comparison of user and correct answers
   - Performance analytics

## 🛠️ Technical Implementation

### Core Features
- React Hooks for state management
- API integration with Open Trivia Database
- Responsive design for multiple devices
- Question status tracking system

### State Management
- Used React's useState and useEffect for managing:
  - Question states
  - Timer synchronization
  - Navigation logic
  - Answer tracking

## 🚧 Challenges & Solutions

### 1. HTML Entity Encoding in API Responses
**Challenge**: The Open Trivia Database API returns quiz questions and answers with HTML entities (e.g., `&039;`, `&amp;`, `&lt;`, `&gt;`), making the text unreadable.

**Solution**: 
```javascript
const decodeHtmlEntity = (encodedText) => {
    const element = document.createElement('div');
    element.innerHTML = encodedText;
    return element.textContent;
};
```

### 2. Question State Management
**Challenge**: Implementing complex state tracking for unvisited, visited, answered, and unanswered questions.

**Solution**: 
```javascript
const [questionStates, setQuestionStates] = useState({
  unvisited: new Set([...Array(15).keys()]),
  visited: new Set(),
  answered: new Set(),
  markedForReview: new Set()
});
```

### 3. Timer Synchronization
**Challenge**: Synchronizing timer state with the main application for auto-submission.

**Solution**:
```javascript
const updateTimeRemaining = (time) => {
  setTimeRemaining(time);
};
```

## 💻 Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone [repository-url]
   cd quiz-app
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run Development Server**
   ```bash
   npm start
   ```

4. **Access the Application**
   - Local: http://localhost:3000
   - Live: https://quiz-app-jade-delta-97.vercel.app/quiz

## 🤔 Assumptions

1. Users have a stable internet connection for API calls
2. Questions are always multiple-choice format
3. Single correct answer per question
4. Email validation only checks for basic email format


## ✅ Requirements Checklist

### Core Requirements
- [x] Start page with email submission
- [x] 15 questions display
- [x] 30-minute countdown timer
- [x] Auto-submission on timer expiry
- [x] Question navigation system
- [x] Question status tracking
  - [x] Visited questions indicator
  - [x] Attempted questions indicator
- [x] End-of-quiz report page
  - [x] User answers display
  - [x] Correct answers display
- [x] API Integration with OpenTDB
  - [x] Proper handling of questions
  - [x] Correct management of answer choices
  - [x] Validation of correct answers

### Technical Requirements
- [x] Bug-free functionality
- [x] Clean, well-organized code
- [x] Proper commenting
- [x] Code reusability
- [x] Hosted application (on Vercel)
- [x] Source code repository
- [x] Detailed README

### Bonus Requirements
- [x] Responsive design for different device sizes
- [x] Cross-browser compatibility
  - [x] Chrome
  - [x] Firefox
  - [x] Safari
  - [x] Edge
- [x] Smooth transitions and animations
- [x] Enhanced user experience features
  - [x] Question state tracking system
  - [x] Grid-based navigation
  - [x] Visual status indicators


## 🚀 Future Improvements

1. Implement user authentication
2. Add score tracking and leaderboard
3. Enable custom quiz creation
4. Add detailed analytics for question performance
5. Implement progressive web app capabilities
6. Add offline support
7. Implement question categorization
8. Add difficulty selection

---
Deployed on Vercel • Built with React • Source Control on GitHub