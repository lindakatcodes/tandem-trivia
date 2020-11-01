import React, { useState } from 'react';
import './Question.css';
import GetQuestion from './../data/questionUtil';

function Question(props) {
  const [selected, setSelected] = useState('');
  const [error, setError] = useState(false);

  // Maps over the possible choices and returns the JSX for each option
  const questionOptions = props.question.choices.map((option, index) => {
    return (
      <label className="radio" key={index}>
        <span className="radio-input">
          <input type="radio" id={option}
            name="answer" value={option}
            checked={selected === option} onChange={showValue} />
        </span>
        <span className="radio-label">{option}</span>
      </label>
    )
  })

  // On button press, saves provided answer & gets the next question
  function saveAnswer(e) {
    e.preventDefault();
    // Make sure an answer has been selected - if not, don't allow to move on
    if (!selected) {
      let noAnswer = true;
      setError(noAnswer);
      return;
    }
    // Store the user's response in setResponse, along with the question it goes with
    const chosenAnswer = { question: props.question.question, picked: selected };
    props.setResponses(() => props.responses.concat(chosenAnswer));
    // Also verify if correct & update score
    let newScore = props.score;
    if (selected === props.question.correct) {
      newScore += 1;
    }
    props.setScore(newScore);
    // Need to update qsAnswered
    let done = props.qsAnswered + 1;
    props.setQsAnswered(done);
    // Clear out selected so it's fresh for the next question
    setSelected('');
    // Also reset error settings, just in case
    let noError = false;
    setError(noError);
    // If after question 5, switch to landing page & load next question; If after question 10, switch to final landing page; Otherwise, get next question and stay on question page
    if (done === 5) {
      props.setPageType('landing');
      props.setQuestion(GetQuestion(props.questions, done));
    } else if (done === 10) {
      props.setPageType('landing');
    } else {
      props.setPageType('question');
      props.setQuestion(GetQuestion(props.questions, done));
    }
  }

  // On radio buttons, sets the selected item to the selected state variable, & clears error state in case it was set
  function showValue(e) {
    setSelected(e.currentTarget.value);
    let clearError = false;
    setError(clearError);
  }

  // Render return
  return (
    <div className="question-wrapper">
      <h2 className="q-text">{props.question.question}</h2>
      <div className="q-options">
        {questionOptions}
      </div>
      <button className="send-answer" onClick={saveAnswer}>Is This Your Final Answer?</button>
      <div className={`error ${error ? 'error-visible' : ''}`}>
        {error ? `You've got to pick an answer first - no skipping ahead!` : ''}
      </div>
    </div >
  )
}

export default Question