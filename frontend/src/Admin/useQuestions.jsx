import { useMemo } from "react";
import { useQuestion1 } from "../question-hooks/useQuestion1";
import { useQuestion2 } from "../question-hooks/useQuestion2";
import { useQuestion3 } from "../question-hooks/useQuestion3";

export const useQuestions = (selectedQuestionSet) => {
  const { data: question1, reload: reloadQ1 } = useQuestion1();
  const { data: question2, reload: reloadQ2 } = useQuestion2();
  const { data: question3, reload: reloadQ3 } = useQuestion3();

  const selectedSetQuestions = useMemo(() => {
    if (selectedQuestionSet == "question_1_weight" && question1 !== undefined)
      return question1;
    if (selectedQuestionSet == "question_2_weight" && question2 !== undefined)
      return question2;
    if (selectedQuestionSet == "question_3_weight" && question3 !== undefined)
      return question3;
    return [];
  }, [question1, question2, question3, selectedQuestionSet]);

  return {
    selectedSetQuestions: selectedSetQuestions,
    reloadQuestions: () => {
      reloadQ1();
      reloadQ2();
      reloadQ3();
    },
  };
};
