function getData() {
  
  let fullData = fetch('Apprentice_TandemFor400_Data.json')
  .then(res => res.json())
  .then(data => {
    
      let getTen = [];
      let idxUsed = [];

      for (let i = 0; i < 10; i++) {
        const randNum = Math.floor(Math.random() * data.length);
        if (!idxUsed.includes(randNum)) {
          const newQuestion = data[randNum];
          getTen.push(newQuestion);
          idxUsed.push(randNum);
        } else {
          i -= 1;
        }
      }
      return getTen;
    })
    .catch(err => console.log(err));

  return fullData;
}

export default getData;