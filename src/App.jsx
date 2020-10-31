import React, { useState, useEffect } from 'react';
import './App.css';
import Landing from './components/Landing';
import Question from './components/Question';
import GetData from './data/dataUtil';

function App() {

  const [bgColor, setBgColor] = useState('');
  const [pageType, setPageType] = useState('landing');
  const [score, setScore] = useState(0);
  const [qsLeft, setQsLeft] = useState(10);
  const [qsAnswered, setQsAnswered] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState([]);

  const backgrounds = ['#D6EBD6', '#EDAD9E', '#D6E7FF'];
  const rootStyles = {
    background: bgColor
  }

  function randomColors() {
    let newBgIndex = Math.floor(Math.random() * backgrounds.length);
    let newBgColor = backgrounds[newBgIndex];
    setBgColor(newBgColor);
  };

  useEffect(() => {
    randomColors();
  }, [bgColor])

  async function loadQuestions() {
    let result = await GetData();
    setQuestions(result);
  }

  useEffect(() => {
    loadQuestions();
  }, []);


  function checkPageType() {
    if (pageType === 'landing') {
      return <Landing setPageType={setPageType} score={score} setScore={setScore} qsLeft={qsLeft} />
    } else {
      return <Question setPageType={setPageType} setScore={setScore} setQsLeft={setQsLeft} questions={questions} qsAnswered={qsAnswered} setQsAnswered={setQsAnswered} />
    }
  };

  return (
    <div className="react-root" style={rootStyles}>
      {checkPageType()}
    </div>
  );
}

export default App;
