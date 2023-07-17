export function convertToClassificationPayloadType(selectedOptions) {
  const payload = {};

  const { selectedQ1Data, selectedQ2Data, selectedQ3Data } = selectedOptions;

  if (selectedQ1Data && selectedQ1Data.Item) {
    payload[selectedQ1Data.Item] =
      selectedQ1Data.tags?.map((tag) => ({
        item: tag,
        itemLink: "",
      })) || [];
  }

  if (selectedQ2Data && selectedQ2Data.Item) {
    payload[selectedQ2Data.Item] =
      selectedQ2Data.tags?.map((tag) => ({
        item: tag,
        itemLink: "",
      })) || [];
  }

  if (selectedQ3Data && selectedQ3Data.Item) {
    payload[selectedQ3Data.Item] =
      selectedQ3Data.tags?.map((tag) => ({
        item: tag,
        itemLink: "",
      })) || [];
  }
  return payload;
}
