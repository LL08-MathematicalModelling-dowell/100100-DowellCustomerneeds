import React, { useState, useEffect } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";

import { usePostClient } from "../../client/postClient";
import { Status } from "../../client/status";
import { SaveFinalBasketOrder } from "./SaveFinalBasketOrder";
import { SavePermutation } from "./SavePermutation";
import { SelectBasket2 } from "./SelectBasket2";
import { SelectItem } from "./SelectItem";
import { FinalizeSelectedItem } from "./FinalizeSelectedItem";
import { ClassificationResult } from "./ClassificationResult";
import { DisplayClassificationResult } from "./DisplayClassificationResult";
import { classificationData } from "../../data/classificationData";

export const BASE_URL = "http://100061.pythonanywhere.com";

export const AllBasket = ({ submitBtnClicked }) => {
  const { status, responseData, postData } = usePostClient();
  const [currentStep, setCurrentStep] = useState(0);
  const [currentStepData, setCurrentStepData] = useState(undefined);

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
    if (submitBtnClicked) {
      allBasketRequest();
    }
  }, [submitBtnClicked]);

  useEffect(() => {
    if (responseData == undefined) return;

    if (status == Status.Success && responseData !== undefined) {
      setCurrentStepData(responseData);
      setCurrentStep(currentStep + 1);
    }
  }, [status, responseData]);

  return (
    <Box marginTop={"30px"}>
      {currentStep == 0 && (
        <LoadingButton
          color="primary"
          variant="contained"
          loading={status == Status.Pending}
          onClick={allBasketRequest}
        >
          Classification
        </LoadingButton>
      )}
      {currentStep == 1 && (
        <Box>
          <Typography> numberOfLevels: 3, classificationType: N</Typography>
          <LoadingButton
            loading={status == Status.Pending}
            variant="contained"
            color="primary"
            onClick={sendTypeRequest}
          >
            Continue with classification type
          </LoadingButton>
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

          <Button
            onClick={() => setCurrentStep(currentStep + 1)}
            variant="outlined"
          >
            Next
          </Button>
        </>
      )}

      {currentStep == 12 && (
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

          <Button
            onClick={() => setCurrentStep(currentStep + 1)}
            variant="outlined"
          >
            Next
          </Button>
        </>
      )}

      {currentStep == 13 && (
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

      {currentStep == 14 && (
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

          <Button
            onClick={() => setCurrentStep(currentStep + 1)}
            variant="outlined"
          >
            Next
          </Button>
        </>
      )}

      {currentStep == 15 && (
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

      {currentStep == 16 && (
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

          <Button
            onClick={() => setCurrentStep(currentStep + 1)}
            variant="outlined"
          >
            Next
          </Button>
        </>
      )}

      {currentStep == 17 && (
        <>
          <Typography variant="h6" mt={2} gutterBottom>
            {currentStepData?.message}
          </Typography>

          <Typography>{currentStepData?.currentBasket} items</Typography>
          <FinalizeSelectedItem
            insertedId={currentStepData?.insertedId}
            onCompleteItemSelect={(rd) => {
              alert(rd?.message);
              setCurrentStep(currentStep + 1);
            }}
          />
        </>
      )}

      {currentStep == 18 && (
        <ClassificationResult
          insertedId={currentStepData?.insertedId}
          onCompleteItemSelect={(rd) => {
            console.log(rd);
            setCurrentStepData({
              ...rd,
              insertedId: currentStepData?.insertedId,
            });
            setCurrentStep(currentStep + 1);
          }}
        />
      )}

      {currentStep == 19 && (
        <DisplayClassificationResult results={currentStepData?.finalOutput} />
      )}
    </Box>
  );
};
