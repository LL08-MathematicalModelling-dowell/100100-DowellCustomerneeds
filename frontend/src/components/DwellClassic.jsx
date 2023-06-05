import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";
import { usePostClient } from "../client/postClient";
import { Status } from "../client/status";

export const DwellClassic = () => {
  return (
    <>
      <Card sx={{ minWidth: 400, maxWidth: 1200, m: 8 }}>
        <Box
          component="form"
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
          <AllBasket />
        </Box>
      </Card>
    </>
  );
};

const classificationData = {
  country: [
    {
      item: "India",
      itemLink: "Asia",
    },
    {
      item: "USA",
      itemLink: "North America",
    },
    {
      item: "Germany",
      itemLink: "Europe",
    },
  ],
  state: [
    {
      item: "Uttar Pradesh",
      itemLink: "India",
    },
    {
      item: "Maharashtra",
      itemLink: "India",
    },
    {
      item: "Georgia",
      itemLink: "USA",
    },
    {
      item: "Nevada",
      itemLink: "USA",
    },
    {
      item: "Bavaria",
      itemLink: "Germany",
    },
    {
      item: "Brandenburg",
      itemLink: "Germany",
    },
  ],
  city: [
    {
      item: "Agra",
      itemLink: "Uttar Pradesh",
    },
    {
      item: "Noida",
      itemLink: "Uttar Pradesh",
    },
    {
      item: "Pune",
      itemLink: "Maharashtra",
    },
    {
      item: "Mumbai",
      itemLink: "Maharashtra",
    },
    {
      item: "Atlanta",
      itemLink: "Georgia",
    },
    {
      item: "Carson City",
      itemLink: "Nevada",
    },
    {
      item: "Munich",
      itemLink: "Bavaria",
    },
    {
      item: "Potsdam",
      itemLink: "Brandenburg",
    },
  ],
};

const BASE_URL = "http://100061.pythonanywhere.com";

const AllBasket = () => {
  const { status, responseData, postData } = usePostClient();
  const {
    status: typeResponseStatus,
    responseData: typeResponseData,
    postData: typePostData,
  } = usePostClient();

  const allBasketRequest = () => {
    postData(
      classificationData,
      "http://100061.pythonanywhere.com/allbaskets/"
    );
  };

  useEffect(() => {
    if (responseData == undefined) return;

    if (status == Status.Success) {
      const data = {
        numberOfLevels: 3,
        classificationType: "N",
        dbInsertedId: responseData.dbInsertedId,
      };
      typePostData(data, BASE_URL + "/type/");
    }
  }, [status, responseData]);

  useEffect(() => {
    console.log(typeResponseData);
  }, [typeResponseStatus, typeResponseData]);

  return (
    <Box>
      <Button variant="contained" color="primary" onClick={allBasketRequest}>
        Test classification
      </Button>

      <Typography variant="h6" mt={2} gutterBottom>
        {typeResponseData?.message}
      </Typography>
      {typeResponseData?.baskets.map((value) => (
        <Box m={2} key={value}>
          <SelectBasket2
            basketName={value}
            previousResponse={typeResponseData}
            dbInsertedId={typeResponseData?.insertedId}
          />
        </Box>
      ))}
    </Box>
  );
};

// eslint-disable-next-line react/prop-types
const SelectBasket2 = ({ basketName, previousResponse, dbInsertedId }) => {
  const { status, responseData, postData } = usePostClient();
  const {
    status: typeResponseStatus,
    responseData: typeResponseData,
    postData: typePostData,
  } = usePostClient();

  return (
    <>
      <Box>
        <Button
          variant="contained"
          color="primary"
          sx={{ width: "100%", maxWidth: 250 }}
          onClick={() => {
            postData(
              {
                selectedBasket: basketName,
                insertedId: dbInsertedId,
                baskets: previousResponse?.baskets,
              },
              BASE_URL + "/basket/"
            );
          }}
        >
          {basketName}
        </Button>
        <Typography variant="h6" mt={2} gutterBottom>
          {responseData?.message}
        </Typography>
        {typeResponseData?.baskets.map((value) => (
          <Box m={2} key={value}>
            <SelectBasket3
              basketName={value}
              previousResponse={typeResponseData}
              dbInsertedId={typeResponseData?.insertedId}
            />
          </Box>
        ))}
      </Box>
    </>
  );
};

// eslint-disable-next-line react/prop-types
const SelectBasket3 = ({ basketName, previousResponse, dbInsertedId }) => {
  const { status, responseData, postData } = usePostClient();
  const {
    status: typeResponseStatus,
    responseData: typeResponseData,
    postData: typePostData,
  } = usePostClient();

  return (
    <>
      <Box>
        <Button
          variant="contained"
          color="primary"
          sx={{ width: "100%", maxWidth: 250 }}
          onClick={() => {
            postData(
              {
                selectedBasket: basketName,
                insertedId: dbInsertedId,
                baskets: previousResponse?.baskets,
              },
              BASE_URL + "/basket/"
            );
          }}
        >
          {basketName}
        </Button>
        <Typography variant="h6" mt={2} gutterBottom>
          {responseData?.message}
        </Typography>
        {typeResponseData?.baskets.map((value) => (
          <Box m={2} key={value}>
            <SavePermutation
              basketName={value}
              previousResponse={typeResponseData}
              dbInsertedId={typeResponseData?.insertedId}
            />
          </Box>
        ))}
      </Box>
    </>
  );
};

const SavePermutation = ({ basketName, previousResponse, dbInsertedId }) => {
  const { status, responseData, postData } = usePostClient();
  const {
    status: typeResponseStatus,
    responseData: typeResponseData,
    postData: typePostData,
  } = usePostClient();

  return (
    <>
      <Box>
        <Button
          variant="contained"
          color="primary"
          sx={{ width: "100%", maxWidth: 250 }}
          onClick={() => {
            postData(
              {
                insertedId: dbInsertedId,
                baskets: previousResponse?.baskets,
              },
              BASE_URL + "/savepermutations/"
            );
          }}
        >
          {basketName}
        </Button>
        <Typography variant="h6" mt={2} gutterBottom>
          {responseData?.message}
        </Typography>
        {typeResponseData?.baskets.map((value) => (
          <Box m={2} key={value}>
            <SaveBasket
              basketName={value}
              previousResponse={typeResponseData}
              dbInsertedId={typeResponseData?.insertedId}
            />
          </Box>
        ))}
      </Box>
    </>
  );
};
