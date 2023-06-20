import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import LoadingButton from '@mui/lab/LoadingButton';
import { usePostClient } from "../client/postClient";
import { Status } from "../client/status";
import { BASE_URL } from "./DwellClassic";


export const SelectItem = ({ items, basket, insertedId, onCompleteItemSelect }) => {
    const { status, responseData, postData } = usePostClient();
  
    useEffect(() => {
      if (status === Status.Success && responseData !== undefined) {
        onCompleteItemSelect(responseData);
      }
    }, [status, responseData]);
  
    return (
      <>
        <Box>
          {items?.map((item) => (
            <LoadingButton
              loading={status == Status.Pending}
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
            </LoadingButton>
          ))}
        </Box>
      </>
    );
  };