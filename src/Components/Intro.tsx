import React, { MouseEventHandler, useEffect, useState } from "react";
import axios from "axios";

interface IntroProps {
  name: string;
  setName: (str: any) => void;
  onButtonClick: () => void;
}

const Intro = (props: IntroProps) => {
  return (
    <div>
      <h1 className="textSize-1">Welcome to GK Quiz</h1>
      <div className="my-4">
        <input
          type="text"
          className="form-control w-auto mx-auto border border-0 textSize-2"
          placeholder="Name"
          id="nameField"
          value={props.name}
          onInput={(e) => props.setName((e.target as HTMLInputElement).value)}
        ></input>
        <p id="nameHelp" className="form-text text-danger textSize-3"></p>
      </div>
      <button
        className="textSize-2 mainBtn rounded border border-0"
        onClick={props.onButtonClick}
      >
        Lets Play
      </button>
    </div>
  );
};

export default Intro;
