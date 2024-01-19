const calculateRegression = ({ weights, regressions }) => {
    let finalSum = 0;
  
    for (const weight of weights) {
      const reg = regressions.find((regression) => regression.tag === weight.tag);
  
      if (reg === undefined) continue;
  
      let w = weight.value;
      let r = reg.value;
  
      if (typeof w !== "number") w = 0;
      if (typeof r !== "number") r = 0;
  
      finalSum = finalSum + r * w;
    }
  
    return finalSum;
  };
  
  const calculateFinalScore = ({ selectedQuestionOneData, selectedQuestionTwoData, selectedQuestionThreeData }) => {
    const Q1Final = calculateRegression(selectedQuestionOneData);
    const Q2Final = calculateRegression(selectedQuestionTwoData);
    const Q3Final = calculateRegression(selectedQuestionThreeData);
  
    const FinalScoreFinal =
      selectedQuestionOneData.question_weight * Q1Final +
      selectedQuestionTwoData.question_weight * Q2Final +
      selectedQuestionThreeData.question_weight * Q3Final;
  
    return [Q1Final, Q2Final, Q3Final, FinalScoreFinal];
  };
  
  export default calculateFinalScore;
  