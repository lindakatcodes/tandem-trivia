import React, { useState, useEffect } from 'react';
import './Landing.css';

const start = {
  title: 'Tandem for 400!',
  subtitle: 'A Trivia app created with ♥ for the Apprentice Software Engineer program.',
  text: "Are you ready to test your wits? I've got 10 questions for you - get as many correct as you can to win big!",
  buttonText: 'Ready to Start?',
};

const middle = {
  title: '',
  subtitle: '',
  text: '',
  buttonText: '',
};

const end = {
  title: '',
  subtitle: '',
  text: '',
  buttonText: '',
};

const toGo = (numLeft) => {
  if (numLeft === 10) {
    return start;
  } else if (numLeft === 5) {
    return middle;
  } else if (numLeft === 0) {
    return end;
  }
};



function Landing(props) {

  const textData = toGo(props.qsLeft);

  return (
    <div className="page-root">
      <h1 className="title">{textData.title}</h1>
      <h2 className="subtitle">{textData.subtitle}</h2>
      <p className="text">{textData.text}</p>
      <div className="button-wrapper">
        <button className="start-button"
          onClick={() => { props.setPageType('question') }}>
          {textData.buttonText}
        </button>
        <span className="helper-text">press <strong>Enter</strong></span>
      </div>
    </div>
  );
}

export default Landing;
