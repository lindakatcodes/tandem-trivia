import React, { useState, useEffect } from 'react';
import './App.css';
import Landing from './components/Landing';
import Question from './components/Question';
import GetData from './data/dataUtil';

function App() {

  const [bgColor, setBgColor] = useState('');
  const [pageType, setPageType] = useState('landing');
  const [score, setScore] = useState(0);
  const [qsAnswered, setQsAnswered] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState({});
  const [responses, setResponses] = useState([]);
  const [reset, setReset] = useState(true);

  const backgrounds = ['#D6EBD6', '#EDAD9E', '#D6E7FF'];
  const rootStyles = {
    background: bgColor
  }

  function rotateColors() {
    let currentColor = bgColor;
    if (currentColor !== '' && qsAnswered > 0) {
      let currentBgIndex = backgrounds.findIndex(color => color === currentColor);
      let newBgColor = currentBgIndex === 2 ? backgrounds[0] : backgrounds[currentBgIndex + 1];
      setBgColor(newBgColor);
    } else if (currentColor !== '' && pageType === 'question') {
      let newBgColor = backgrounds[1];
      setBgColor(newBgColor);
    } else {
      let newBgColor = backgrounds[0];
      setBgColor(newBgColor);
    }
  };

  useEffect(() => {
    rotateColors();
  }, [qsAnswered, pageType])

  async function loadQuestions() {
    let result = await GetData();
    setQuestions(result);
    let single = getQuestion(result);
    setQuestion(single);
    setReset(false);
  }

  useEffect(() => {
    loadQuestions();
  }, [reset]);

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

  function getQuestion(resultArr) {
    const data = resultArr[qsAnswered];
    const fullChoices = randomizeChoices([...data.incorrect, data.correct]);
    return {
      question: data.question,
      choices: fullChoices,
      correct: data.correct,
    }
  }

  function checkPageType() {
    if (pageType === 'landing') {
      return <Landing setPageType={setPageType} score={score} setScore={setScore} qsAnswered={qsAnswered} setQsAnswered={setQsAnswered} questions={questions} responses={responses} setResponses={setResponses} setReset={setReset} />
    } else {
      return <Question setPageType={setPageType} score={score} setScore={setScore} question={question} setQuestion={setQuestion} qsAnswered={qsAnswered} setQsAnswered={setQsAnswered} responses={responses} setResponses={setResponses} questions={questions} />
    }
  };

  return (
    <div className="react-root" style={rootStyles}>
      {checkPageType()}
    </div>
  );
}

export default App;
