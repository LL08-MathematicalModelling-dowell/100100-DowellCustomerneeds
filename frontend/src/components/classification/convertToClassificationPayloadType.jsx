export function convertToClassificationPayloadType(selectedOptions) {
  const payload = {};

  const { selectedQuestionOneData, selectedQuestionTwoData, selectedQuestionThreeData } = selectedOptions;

  if (selectedQuestionOneData && selectedQuestionOneData.Item) {
    payload[selectedQuestionOneData.Item] =
    selectedQuestionOneData.tags?.map((tag) => ({
        item: tag,
        itemLink: "",
      })) || [];
  }

  if (selectedQuestionTwoData && selectedQuestionTwoData.Item) {
    payload[selectedQuestionTwoData.Item] =
    selectedQuestionTwoData.tags?.map((tag) => ({
        item: tag,
        itemLink: "",
      })) || [];
  }

  if (selectedQuestionThreeData && selectedQuestionThreeData.Item) {
    payload[selectedQuestionThreeData.Item] =
    selectedQuestionThreeData.tags?.map((tag) => ({
        item: tag,
        itemLink: "",
      })) || [];
  }
  return payload;
}
