import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import { usePostClient} from "../../client/postClient"
import { Status } from "../../client/status";
import { BASE_URL } from "./Classification";

export const ClassificationResult = ({ insertedId, onCompleteItemSelect }) => {
  const { status, responseData, postData } = usePostClient();

  useEffect(() => {
    if (status === Status.Success && responseData !== undefined) {
      onCompleteItemSelect(responseData);
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
                insertedId: insertedId,
              },
              BASE_URL + "/function/"
            );
          }}
        >
          Final output
        </LoadingButton>
      </Box>
    </>
  );
};
