// Takes in an array containing the incorrect choices and the correct choice, mixes them up, and returns an array. Since it uses random, checks to make sure we don't use the same values more than once.
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

// Takes in the 10 question array and the current question number, and singles out the next question. Returns the question itself, a mixed up variation of the choices, and the correct answer
function getQuestion(resultArr, num) {
  const data = resultArr[num];
  const fullChoices = randomizeChoices([...data.incorrect, data.correct]);
  return {
    question: data.question,
    choices: fullChoices,
    correct: data.correct,
  }
}

export default getQuestion;