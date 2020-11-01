import React from 'react';
import './Landing.css';

function Landing(props) {
  // Determines what text to display, based on where we are - start of game, middle of round, end of round 
  const start = {
    title: 'Tandem for 400!',
    subtitle: <p>A Trivia app created with ♥ for the Apprentice Software Engineer program.</p>,
    text: <p>Are you ready to test your wits? <br></br>I've got 10 questions for you - try to get as many correct as you can!</p>,
    buttonText: 'Ready to Start?',
  };

  const middle = {
    title: 'Halfway there!',
    subtitle: <p>5 questions down,<br></br> 5 to go!</p>,
    text: <p>So far, your score is <span className="score">{props.score} / 10.</span> <br></br> Keep going!</p>,
    buttonText: 'Next Question',
  };

  const end = {
    title: 'You made it!',
    subtitle: <p>Congrats on completing the round! <br></br>Final score: <span className="score">{props.score} / 10</span></p>,
    text: <p>Click the button at the bottom to play a new round. <br></br>  Thanks for playing!</p>,
    buttonText: 'Try again?',
  };

  // Logic to determine which text to render
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

  // When round is over, display some text based on the user's score
  const commentList = (score) => {
    let commentText = '';
    let range = '';
    if (score < 3) {
      range = 'low'
    } else if (score < 5) {
      range = 'mid-low'
    } else if (score < 7) {
      range = 'mid-high'
    } else if (score <= 9) {
      range = 'high'
    } else if (score === 10) {
      range = 'best'
    }
    switch (range) {
      case ('low'):
        commentText = `Ohhh, that was a rough round! Study up and try again - you learn something new each time!`;
        break;
      case ('mid-low'):
        commentText = `There's some tough questions in there, huh? Check out your answers and try again - I bet you can do better next time!`;
        break;
      case ('mid-high'):
        commentText = `Hey, not bad! A majority right is a reason to celebrate! See what you missed below and try again!`;
        break;
      case ('high'):
        commentText = `Nice work! You've played this before, haven't you? Keep trying for that perfect score!`;
        break;
      case ('best'):
        commentText = `Perfection - great job!! You are the trivia master!`;
        break;
    }
    return commentText;
  }

  const comments = commentList(props.score);

  // Show the final results of the round - the questions asked, the user's answer, and the correct answer
  function results() {
    let finalInfo = [];

    for (let i = 0; i < props.questions.length; i++) {
      const qText = props.questions[i].question;
      const qGuess = props.responses[i].picked;
      const qCorrect = props.questions[i].correct;
      const match = qGuess === qCorrect;

      const assembled =
        <div className="answer" key={i}>
          <p className="question">#{i}: {qText}</p>
          <p className={`guess ${match ? 'correct-match' : 'wrong-match'}`}>You answered: {qGuess}</p>
          <p className="correct">The right answer is : {qCorrect}</p>
        </div>

      finalInfo.push(assembled);
    }
    return finalInfo;
  }

  // Reset all the tracking values so we can start over
  function reset() {
    props.setReset(true);
    props.setScore(0);
    props.setQsAnswered(0);
    props.setResponses([]);
    props.setPageType('question');
  }

  // Render return
  return (
    <div className="page-root">
      <h1 className="title">{textData.title}</h1>
      <div className="subtitle">{textData.subtitle}</div>
      <div className={`comments ${props.qsAnswered !== 10 ? 'comments-hidden' : ''}`}>
        <hr></hr>
        {comments}
        <hr></hr>
      </div>
      <div className="text">{textData.text}</div>
      <div className={`answers ${props.qsAnswered !== 10 ? 'answers-hidden' : ''}`}>
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
