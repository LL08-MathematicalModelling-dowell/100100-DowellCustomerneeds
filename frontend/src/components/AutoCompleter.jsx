import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import { Button, CircularProgress } from "@mui/material";
import { AllBasket } from "./permutation/AllBasket";

export default function AutoCompleter() {
  const [questionOneData, setQuestionOneData] = useState([]);
  const [questionTwoData, setQuestionTwoData] = useState([]);
  const [questionThreeData, setQuestionThreeData] = useState([]);
  const [selectedQuestionOneData, setSelectedQuestionOneData] = useState(null);
  const [selectedQuestionTwoData, setSelectedQuestionTwoData] = useState(null);
  const [selectedQuestionThreeData, setSelectedQuestionThreeData] = useState(null);

  const [loading, setLoading] = useState(false);
  const isSubmitDisabled =
    !selectedQuestionOneData || !selectedQuestionTwoData || !selectedQuestionThreeData;

  const [submitBtnClicked, setSubmitBtnClicked] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const fetchData = async (url, setData) => {
        try {
          const response = await fetch(url);
          const data = await response.json();
          setData(data);
        } catch (error) {
          console.error(`Error fetching data from ${url}:`, error);
        } finally {
          setLoading(false);
        }
      };

      const questionOneUrl = "http://127.0.0.1:8000/q1/";
      const questionTwoUrl = "http://127.0.0.1:8000/q2/";
      const questionThreeUrl = "http://127.0.0.1:8000/q3/";

      Promise.all([
        fetchData(questionOneUrl, setQuestionOneData),
        fetchData(questionTwoUrl, setQuestionTwoData),
        fetchData(questionThreeUrl, setQuestionThreeData),
      ]).catch((error) => {
        console.error("Error fetching data:", error);
      });
    }, 2000);
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSubmitBtnClicked(true);

    const formatTags = (tags) =>
      tags?.map((tag) => ({
        item: tag,
        itemLink: "",
      })) || [];

    const payload = {};

    if (selectedQuestionOneData && selectedQuestionOneData.Item) {
      payload[selectedQuestionOneData.Item] = formatTags(selectedQuestionOneData.tags);
    }

    if (selectedQuestionTwoData && selectedQuestionTwoData.Item) {
      payload[selectedQuestionTwoData.Item] = formatTags(selectedQuestionTwoData.tags);
    }

    if (selectedQuestionThreeData && selectedQuestionThreeData.Item) {
      payload[selectedQuestionThreeData.Item] = formatTags(selectedQuestionThreeData.tags);
    }

    // Data formatted for classification API
    const { q1, q2, q3, ...cleanedData } = payload;

    console.log(cleanedData);

    setLoading(true);
    fetch("http://100061.pythonanywhere.com/allbaskets/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data posted successfully:", data);
        alert("Data saved successfully!");
        setSelectedQuestionOneData(null);
        setSelectedQuestionTwoData(null);
        setSelectedQuestionThreeData(null);
      })
      .catch((error) => {
        console.error("Error posting data:", error);
      })
      .finally(() => {
        setLoading(false);
        setSubmitBtnClicked(false);
      });
  };

  return (
    <Card sx={{ minWidth: 400, maxWidth: 1200, m: 8 }}>
      <Box
        component="form"
        onSubmit={handleFormSubmit}
        m={1}
        pr={1}
        p={4}
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        alignItems="center"
        justifyContent="center"
        gap={2}
        flexWrap="wrap"
      >
        <Autocomplete
          disablePortal
          id="q1"
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
          id="q2"
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
          id="q3"
          options={loading ? [] : questionThreeData}
          value={selectedQuestionThreeData}
          onChange={(e, v) => setSelectedQuestionThreeData(v)}
          sx={{ width: "100%", maxWidth: 250, flexGrow: 1 }}
          getOptionLabel={(questionThreeData) => questionThreeData.Item || ""}
          renderInput={(params) => (
            <TextField
              {...params}
              label={
                loading ? (
                  <CircularProgress size={24} color="primary" />
                ) : (
                  "For"
                )
              }
              size="small"
            />
          )}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleFormSubmit}
          disabled={isSubmitDisabled}
          sx={{ width: "100%", maxWidth: 250 }}
        >
          {loading ? (
            <CircularProgress size={24} color="primary" />
          ) : (
            "Submit"
          )}
        </Button>
        <AllBasket submitBtnClicked={submitBtnClicked} />
      </Box>
    </Card>
  );
}
