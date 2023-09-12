import { LoadingButton } from "@mui/lab";
import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { usePostClient } from "../client/postClient";
import { Status } from "../client/status";

const DB_URL = "http://74.50.86.117/db_api/crud/";

export const InsertData = () => {
  const [q1, setQ1] = useState("");
  const [q2, setQ2] = useState("");
  const [q3, setQ3] = useState("");
  const [tag, setTag] = useState("");

  const { status, postData } = usePostClient();

  const addQuestion1 = () => {
    if (q1 == "") {
      alert("empty field");
      return;
    }
    const reqData = {
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
      db_name: "customer_needs",
      coll_name: "question_3_weight",
      operation: "insert",
      data: { item: q3, regressions: [], weights: [] },
    };
    postData(reqData, DB_URL);
  };

  const addTag = () => {
    const reqData = {
      db_name: "customer_needs",
      coll_name: "tags_master",
      operation: "insert",
      data: { name: tag },
    };
    postData(reqData, DB_URL);
  };

  return (
    <Box padding={2}>
      <Box
        width="80%"
        display="flex"
        justifyContent={"space-between"}
        marginBottom={"24px"}
      >
        <TextField
          variant="standard"
          sx={{ width: "80%" }}
          placeholder="question 1"
          value={q1}
          onChange={(e) => setQ1(e.target.value)}
        />
        <LoadingButton
          variant="contained"
          onClick={addQuestion1}
          loading={status == Status.Pending}
        >
          Add Q1
        </LoadingButton>
      </Box>

      <Box
        width="80%"
        display="flex"
        justifyContent={"space-between"}
        marginBottom={"24px"}
      >
        <TextField
          variant="standard"
          sx={{ width: "80%" }}
          placeholder="question 2"
          value={q2}
          onChange={(e) => setQ2(e.target.value)}
        />
        <LoadingButton
          variant="contained"
          onClick={addQuestion2}
          loading={status == Status.Pending}
        >
          Add Q2
        </LoadingButton>
      </Box>

      <Box
        width="80%"
        display="flex"
        justifyContent={"space-between"}
        marginBottom={"24px"}
      >
        <TextField
          variant="standard"
          sx={{ width: "80%" }}
          placeholder="question 3"
          value={q3}
          onChange={(e) => setQ3(e.target.value)}
        />
        <LoadingButton
          variant="contained"
          onClick={addQuestion3}
          loading={status == Status.Pending}
        >
          Add Q3
        </LoadingButton>
      </Box>

      <Box
        width="80%"
        display="flex"
        justifyContent={"space-between"}
        marginBottom={"24px"}
      >
        <TextField
          variant="standard"
          sx={{ width: "80%" }}
          placeholder="Add tag"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
        <LoadingButton
          loading={status == Status.Pending}
          variant="contained"
          onClick={addTag}
        >
          Add Tag
        </LoadingButton>
      </Box>
    </Box>
  );
};
