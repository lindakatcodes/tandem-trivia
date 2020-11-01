import React, { useState } from 'react';
import './Landing.css';

function Landing(props) {

  const start = {
    title: 'Tandem for 400!',
    subtitle: 'A Trivia app created with ♥ for the Apprentice Software Engineer program.',
    text: "Are you ready to test your wits? I've got 10 questions for you - get as many correct as you can to win big!",
    buttonText: 'Ready to Start?',
  };

  const middle = {
    title: 'Halfway there!',
    subtitle: <p>You're halfway through the questions!</p>,
    text: <p>So far, your score is <span className="score">{props.score} / 10.</span> <br></br> Keep going!</p>,
    buttonText: 'Next Question',
  };

  const end = {
    title: 'You made it!',
    subtitle: <p>Congrats on completing the round! <br></br>Final score: <span className="score">{props.score} / 10</span></p>,
    text: <p>View the correct answers below. <br></br>Click the button for fresh questions. <br></br>  Thanks for playing!</p>,
    buttonText: 'Try again?',
  };

  const toGo = (numDone) => {
    if (numDone === 0) {
      return start;
    } else if (numDone === 5) {
      return middle;
    } else if (numDone === 10) {
      return end;
    }
  };

  const textData = toGo(props.qsAnswered);

  function results() {
    // display question, guessed answer, and correct answer
    let finalInfo = [];

    for (let i = 0; i < props.questions.length; i++) {
      const qText = props.questions[i].question;
      const qGuess = props.responses[i].picked;
      const qCorrect = props.questions[i].correct;
      const match = qGuess === qCorrect;

      const assembled =
        <div className="answer">
          <p className="question">#{i}: {qText}</p>
          <p className={`guess ${match ? 'correct-match' : 'wrong-match'}`}>You answered: {qGuess}</p>
          <p className="correct">The right answer is : {qCorrect}</p>
        </div>

      finalInfo.push(assembled);
    }
    console.log(finalInfo);
    return finalInfo;
  }

  function reset() {
    // reset all the values so we can start over
    props.setReset(true);
    props.setScore(0);
    props.setQsAnswered(0);
    props.setResponses([]);
    props.setPageType('question');
  }

  return (
    <div className="page-root">
      <h1 className="title">{textData.title}</h1>
      <div className="subtitle">{textData.subtitle}</div>
      <div className="text">{textData.text}</div>
      <div className={`answers`}>
        {props.qsAnswered === 10 ? results() : null}
      </div>
      <button className="start-button"
        onClick={() => {
          if (props.qsAnswered === 10) {
            reset();
          } else {
            props.setPageType('question')
          }
        }}>
        {textData.buttonText}
      </button>
    </div>
  );
}

export default Landing;
