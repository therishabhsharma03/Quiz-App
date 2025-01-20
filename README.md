# CausalFunnel Quiz Application

A dynamic quiz application that offers an interactive learning experience with multiple-choice questions, progress tracking, and timed assessments. Built with React, this application integrates with the Open Trivia Database to provide diverse quiz content.

## 🎯 Features

- **Dynamic Quiz Content**
  - 15 questions fetched from Open Trivia Database API
  - Multiple choice format for varied learning experience
  - Real-time question status updates

- **Advanced Progress Tracking**
  - Question status categories: Unvisited, Visited, Answered, Marked for Review
  - Visual progress indicators
  - Comprehensive quiz summary upon completion

- **User-Friendly Interface**
  - Interactive countdown timer
  - Flexible navigation between questions
  - Question marking system for later review
  - Mobile-responsive design

## 🛠️ Technical Stack

- **Frontend Framework**: React.js
- **State Management**: React Hooks (useState, useEffect)
- **Data Source**: Open Trivia Database API
- **Navigation**: React Router DOM
- **Styling**: CSS Modules

## 💻 Installation

### Prerequisites
- Node.js (Latest stable version)
- npm (Comes with Node.js)

### Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/causalfunnel-quiz.git
   cd causalfunnel-quiz
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Launch Development Server**
   ```bash
   npm start
   ```

4. **Access the Application**
   - Open your browser and navigate to `http://localhost:3000`

## 📱 Usage Guide

1. **Starting the Quiz**
   - Launch the application
   - Quiz automatically fetches 15 multiple-choice questions
   - Timer begins counting down

2. **During the Quiz**
   - Select answers for each question
   - Navigate using Previous/Next buttons
   - Mark questions for later review
   - Monitor remaining time
   - Jump to specific questions using number grid
   - Unmark the Selection

3. **Quiz Completion**
   - Submit manually or automatic submission when timer expires
   - View detailed progress summary
   - Review answered, marked, and unvisited questions

## 📁 Project Structure

```bash
src/
├── components/
│   ├── QuestionCard/    # Question display component
│   ├── Timer/           # Countdown timer component
│   ├── QuizPage/        # Main quiz logic and layout
│   └── QuestionBox/     # Question navigation grid
│
├── App.js               # Main application component
└── index.js            # Application entry point
```

## ⚙️ Customization

Modify the quiz configuration by adjusting the API parameters in `QuizPage.js`:
```javascript
axios.get('https://opentdb.com/api.php?amount=15&type=multiple')
```

Refer to [Open Trivia Database API documentation](https://opentdb.com/) for additional customization options including:
- Question categories
- Difficulty levels
- Question types

## 👥 Support

For support, bug reports, and feature requests:
- Open an issue in the GitHub repository

---
Built with ❤️ for CausalFunnel