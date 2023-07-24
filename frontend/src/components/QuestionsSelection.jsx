import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Box, CircularProgress } from "@mui/material";

export const QuestionsSelection = ({ onSelectionChange }) => {
  const [questionOneData, setQuestionOneData] = useState([]);
  const [questionTwoData, setQuestionTwoData] = useState([]);
  const [questionThreeData, setQuestionThreeData] = useState([]);
  const [selectedQuestionOneData, setSelectedQuestionOneData] = useState(null);
  const [selectedQuestionTwoData, setSelectedQuestionTwoData] = useState(null);
  const [selectedQuestionThreeData, setSelectedQuestionThreeData] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true); 
    setTimeout(() => {
      
      fetch("http://127.0.0.1:8000/QuestionOne/")
        .then((response) => response.json())
        .then((data) => {
          setQuestionOneData(data);
          setLoading(false); 
        })
        .catch((error) => {
          console.error("Error fetching QuestionOne data:", error);
          setLoading(false); 
        });

      fetch("http://127.0.0.1:8000/QuestionTwo/")
        .then((response) => response.json())
        .then((data) => {
          setQuestionTwoData(data);
          setLoading(false); 
        })
        .catch((error) => {
          console.error("Error fetching QuestionTwo data:", error);
          setLoading(false);
        });

      fetch("http://127.0.0.1:8000/QuestionThree/")
        .then((response) => response.json())
        .then((data) => {
          setQuestionThreeData(data);
          setLoading(false); 
        })
        .catch((error) => {
          console.error("Error fetching QuestionThree data:", error);
          setLoading(false); 
        });
    }, 2000);
  }, []);

  useEffect(() => {
    onSelectionChange({ selectedQuestionOneData, selectedQuestionTwoData, selectedQuestionThreeData });
  }, [selectedQuestionOneData, selectedQuestionTwoData, selectedQuestionThreeData]);

  return (
    <Box display={"flex"} justifyContent={"space-between"}>
      <Autocomplete
        disablePortal
        id="questionOne"
        options={loading ? [] : questionOneData}
        value={selectedQuestionOneData}
        onChange={(e, v) => setSelectedQuestionOneData(v)}
        sx={{ width: "100%", maxWidth: 250, flexGrow: 1 }}
        getOptionLabel={(questionOneData) => questionOneData.Item || ""}
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
      />
      <Autocomplete
        disablePortal
        id="questionTwo"
        options={loading ? [] : questionTwoData}
        value={selectedQuestionTwoData}
        onChange={(e, v) => setSelectedQuestionTwoData(v)}
        sx={{ width: "100%", maxWidth: 250, flexGrow: 1 }}
        getOptionLabel={(questionTwoData) => questionTwoData.Item || ""}
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
      />
      <Autocomplete
        disablePortal
        id="questionThree"
        options={loading ? [] : questionThreeData}
        value={selectedQuestionThreeData}
        onChange={(e, v) => setSelectedQuestionThreeData(v)}
        sx={{ width: "100%", maxWidth: 250, flexGrow: 1 }}
        getOptionLabel={(questionThreeData) => questionThreeData.Item || ""}
        renderInput={(params) => (
          <TextField
            {...params}
            label={
              loading ? <CircularProgress size={24} color="primary" /> : "For"
            }
            size="small"
          />
        )}
      />
    </Box>
  );
};
