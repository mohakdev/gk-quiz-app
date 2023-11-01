import { useEffect, useRef, useState } from "react";
import { Question } from "@trivia-api/models";
import Quiz from "./Quiz";
import Score from "./Score";

const QuizPanel = ({ userName = "" }) => {
  const [questionAnswered, setQuestionAnswered] = useState(false); //prevents users from changing answers
  const [loading, setLoading] = useState(true);
  const [questionNo, setQuestionNo] = useState(0); //index for quiz
  const [totalCorrect, setTotalCorrect] = useState(0);

  const [questions, setQuestions] = useState<Question[]>([]);
  const questionHtml = useRef(<h3>Loading...</h3>);
  const currentQuestion = questions[questionNo]; //Gets the current question

  // Store the questions in state once we have fetched them
  const getQuestions = async () => {
    const response = await fetch(
      "https://the-trivia-api.com/api/questions?limit=10"
    );
    const questions = await response.json();
    setLoading(false);
    return questions;
  };

  /**
   * Get questions once the app has loaded. This needs to be inside the useEffect
   * hook, otherwise we will be fetching questions any time the component renders.
   */
  useEffect(() => {
    getQuestions().then((res) => setQuestions(res));
  }, []);

  const handleAnswerClick = (userAnswer: String, correctAnswer: String) => {
    if (questionAnswered == true) {
      return;
    }
    if (userAnswer == correctAnswer) {
      /* If the answer is correct */
      setTotalCorrect(totalCorrect + 1);

      console.log("Correct Answer!!");
    } else {
      /*If the answer is wrong */
      console.log("Wrong Answer!!");
    }
    setQuestionAnswered(true);
  };

  const handleNextQuestion = () => {
    setQuestionNo(questionNo + 1);
    setQuestionAnswered(false);
  };

  if (loading == false && questionNo < 10) {
    questionHtml.current = (
      <>
        <h3>Question {questionNo + 1} out of 10</h3>
        <Quiz
          questionAnswered={questionAnswered}
          question={currentQuestion}
          onAnswerClicked={handleAnswerClick}
        />
        <button
          className="mt-4 textSize-2 mainBtn rounded border border-0"
          onClick={handleNextQuestion}
        >
          Next
        </button>
      </>
    );
  } else if (loading == false && questionNo >= 10) {
    questionHtml.current = <Score name={userName} score={totalCorrect} />;
  }

  return questionHtml.current;
};

export default QuizPanel;
