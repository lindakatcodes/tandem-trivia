import React, { useState, useEffect } from 'react';
import './Question.css';


function Question(props) {

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

  function getQuestion() {
    let qNum = props.qsAnswered;
    let data = props.questions[qNum];

    let fullChoices = randomizeChoices([...data.incorrect, data.correct]);
    return {
      question: data.question,
      choices: fullChoices,
    }
  }

  const question = getQuestion();

  const questionOptions = question.choices.map((option, index) => {
    return (
      <label className="radio" key={index}>
        <span className="radio-input">
          <input type="radio" id="{option}" name="answer" value="{option}" />
          <span className="radio-control"></span>
        </span>
        <span className="radio-label">{option}</span>
      </label>
    )
  })

  function saveAnswer(input, e) {
    e.preventDefault();
    // store the user's response in setResponse, along with the question it goes with
    // also verify if correct & update score, maybe store status?
    // need to update qsLeft & qsAnswered
    // need to get a new question and load on the page
    // if after q 5 or all done, switch pageType to landing & pass qsLeft
  }

  return (
    <div className="question-wrapper">
      <h2 className="q-text">{question.question}</h2>
      <div className="q-options">
        {questionOptions}
      </div>
      <button className="send-answer">Is This Your Final Answer?</button>
    </div>
  )
}

export default Question