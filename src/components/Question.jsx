import React, { useState } from 'react';
import './Question.css';


function Question(props) {
  const [selected, setSelected] = useState('');
  const [error, setError] = useState(false);

  function randomizeChoices(arr) {
    let used = [];
    let order = [];
    for (let i = 0; i < arr.length; i++) {
      let nextNum = Math.floor(Math.random() * arr.length);
      if (!used.includes(nextNum)) {
        order.push(nextNum);
        used.push(nextNum);
      } else {
        i -= 1;
      }
    }
    let results = order.map(num => arr[num]);
    return results;
  }

  function getQuestion(resultArr, num) {
    const data = resultArr[num];
    const fullChoices = randomizeChoices([...data.incorrect, data.correct]);
    return {
      question: data.question,
      choices: fullChoices,
      correct: data.correct,
    }
  }

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

  function saveAnswer(e) {
    e.preventDefault();
    // make sure an answer has been selected - if not, don't allow to move on
    if (!selected) {
      let noAnswer = true;
      setError(noAnswer);
      return;
    }
    // store the user's response in setResponse, along with the question it goes with
    const chosenAnswer = { question: props.question.question, picked: selected };
    props.setResponses(() => props.responses.concat(chosenAnswer));
    // also verify if correct & update score
    let newScore = props.score;
    if (selected === props.question.correct) {
      newScore += 1;
    }
    props.setScore(newScore);
    // need to update qsAnswered
    let done = props.qsAnswered + 1;
    props.setQsAnswered(done);
    // clear out selected so it's fresh for the next question
    setSelected('');
    // also reset error settings, just in case
    let noError = false;
    setError(noError);
    // if after q 5 or all done, switch pageType to landing & pass qsLeft
    if (done === 5) {
      props.setPageType('landing');
      props.setQuestion(getQuestion(props.questions, done));
    } else if (done === 10) {
      props.setPageType('landing');
    } else {
      props.setPageType('question');
      props.setQuestion(getQuestion(props.questions, done));
    }

  }

  function showValue(e) {
    setSelected(e.currentTarget.value);
    let clearError = false;
    setError(clearError);
  }

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