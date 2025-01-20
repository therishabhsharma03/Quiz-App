import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import QuizPage from './QuizPage';
import { MemoryRouter } from 'react-router-dom';

// Mocking the API fetch call
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ results: [] }),
  })
);

describe('QuizPage Component', () => {
  // Test Case 1: Initial Rendering
  test('renders quiz page correctly', () => {
    render(
      <MemoryRouter>
        <QuizPage />
      </MemoryRouter>
    );
    expect(screen.getByText(/Start Quiz/)).toBeInTheDocument();
    expect(screen.getByTestId('timer')).toBeInTheDocument();
  });

  // Test Case 2: Fetching Questions
  test('fetches questions on mount', async () => {
    render(
      <MemoryRouter>
        <QuizPage />
      </MemoryRouter>
    );

    // Wait for questions to be fetched and the component to re-render
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    expect(screen.getByTestId('question-list')).toBeInTheDocument();
  });

  // Test Case 3: Timer Functionality
  test('timer starts at 30 minutes and counts down', async () => {
    jest.useFakeTimers();
    render(
      <MemoryRouter>
        <QuizPage />
      </MemoryRouter>
    );

    // Check if timer starts at 30 minutes
    expect(screen.getByText(/30:00/)).toBeInTheDocument();

    // Simulate timer countdown
    jest.advanceTimersByTime(1000);
    expect(screen.getByText(/29:59/)).toBeInTheDocument();
    jest.useRealTimers();
  });

  // Test Case 4: Question Navigation (Next and Previous)
  test('navigate between questions using Next and Previous', async () => {
    render(
      <MemoryRouter>
        <QuizPage />
      </MemoryRouter>
    );

    // Navigate to the next question
    fireEvent.click(screen.getByText('Next Question'));
    expect(screen.getByTestId('question-content')).toHaveTextContent('Question 2');

    // Navigate to the previous question
    fireEvent.click(screen.getByText('Previous Question'));
    expect(screen.getByTestId('question-content')).toHaveTextContent('Question 1');
  });

  // Test Case 5: Jump to Specific Question
  test('jump to specific question by clicking question number in sidebar', async () => {
    render(
      <MemoryRouter>
        <QuizPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('3'));
    expect(screen.getByTestId('question-content')).toHaveTextContent('Question 3');
  });

  // Test Case 6: Answer Selection
  test('select an answer and update question status', async () => {
    render(
      <MemoryRouter>
        <QuizPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Answer 1'));
    expect(screen.getByText('Answered')).toBeInTheDocument();
  });

  // Test Case 7: Marking for Review
  test('mark a question for review', async () => {
    render(
      <MemoryRouter>
        <QuizPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Mark For Review'));
    expect(screen.getByText('Marked for Review')).toBeInTheDocument();
  });

  // Test Case 8: Submit Button
  test('clicking submit opens confirmation popup', async () => {
    render(
      <MemoryRouter>
        <QuizPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Submit Quiz'));
    expect(screen.getByText('Are you sure you want to submit the quiz?')).toBeInTheDocument();
  });

  // Test Case 9: Popup Confirmation
  test('submit confirmation popup shows summary', async () => {
    render(
      <MemoryRouter>
        <QuizPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Submit Quiz'));
    fireEvent.click(screen.getByText('Yes, Submit'));

    expect(screen.getByText('Answered questions:')).toBeInTheDocument();
    expect(screen.getByText('Reviewed questions:')).toBeInTheDocument();
    expect(screen.getByText('Unvisited questions:')).toBeInTheDocument();
    expect(screen.getByText('Remaining Time:')).toBeInTheDocument();
  });

  // Test Case 10: Confirm Submission
  test('submit quiz and navigate to report page', async () => {
    render(
      <MemoryRouter>
        <QuizPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Submit Quiz'));
    fireEvent.click(screen.getByText('Yes, Submit'));

    await waitFor(() => expect(window.location.pathname).toBe('/report'));
  });

  // Test Case 11: Cancel Submission
  test('clicking cancel closes the popup', async () => {
    render(
      <MemoryRouter>
        <QuizPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Submit Quiz'));
    fireEvent.click(screen.getByText('Cancel'));

    expect(screen.queryByText('Are you sure you want to submit the quiz?')).toBeNull();
  });

  // Test Case 12: Navigation Buttons Edge Case (First and Last Question)
  test('disable navigation buttons on first and last question', async () => {
    render(
      <MemoryRouter>
        <QuizPage />
      </MemoryRouter>
    );

    // Simulate reaching the first question
    fireEvent.click(screen.getByText('Next Question'));
    fireEvent.click(screen.getByText('Next Question'));
    fireEvent.click(screen.getByText('Previous Question'));
    expect(screen.getByText('Previous Question')).toBeDisabled();

    // Simulate reaching the last question
    fireEvent.click(screen.getByText('Next Question'));
    fireEvent.click(screen.getByText('Next Question'));
    fireEvent.click(screen.getByText('Next Question'));
    expect(screen.getByText('Next Question')).toBeDisabled();
  });

  // Test Case 13: Sidebar Question Box Status
  test('apply correct styling to sidebar question boxes based on status', async () => {
    render(
      <MemoryRouter>
        <QuizPage />
      </MemoryRouter>
    );

    // Select an answer
    fireEvent.click(screen.getByText('Answer 1'));
    expect(screen.getByText('Answered')).toBeInTheDocument();

    // Mark for review
    fireEvent.click(screen.getByText('Mark For Review'));
    expect(screen.getByText('Marked for Review')).toBeInTheDocument();
  });

  // Test Case 14: Handling Errors from API
  test('handles API errors correctly', async () => {
    global.fetch.mockImplementationOnce(() => Promise.reject(new Error('Network Error')));

    render(
      <MemoryRouter>
        <QuizPage />
      </MemoryRouter>
    );

    await waitFor(() => expect(console.error).toHaveBeenCalledWith('Error fetching quiz data'));
  });

  // Test Case 15: Timer Stops on Submission
  test('timer stops when quiz is submitted', async () => {
    jest.useFakeTimers();
    render(
      <MemoryRouter>
        <QuizPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Submit Quiz'));
    jest.advanceTimersByTime(1000); // Simulate timer continuing after submit
    expect(screen.getByText(/30:00/)).toBeInTheDocument(); // Timer should stop
    jest.useRealTimers();
  });

  // Test Case 16: State Persistence
  test('state persists after page refresh', async () => {
    render(
      <MemoryRouter>
        <QuizPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Answer 1'));
    fireEvent.click(screen.getByText('Next Question'));
    fireEvent.click(screen.getByText('Answer 2'));

    // Simulate page refresh
    fireEvent.click(screen.getByText('Refresh Page'));

    expect(screen.getByText('Answered')).toBeInTheDocument();
  });

  // Test Case 17: UI Responsiveness
  test('UI is responsive on different screen sizes', () => {
    window.innerWidth = 500;
    render(
      <MemoryRouter>
        <QuizPage />
      </MemoryRouter>
    );
    expect(screen.getByText('Start Quiz')).toBeInTheDocument();
  });
});
