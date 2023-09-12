import * as React from "react";
import Box from "@mui/material/Box";

import { useState } from "react";
import { AllTagsInput } from "./AllTagsInput";
import { UpdateTaggedValues } from "./UpdateTaggedValues";
import { QuestionsOptionSelection } from "./QuestionsOptionSelection";
import { useQuestions } from "./useQuestions";
import { QuestionSetSelection } from "./QuestionSetSelection";
import { TagTypeSelection } from "./TagTypeSelection";
import { useTags } from "./tags";

export const URL = "http://74.50.86.117/db_api/crud/";

const QUESTION_1_COLLECTION_NAME = "question_1_weight";

export const EditTagComponent = () => {
  const [selectedQuestion, setSelectedQuestion] = React.useState(null);
  const [selectedQuestionSet, setSelectedQuestionSet] = useState(
    QUESTION_1_COLLECTION_NAME
  );
  const { selectedSetQuestions, reloadQuestions } =
    useQuestions(selectedQuestionSet);

  const tags = useTags();

  const [tagTypeValue, setTagTypeValue] = useState("regressions");

  const [tagValues, setTagValues] = useState([]);

  React.useEffect(() => {
    if (selectedQuestion === null) return;
    const tempTags = mergeAllTagsAndQTags(tags, tagTypeValue, selectedQuestion);

    setTagValues(tempTags);
  }, [selectedQuestion, tagTypeValue]);

  return (
    <Box padding={2}>
      <React.Fragment>
        <TagTypeSelection
          setSelectedQuestionOption={setSelectedQuestion}
          tagTypeValue={tagTypeValue}
          setTagTypeValue={setTagTypeValue}
        />
        <QuestionSetSelection
          setSelectedQuestionOption={setSelectedQuestion}
          selectedQuestionSet={selectedQuestionSet}
          setSelectedQuestionSet={setSelectedQuestionSet}
        />
        <QuestionsOptionSelection
          onSelectionChange={setSelectedQuestion}
          questions={selectedSetQuestions}
          selectedQuestion={selectedQuestion}
        />

        {selectedQuestion == null || (
          <AllTagsInput
            tagValues={tagValues}
            onTagValuesChange={(newVal, index) => {
              const temTags = [...tagValues];
              temTags[index] = { tag: temTags[index].tag, value: newVal };

              setTagValues(temTags);
            }}
            selectedQuestionId={selectedQuestion._id}
          />
        )}

        <UpdateTaggedValues
          tagValues={tagValues}
          tagTypeValue={tagTypeValue}
          selectedQuestionSet={selectedQuestionSet}
          selectedQuestionOption={selectedQuestion}
          onSuccess={() => reloadQuestions()}
        />
      </React.Fragment>
    </Box>
  );
};

export default EditTagComponent;

function mergeAllTagsAndQTags(tags, tagTypeValue, selectedQuestionOption) {
  return tags.map((tag) => {
    const tagsSet =
      tagTypeValue == "regressions"
        ? selectedQuestionOption.regressions
        : selectedQuestionOption.weights;

    const itemTagValue = tagsSet.find((value) => value.tag == tag.name);

    if (itemTagValue === undefined) {
      return { tag: tag.name, value: null };
    }

    return { tag: tag.name, value: itemTagValue.value };
  });
}
