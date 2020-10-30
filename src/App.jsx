import React, { useState, useEffect } from 'react';
import './App.css';
import Landing from './components/Landing';
import Question from './components/Question';

function App() {

  const [bgColor, setBgColor] = useState('');
  const [pageType, setPageType] = useState('landing');
  const [score, setScore] = useState(0);
  const [qsLeft, setQsLeft] = useState(10);

  useEffect(() => {
    randomColors();
  })

  const backgrounds = ['#D6EBD6', '#EDAD9E', '#D6E7FF'];

  function randomColors() {
    let newBgIndex = Math.floor(Math.random() * backgrounds.length);
    let newBgColor = backgrounds[newBgIndex];
    setBgColor(newBgColor);
  };

  const rootStyles = {
    background: bgColor
  }

  function checkPageType() {
    if (pageType === 'landing') {
      return <Landing setPageType={setPageType} score={score} setScore={setScore} qsLeft={qsLeft} />
    } else {
      return <Question setPageType={setPageType} setScore={setScore} />
    }
  };

  return (
    <div className="react-root" style={rootStyles}>
      {checkPageType()}
    </div>
  );
}

export default App;
