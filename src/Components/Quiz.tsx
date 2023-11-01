import React, { MouseEventHandler, useState } from "react";
import { Question } from "@trivia-api/models";

interface QuizProps {
  question: Question;
  questionAnswered: Boolean;
  onAnswerClicked: (userAnswer: String, correctAnswer: String) => void;
}

const Quiz = ({ question, questionAnswered, onAnswerClicked }: QuizProps) => {
  // Sort the answers alphabetically so that the correct answer is shuffled in with the rest
  const allAnswers: string[] = [
    question.correctAnswer,
    ...question.incorrectAnswers,
  ].sort((a, b) => (a < b ? -1 : 1));

  return (
    <div className="QuizPanel">
      <h3 className="textSize-1">{question.question}</h3>
      {allAnswers.map((answer, index) => (
        <React.Fragment key={index}>
          <button
            className="textSize-2 mt-2 mainBtn rounded border border-0"
            style={{
              background:
                questionAnswered == true
                  ? answer === question.correctAnswer
                    ? "green"
                    : "red"
                  : "#695EBF",
            }}
            onClick={() =>
              onAnswerClicked(answer.toString(), question.correctAnswer)
            }
          >
            {answer.toString()}
          </button>
          <br></br>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Quiz;
