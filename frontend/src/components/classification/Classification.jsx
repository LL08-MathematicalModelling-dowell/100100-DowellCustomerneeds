import React, { useState, useEffect } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

import { usePostClient } from "../../client/postClient";
import { Status } from "../../client/status";
import { SaveFinalBasketOrder } from "./SaveFinalBasketOrder";
import { SavePermutation } from "./SavePermutation";
import { SelectBasket2 } from "./SelectBasket2";
import { SelectItem } from "./SelectItem";
import { FinalizeSelectedItem } from "./FinalizeSelectedItem";
import { ClassificationResult } from "./ClassificationResult";
import { DisplayClassificationResult } from "./DisplayClassificationResult";
import { convertToClassificationPayloadType } from "./convertToClassificationPayloadType";

export const BASE_URL = "http://100061.pythonanywhere.com";

const StepName = {
  INITIATE : 1,
  BasketSelect : 2,
  BasketSelect2 : 3,
  BasketSave : 4,
  SavePermutation : 5,
  BasketSelect3 : 6,
  SavePermutation2 : 7,
  FinalBasketSave : 8,
  ItemSelect : 9,
  NextItemSelect : 9,
  ItemSave : 10,
  FinalResult: 11,
}

export const Classification = ({ selectedOptions }) => {
  const { status, responseData, postData } = usePostClient();
  const [currentStep, setCurrentStep] = useState(0);
  const [currentStepData, setCurrentStepData] = useState(undefined);

  const sendTypeRequest = () => {
    const data = {
      numberOfLevels: 3,
      classificationType: "N",
      dbInsertedId: responseData.dbInsertedId,
    };
    postData(data, BASE_URL + "/type/");
  };

  useEffect(() => {
    if (responseData == undefined) return;

    if (status == Status.Success && responseData !== undefined) {
      setCurrentStepData(responseData);
      setCurrentStep(currentStep + 1);
    }
  }, [status, responseData]);

  const isSubmitDisabled =
    !selectedOptions?.selectedQuestionOneData ||
    !selectedOptions?.selectedQuestionTwoData ||
    !selectedOptions?.selectedQuestionThreeData;

  return (
    <Box marginTop={"30px"}>
      {currentStep == 0 && (
        <LoadingButton
          color="primary"
          variant="contained"
          loading={status == Status.Pending}
          disabled={isSubmitDisabled}
          onClick={() =>
            postData(
              convertToClassificationPayloadType(selectedOptions),
              "http://100061.pythonanywhere.com/allbaskets/"
            )
          }
        >
          Classification
        </LoadingButton>
      )}
      {currentStep == StepName.INITIATE && (
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

      {currentStep == StepName.BasketSelect && (
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
                  setCurrentStep(StepName.BasketSelect2);
                }}
              />
            </Box>
          ))}
        </>
      )}

      {currentStep == StepName.BasketSelect2 && (
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
                  setCurrentStep(StepName.BasketSave);
                }}
              />
            </Box>
          ))}
        </>
      )}

      {currentStep == StepName.BasketSave && (
        <>
          <Typography variant="h6" mt={2} gutterBottom>
            {currentStepData?.message}
          </Typography>

          <SavePermutation
            insertedId={currentStepData?.insertedId}
            permutations={currentStepData?.permutations}
            onSavePermutationComplete={(message) => {
              setCurrentStep(StepName.SavePermutation);
              alert(message);
            }}
          />
        </>
      )}

      {currentStep == StepName.SavePermutation && (
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
                  setCurrentStepData(rd);
                  setCurrentStep(StepName.BasketSelect3);
                }}
              />
            </Box>
          ))}
        </>
      )}

      {currentStep == StepName.BasketSelect3 && (
        <>
          <Typography variant="h6" mt={2} gutterBottom>
            {currentStepData?.message}
          </Typography>

          <SavePermutation
            insertedId={currentStepData?.insertedId}
            permutations={currentStepData?.permutations}
            onSavePermutationComplete={(message) => {
              alert(message);
              setCurrentStep(StepName.SavePermutation2);
            }}
          />
        </>
      )}

      {currentStep == StepName.SavePermutation2 && (
        <>
          <Typography variant="h6" mt={2} gutterBottom>
            Save Final Basket Order
          </Typography>

          <SaveFinalBasketOrder
            dbInsertedId={currentStepData?.insertedId}
            onComplete={(rd) => {
              setCurrentStepData(rd);
              setCurrentStep(StepName.FinalBasketSave);
            }}
          />
        </>
      )}

      {currentStep == StepName.FinalBasketSave && (
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
              setCurrentStep(StepName.ItemSelect);
            }}
          />
        </>
      )}

      {currentStep == StepName.ItemSelect && (
        <>
          {currentStepData?.permutations !== undefined || (
            <React.Fragment>
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
                }}
              />

              <Typography>
                {currentStepData?.nextBasket
                  ? currentStepData?.nextBasket
                  : currentStepData?.nextBasekt}{" "}
                items
              </Typography>
              <SelectItem
                items={currentStepData?.nextBasketItems}
                basket={
                  currentStepData?.nextBasket == undefined
                    ? currentStepData?.nextBasekt
                    : currentStepData?.nextBasket
                }
                insertedId={currentStepData?.insertedId}
                onCompleteItemSelect={(rd) => {
                  setCurrentStepData({
                    ...rd,
                    insertedId: currentStepData?.insertedId,
                  });
                }}
              />
            </React.Fragment>
          )}

          {currentStepData?.permutations !== undefined && (
            <SavePermutation
              insertedId={currentStepData?.insertedId}
              onSavePermutationComplete={(meg) => {
                setCurrentStepData({
                  ...currentStepData,
                  permutations: undefined,
                });
                alert(meg);
              }}
              permutations={currentStepData.permutations}
            />
          )}
        </>
      )}

      {currentStepData?.nextBasketItems == undefined && currentStep == StepName.ItemSelect && (
        <>
          <FinalizeSelectedItem
            insertedId={currentStepData?.insertedId}
            onCompleteItemSelect={(rd) => {
              alert(rd?.message);
              setCurrentStep(StepName.ItemSave);
            }}
          />
        </>
      )}

      {currentStep == StepName.ItemSave && (
        <ClassificationResult
          insertedId={currentStepData?.insertedId}
          onCompleteItemSelect={(rd) => {
            console.log(rd);
            setCurrentStepData({
              ...rd,
              insertedId: currentStepData?.insertedId,
            });
            setCurrentStep(StepName.FinalResult);
          }}
        />
      )}

      {currentStep == StepName.FinalResult && (
        <DisplayClassificationResult results={currentStepData?.finalOutput} />
      )}
    </Box>
  );
};
