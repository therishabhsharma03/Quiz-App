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
   - Synchronized with question loading
   - Starts only after questions are successfully fetched
   - Automatic submission on timeout

3. **Question Display**
   - Dynamic rendering of multiple-choice questions
   - Option selection handling
   - Question navigation controls

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
3. 15 questions per quiz session
4. Single correct answer per question

## 🚧 Challenges & Solutions

### 1. Question State Management
**Challenge**: Implementing complex state tracking for unvisited, visited, answered, and unanswered questions.

**Solution**: 
- Created a dedicated state management system using React useState
- Implemented state transitions based on user interactions
- Used a map data structure to efficiently track question states
```javascript
const [questionStates, setQuestionStates] = useState({
  unvisited: new Set([...Array(15).keys()]),
  visited: new Set(),
  answered: new Set(),
  markedForReview: new Set()
});
```

### 2. Timer Synchronization
**Challenge**: Problem: The timer logic was managed inside a separate component (Timer), but the remaining time needed to be accessed in the parent component (QuizPage) to handle the submission. This required synchronizing the state of the timer across components.

**Solution**:
- To resolve this, I passed a function (setRemainingTime) from the parent component to the Timer component. The Timer component updated the state in the parent every second, ensuring that the parent always had access to the latest remaining time. This was achieved using React's useEffect hook to handle side effects and setInterval to update the time every second.
```javascript
const updateTimeRemaining = (time) => {
  setTimeRemaining(time);
};
```

### 3. State Transitions
Building the quiz application involved managing timer state, ensuring synchronization between components, and efficiently handling the auto-submit functionality. React's useState, useEffect, and state management patterns helped in achieving real-time updates and interactions between the timer and the submission logic. By breaking down the problems into smaller tasks and addressing them with React's built-in hooks and functions, I was able to create a smooth and responsive quiz experience.

```

## 🚀 Future Improvements

1. Implement user authentication
2. Add score tracking and leaderboard
3. Enable custom quiz creation
4. Add detailed analytics for question performance

## 📝 License

This project is licensed under the MIT License.

---
Deployed on Vercel • Built with React • Source Control on GitHub