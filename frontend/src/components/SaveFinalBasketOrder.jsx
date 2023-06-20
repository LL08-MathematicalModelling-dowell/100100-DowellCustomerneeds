import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { usePostClient } from "../client/postClient";
import { Status } from "../client/status";
import { BASE_URL } from "./DwellClassic";
import LoadingButton from "@mui/lab/LoadingButton";

export const SaveFinalBasketOrder = ({ dbInsertedId, onComplete }) => {
  const { status, responseData, postData } = usePostClient();

  useEffect(() => {
    if (status === Status.Success && responseData !== undefined) {
      onComplete(responseData);
    }
  }, [status, responseData]);

  return (
    <>
      <Box>
        <LoadingButton
          loading={status == Status.Pending}
          variant="contained"
          color="primary"
          sx={{ width: "100%", maxWidth: 250 }}
          onClick={() => {
            postData(
              {
                selectedBasket: "BasketOrder",
                insertedId: dbInsertedId,
                baskets: ["BasketOrder"],
              },
              BASE_URL + "/basket/"
            );
          }}
        >
          Continue
        </LoadingButton>
      </Box>
    </>
  );
};
