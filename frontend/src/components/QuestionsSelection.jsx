import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Box, CircularProgress } from "@mui/material";
import { useQuestion1 } from "../question-hooks/useQuestion1";
import { useQuestion2 } from "../question-hooks/useQuestion2";
import { useQuestion3 } from "../question-hooks/useQuestion3";

export const QuestionsSelection = ({ onSelectionChange }) => {
  const { data: questionOneData } = useQuestion1();
  const { data: questionTwoData } = useQuestion2();
  const { data: questionThreeData } = useQuestion3();

  const [selectedQuestionOneData, setSelectedQuestionOneData] = useState(null);
  const [selectedQuestionTwoData, setSelectedQuestionTwoData] = useState(null);
  const [selectedQuestionThreeData, setSelectedQuestionThreeData] =
    useState(null);

  const loading =
    questionOneData === undefined ||
    questionTwoData === undefined ||
    questionThreeData === undefined;

  useEffect(() => {
    onSelectionChange({
      selectedQuestionOneData,
      selectedQuestionTwoData,
      selectedQuestionThreeData,
    });
  }, [
    selectedQuestionOneData,
    selectedQuestionTwoData,
    selectedQuestionThreeData,
  ]);

  return (
    <Box display={"flex"} justifyContent={"space-between"}>
      <Autocomplete
        disablePortal
        key="questionOne"
        options={loading ? [] : questionOneData}
        value={selectedQuestionOneData}
        onChange={(e, v) => setSelectedQuestionOneData(v)}
        sx={{ width: "100%", maxWidth: 250, flexGrow: 1 }}
        getOptionLabel={(questionOneData) => questionOneData.item}
        isOptionEqualToValue={(option, value) => option._id === value._id}
        renderInput={(params) => (
          <TextField
            {...params}
            label={
              loading ? (
                <CircularProgress size={24} color="primary" />
              ) : (
                "I am from"
              )
            }
            size="small"
          />
        )}
        renderOption={(props, option) => {
          return (
            <li {...props} key={option._id}>
              {option.item}
            </li>
          );
        }}
      />
      <Autocomplete
        disablePortal
        key="questionTwo"
        options={loading ? [] : questionTwoData}
        value={selectedQuestionTwoData}
        onChange={(e, v) => setSelectedQuestionTwoData(v)}
        sx={{ width: "100%", maxWidth: 250, flexGrow: 1 }}
        getOptionLabel={(questionTwoData) => questionTwoData.item}
        isOptionEqualToValue={(option, value) => option._id === value._id}
        renderInput={(params) => (
          <TextField
            {...params}
            label={
              loading ? (
                <CircularProgress size={24} color="primary" />
              ) : (
                "How to"
              )
            }
            size="small"
          />
        )}
        renderOption={(props, option) => {
          return (
            <li {...props} key={option._id}>
              {option.item}
            </li>
          );
        }}
      />
      <Autocomplete
        disablePortal
        key="questionThree"
        options={loading ? [] : questionThreeData}
        value={selectedQuestionThreeData}
        onChange={(e, v) => setSelectedQuestionThreeData(v)}
        sx={{ width: "100%", maxWidth: 250, flexGrow: 1 }}
        getOptionLabel={(questionThreeData) => questionThreeData.item}
        isOptionEqualToValue={(option, value) => option._id === value._id}
        renderInput={(params) => (
          <TextField
            {...params}
            label={
              loading ? <CircularProgress size={24} color="primary" /> : "For"
            }
            size="small"
          />
        )}
        renderOption={(props, option) => {
          return (
            <li {...props} key={option._id}>
              {option.item}
            </li>
          );
        }}
      />
    </Box>
  );
};
