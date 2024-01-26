import * as React from "react";
import { LoadingButton } from "@mui/lab";
import { Status } from "../client/status";
import { usePutClient } from "../client/postClient";
import { URL } from "./EditTags";

export function UpdateTaggedValues({
  tagValues,
  tagTypeValue,
  selectedQuestionSet,
  selectedQuestionOption,
  onSuccess,
}) {
  const { status, postData } = usePutClient();

  const saveData = () => {
    const numberTags = tagValues.map((value) => {
      return { tag: value.tag, value: parseFloat(value.value) };
    });
    const cleanedTags = numberTags.filter((value) => !isNaN(value.value));

    const updateData =
      tagTypeValue == "regressions"
        ? { regressions: cleanedTags }
        : tagTypeValue == "weights"
          ? { weights: cleanedTags }
          : { question_weight: cleanedTags[0].value}

    console.log(updateData)

    const reqData = {
      api_key:
        "wp#!zf&}GPiy06'7'G%3:6]l;].V|<[KIsmlGZCcgm9Enx664fi1psHbJWBM1FZK",
      db_name: "customer_needs",
      coll_name: selectedQuestionSet,
      operation: "update",
      query: { _id: selectedQuestionOption._id },
      update_data: updateData,
      data: "",
    };
    postData(reqData, URL);
  };

  React.useEffect(() => {
    status == Status.Success && alert("Update successful!");
    status == Status.Success && onSuccess();
  }, [status]);

  return (
    <LoadingButton
      onClick={saveData}
      loading={status == Status.Pending}
      variant="contained"
    >
      Update
    </LoadingButton>
  );
}
