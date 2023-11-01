import React, { useState } from "react";
import Intro from "./Intro";
import QuizPanel from "./QuizPanel";

const MainContainer = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [name, setName] = useState("");

  const handleStartButton = () => {
    setQuizStarted(true);
  };

  if (quizStarted == false) {
    return (
      <Intro name={name} setName={setName} onButtonClick={handleStartButton} />
    );
  } else {
    return <QuizPanel userName={name} />;
  }
};

export default MainContainer;
