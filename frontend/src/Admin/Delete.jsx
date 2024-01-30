import * as React from "react";

import { LoadingButton } from "@mui/lab";
import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { usePostClient } from "../client/postClient";
import { Status } from "../client/status";
import { useQuestions } from "./useQuestions";
import { QuestionsOptionSelection } from "./QuestionsOptionSelection";
import { useTags } from "./tags";


const DB_URL = "https://datacube.uxlivinglab.online/db_api/crud/";
const API_KEY =
  "wp#!zf&}GPiy06'7'G%3:6]l;].V|<[KIsmlGZCcgm9Enx664fi1psHbJWBM1FZK";

export const Delete = () => {

  
  const { status, postData } = usePostClient();
  
  const [selectedQuestion1, setSelectedQuestion1] = React.useState(null);
  const [selectedQuestion2, setSelectedQuestion2] = React.useState(null);
  const [selectedQuestion3, setSelectedQuestion3] = React.useState(null);
  const [tag, setTag] = React.useState(null);

  const { selectedSetQuestions: Questions1, reloadQuestions: reloadQuestion1 } =
    useQuestions("question_1_weight");


    // console.log(Questions1);

  const { selectedSetQuestions: Questions2, reloadQuestions: reloadQuestion2 } =
    useQuestions("question_2_weight");
  const { selectedSetQuestions: Questions3, reloadQuestions: reloadQuestion3 } =
    useQuestions("question_3_weight");

  const {tags, reloadTags} = useTags();
  console.log(tags);

  const addQuestion1 = () => {
    if (q1 == "") {
      alert("empty field");
      return;
    }
    const reqData = {
      api_key: API_KEY,
      db_name: "customer_needs",
      coll_name: "question_1_weight",
      operation: "insert",
      data: { item: q1, regressions: [], weights: [] },
    };
    postData(reqData, DB_URL);
  };

  const addQuestion2 = () => {
    if (q2 == "") {
      alert("empty field");
      return;
    }

    const reqData = {
      api_key: API_KEY,
      db_name: "customer_needs",
      coll_name: "question_2_weight",
      operation: "insert",
      data: { item: q2, regressions: [], weights: [] },
    };
    postData(reqData, DB_URL);
  };

  const addQuestion3 = () => {
    if (q3 == "") {
      alert("empty field");
      return;
    }

    const reqData = {
      api_key: API_KEY,
      db_name: "customer_needs",
      coll_name: "question_3_weight",
      operation: "insert",
      data: { item: q3, regressions: [], weights: [] },
    };
    postData(reqData, DB_URL);
  };

  const addTag = () => {
    const reqData = {
      api_key: API_KEY,
      db_name: "customer_needs",
      coll_name: "tags_master",
      operation: "insert",
      data: { name: tag },
    };
    postData(reqData, DB_URL);
  };


  React.useEffect(() => {

  }, []);

//   console.log(Questions1)

  return (
    <Box padding={2}>
      <Box
        width="80%"
        display="flex"
        justifyContent={"space-between"}
        marginBottom={"24px"}
      >
        <QuestionsOptionSelection
          onSelectionChange={setSelectedQuestion1}
          questions={Questions1}
          selectedQuestion={selectedQuestion1}
        />
        <LoadingButton
          variant="contained"
          onClick={addQuestion1}
          loading={status == Status.Pending}
        >
          Delete Q1
        </LoadingButton>
      </Box>

      <Box
        width="80%"
        display="flex"
        justifyContent={"space-between"}
        marginBottom={"24px"}
      >
        <QuestionsOptionSelection
          onSelectionChange={setSelectedQuestion2}
          questions={Questions2}
          selectedQuestion={selectedQuestion2}
        />
        <LoadingButton
          variant="contained"
          onClick={addQuestion2}
          loading={status == Status.Pending}
        >
          Delete Q2
        </LoadingButton>
      </Box>

      <Box
        width="80%"
        display="flex"
        justifyContent={"space-between"}
        marginBottom={"24px"}
      >
        <QuestionsOptionSelection
          onSelectionChange={setSelectedQuestion3}
          questions={Questions3}
          selectedQuestion={selectedQuestion3}
        />
        <LoadingButton
          variant="contained"
          onClick={addQuestion3}
          loading={status == Status.Pending}
        >
          Delete Q3
        </LoadingButton>
      </Box>

      <Box
        width="80%"
        display="flex"
        justifyContent={"space-between"}
        marginBottom={"24px"}
      >
        <QuestionsOptionSelection
          onSelectionChange={setTag}
          questions={tags.map((tag) => {
            const res =  {_id: tag._id, item: tag.name};
            if(res.item === undefined){
              console.log(tag)
              console.log(res)

            }
            return res;
          })}
          selectedQuestion={tag}
        />

        <LoadingButton
          loading={status == Status.Pending}
          variant="contained"
          onClick={addTag}
        >
          Delete Tag
        </LoadingButton>
      </Box>
    </Box>
  );
};
