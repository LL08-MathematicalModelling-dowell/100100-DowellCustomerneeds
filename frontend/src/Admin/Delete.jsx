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

  
  const [selectedQuestion1, setSelectedQuestion1] = React.useState(null);
  const [selectedQuestion2, setSelectedQuestion2] = React.useState(null);
  const [selectedQuestion3, setSelectedQuestion3] = React.useState(null);
  const [tag, setTag] = React.useState(null);

  const { selectedSetQuestions: Questions1, reloadQuestions: reloadQuestion1 } =
    useQuestions("question_1_weight");


  const deleteData = async (data, url) => {
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const responseData = await response.json();
      console.log(responseData); // Log the response data if needed
    } catch (error) {
      console.error('Error during deleteData:', error);
      // Handle error as needed
    }
  };
  // console.log(Questions1);

  const { selectedSetQuestions: Questions2, reloadQuestions: reloadQuestion2 } =
    useQuestions("question_2_weight");
  const { selectedSetQuestions: Questions3, reloadQuestions: reloadQuestion3 } =
    useQuestions("question_3_weight");

  const {tags, reloadTags} = useTags();
  console.log(tags);

  const deleteQuestion1 = () => {
    if (selectedQuestion1 === null) {
      alert("empty field");
      return;
    }
    const reqData = {
      api_key: API_KEY,
      db_name: "customer_needs",
      coll_name: "question_1_weight",
      operation: "delete",
      query: {
          _id: selectedQuestion1._id
    }
    };
    deleteData(reqData, DB_URL);
    reloadQuestion1();
    setSelectedQuestion1(null);
  };

  const deleteQuestion2 = () => {
    if (selectedQuestion2 === null) {
      alert("empty field");
      return;
    }

    const reqData = {
      api_key: API_KEY,
      db_name: "customer_needs",
      coll_name: "question_2_weight",
      operation: "delete",
      query: {
          _id: selectedQuestion2._id
      }
    };
    deleteData(reqData, DB_URL);
    reloadQuestion2();
    setSelectedQuestion2(null);


  };

  const deleteQuestion3 = () => {
    if (selectedQuestion3 === null) {
      alert("empty field");
      return;
    }

    const reqData = {
      api_key: API_KEY,
      db_name: "customer_needs",
      coll_name: "question_3_weight",
      operation: "delete",
      query: {
          _id: selectedQuestion3._id
      }
    };
    deleteData(reqData, DB_URL);
    reloadQuestion3();
    setSelectedQuestion3(null);


  };

  const deleteTag = () => {
    if (tag === null) {
      alert("empty field");
      return;
    }
    const reqData = {
      api_key: API_KEY,
      db_name: "customer_needs",
      coll_name: "tags_master",
      operation: "delete",
      query: {
          _id: tag._id
      }
    };
    deleteData(reqData, DB_URL);
    setTag(null);
    reloadTags();

  };


  React.useEffect(() => {

  }, [Questions1, Questions2, Questions3, tags]);

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
          label={"Select Question"}
        />
        <LoadingButton
          variant="contained"
          onClick={deleteQuestion1}
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
          label={"Select Question"}
        />
        <LoadingButton
          variant="contained"
          onClick={deleteQuestion2}
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
          label={"Select Question"}
        />
        <LoadingButton
          variant="contained"
          onClick={deleteQuestion3}
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
            return res;
          })}
          selectedQuestion={tag}
          label={"Select Tag"}
        />

        <LoadingButton
          loading={status == Status.Pending}
          variant="contained"
          onClick={deleteTag}
        >
          Delete Tag
        </LoadingButton>
      </Box>
    </Box>
  );
};
