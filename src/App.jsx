import React, { useState, useEffect } from 'react';
import './App.css';
import Landing from './components/Landing';
import Question from './components/Question';
import GetData from './data/dataUtil';
import GetQuestion from './data/questionUtil';

function App() {

  const [bgColor, setBgColor] = useState('');
  const [pageType, setPageType] = useState('landing');
  const [score, setScore] = useState(0);
  const [qsAnswered, setQsAnswered] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState({});
  const [responses, setResponses] = useState([]);
  const [reset, setReset] = useState(true);

  // wanted background color to change per page, so set a few options
  const backgrounds = ['#D6EBD6', '#EDAD9E', '#D6E7FF'];

  const rootStyles = {
    'backgroundColor': bgColor
  }

  // determines what color to use - logic makes sure the color changes between first load and first question, and makes sure we don't ever go longer than the color array length
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

  // this gets the 10 questions for the round and loads up the first question - only ever called when we're just starting a round.
  async function loadQuestions() {
    let result = await GetData();
    setQuestions(result);
    let single = GetQuestion(result, 0);
    setQuestion(single);
    setReset(false);
  }

  useEffect(() => {
    loadQuestions();
  }, [reset]);

  // Determines if we need to load a landing page or question page
  function checkPageType() {
    if (pageType === 'landing') {
      return <Landing setPageType={setPageType} score={score} setScore={setScore} qsAnswered={qsAnswered} setQsAnswered={setQsAnswered} questions={questions} responses={responses} setResponses={setResponses} setReset={setReset} />
    } else {
      return <Question setPageType={setPageType} score={score} setScore={setScore} question={question} setQuestion={setQuestion} qsAnswered={qsAnswered} setQsAnswered={setQsAnswered} responses={responses} setResponses={setResponses} questions={questions} />
    }
  };

  // Render return
  return (
    <div className="react-root" style={rootStyles}>
      {checkPageType()}
    </div>
  );
}

export default App;
