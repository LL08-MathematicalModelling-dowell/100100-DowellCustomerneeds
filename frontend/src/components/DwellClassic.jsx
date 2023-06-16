import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import { Button, Typography, CircularProgress } from "@mui/material";
import { usePostClient } from "../client/postClient";
import { Status } from "../client/status";
import { SaveFinalBasketOrder } from "./SaveFinalBasketOrder";
import { SavePermutation } from "./SavePermutation";
import { SelectBasket2 } from "./SelectBasket2";

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

export const BASE_URL = "http://100061.pythonanywhere.com";

const AllBasket = () => {
  const { status, responseData, postData } = usePostClient();
  const [currentStep, setCurrentStep] = useState(0);
  const [currentStepData, setCurrentStepData] = useState(undefined);
  const isLoading = status==Status.Pending;
  

 

  const allBasketRequest = () => {
    postData(
      classificationData,
      "http://100061.pythonanywhere.com/allbaskets/"
    );
  };

  const sendTypeRequest = () => {
    const data = {
      numberOfLevels: 3,
      classificationType: "N",
      dbInsertedId: responseData.dbInsertedId,
    };
    postData(data, BASE_URL + "/type/");
  };

  useEffect(() => {
    // setIsLoading(true);
    if (responseData == undefined) return;

    if (status == Status.Success && responseData !== undefined) {
      setCurrentStepData(responseData);
      setCurrentStep(currentStep + 1);
    }
    // setIsLoading(false)
  }, [status, responseData]);

  return (
    <Box>
      {currentStep == 0 && (
        <Button variant="contained" color="primary" onClick={allBasketRequest}>
        Test classification
        </Button>
      )}
      {currentStep == 1 && (
        <Box>
          <Typography> numberOfLevels: 3, classificationType: N</Typography>
          <Button variant="contained" color="primary" disabled={isLoading} onClick={sendTypeRequest}>
            
            {isLoading ? <CircularProgress size={24}/> : "Continue with classification type"}
          </Button>
        </Box>
      )}

      {currentStep == 2 && (
        <>
          <Typography variant="h6" mt={2} gutterBottom>
            {currentStepData?.message}
          </Typography>

          {currentStepData?.baskets?.map((value) => (
            <Box m={2} key={value}>
              <SelectBasket2
                basketName={value}
                previousResponse={currentStepData}
                dbInsertedId={currentStepData?.insertedId}
                onBasket1SelectComplete={(rd) => {
                  setCurrentStepData(rd);
                  setCurrentStep(currentStep + 1);
                }}
              />
            </Box>
          ))}
        </>
      )}

      {currentStep == 3 && (
        <>
          <Typography variant="h6" mt={2} gutterBottom>
            {currentStepData?.message}
          </Typography>

          {currentStepData?.baskets?.map((value) => (
            <Box m={2} key={value}>
              <SelectBasket2
                basketName={value}
                previousResponse={currentStepData}
                dbInsertedId={currentStepData?.insertedId}
                onBasket1SelectComplete={(rd) => {
                  console.log("rd", rd.permutations, currentStep);
                  setCurrentStepData(rd);
                  setCurrentStep(currentStep + 1);
                }}
              />
            </Box>
          ))}
        </>
      )}

      {currentStep == 4 && (
        <>
          <Typography variant="h6" mt={2} gutterBottom>
            {currentStepData?.message}
          </Typography>

          <SavePermutation
            insertedId={currentStepData?.insertedId}
            permutations={currentStepData?.permutations}
            onSavePermutationComplete={(message) => {
              setCurrentStep(currentStep + 1);
              alert(message);
            }}
          />
        </>
      )}

      {currentStep == 5 && (
        <>
          <Typography variant="h6" mt={2} gutterBottom>
            Select a basket
          </Typography>

          {currentStepData?.baskets?.map((value) => (
            <Box m={2} key={value}>
              <SelectBasket2
                basketName={value}
                previousResponse={currentStepData}
                dbInsertedId={currentStepData?.insertedId}
                onBasket1SelectComplete={(rd) => {
                  console.log("rd", rd, currentStep);
                  setCurrentStepData(rd);
                  setCurrentStep(currentStep + 1);
                }}
              />
            </Box>
          ))}
        </>
      )}

      {currentStep == 6 && (
        <>
          <Typography variant="h6" mt={2} gutterBottom>
            {currentStepData?.message}
          </Typography>

          <SavePermutation
            insertedId={currentStepData?.insertedId}
            permutations={currentStepData?.permutations}
            onSavePermutationComplete={(message) => {
              alert(message);
              setCurrentStep(currentStep + 1);
            }}
          />
        </>
      )}

      {currentStep == 7 && (
        <>
          <Typography variant="h6" mt={2} gutterBottom>
            Save Final Basket Order
          </Typography>

          <SaveFinalBasketOrder
            dbInsertedId={currentStepData?.insertedId}
            onComplete={(rd) => {
              setCurrentStepData(rd);
              setCurrentStep(currentStep + 1);
            }}
          />
        </>
      )}

      {currentStep == 8 && (
        <>
          <Typography variant="h6" mt={2} gutterBottom>
            {currentStepData?.message}
          </Typography>

          <SelectItem
            items={currentStepData?.items}
            basket={currentStepData.basket}
            insertedId={currentStepData?.insertedId}
            onCompleteItemSelect={(rd) => {
              setCurrentStepData({
                ...rd,
                insertedId: currentStepData?.insertedId,
              });
              setCurrentStep(currentStep + 1);
            }}
          />
        </>
      )}

      {currentStep == 9 && (
        <>
          <Typography variant="h6" mt={2} gutterBottom>
            {currentStepData?.message}
          </Typography>

          <Typography>{currentStepData?.currentBasket} items</Typography>
          <SelectItem
            items={currentStepData?.currentBasketItems}
            basket={currentStepData?.currentBasket}
            insertedId={currentStepData?.insertedId}
            onCompleteItemSelect={(rd) => {
              setCurrentStepData({
                ...rd,
                insertedId: currentStepData?.insertedId,
              });
              setCurrentStep(currentStep + 1);
            }}
          />

          <Typography>{currentStepData?.nextBasket} basket items</Typography>
          <SelectItem
            items={currentStepData?.nextBasketItems}
            basket={currentStepData?.nextBasket}
            insertedId={currentStepData?.insertedId}
            onCompleteItemSelect={(rd) => {
              setCurrentStepData({
                ...rd,
                insertedId: currentStepData?.insertedId,
              });
              setCurrentStep(currentStep + 1);
            }}
          />
        </>
      )}

      {currentStep == 10 && (
        <>
          <Typography variant="h6" mt={2} gutterBottom>
            {currentStepData?.message}
          </Typography>

          <SavePermutation
            insertedId={currentStepData?.insertedId}
            permutations={currentStepData?.permutations}
            onSavePermutationComplete={(message) => {
              alert(message);
              setCurrentStep(currentStep + 1);
            }}
          />

          <Button
            onClick={() => setCurrentStep(currentStep + 1)}
            variant="outlined"
          >
            Next
          </Button>
        </>
      )}

      {currentStep == 11 && (
        <>
          <Typography variant="h6" mt={2} gutterBottom>
            {currentStepData?.message}
          </Typography>

          <Typography>{currentStepData?.currentBasket} items</Typography>
          <SelectItem
            items={currentStepData?.currentBasketItems}
            basket={currentStepData.currentBasket}
            insertedId={currentStepData?.insertedId}
            onCompleteItemSelect={(rd) => {
              setCurrentStepData({
                ...rd,
                insertedId: currentStepData?.insertedId,
              });
              setCurrentStep(currentStep + 1);
            }}
          />

          <Typography>{currentStepData?.nextBasket} items</Typography>
          <SelectItem
            items={currentStepData?.nextBasketItems}
            basket={currentStepData?.nextBasket}
            insertedId={currentStepData?.insertedId}
            onCompleteItemSelect={(rd) => {
              setCurrentStepData({
                ...rd,
                insertedId: currentStepData?.insertedId,
              });
              setCurrentStep(currentStep + 1);
            }}
          />
        </>
      )}
    </Box>
  );
};

const SelectItem = ({ items, basket, insertedId, onCompleteItemSelect }) => {
  const { status, responseData, postData } = usePostClient();
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    if (status === Status.Success && responseData !== undefined) {
      onCompleteItemSelect(responseData);
    }
  }, [status, responseData]);

  return (
    <>
      <Box>
        {items?.map((item) => (
          <Button
            key={item}
            variant="contained"
            color="primary"
            sx={{ width: "100%", maxWidth: 250 }}
            onClick={() => {
              postData(
                {
                  selectedItem: item,
                  basket: basket,
                  insertedId: insertedId,
                  status: true,
                },
                BASE_URL + "/item/"
              );
            }}
          >
          {item}
            
          </Button>
        ))}
      </Box>
    </>
  );
};

