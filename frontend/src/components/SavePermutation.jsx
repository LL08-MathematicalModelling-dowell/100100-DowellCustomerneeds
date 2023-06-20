import React, { useEffect, useState } from "react";
import { usePostClient } from "../client/postClient";
import { Status } from "../client/status";
import { BASE_URL } from "./DwellClassic";
import LoadingButton from '@mui/lab/LoadingButton';


export const SavePermutation = ({
  permutations,
  insertedId,
  onSavePermutationComplete,
}) => {
  const { status, responseData, postData } = usePostClient();



  useEffect(() => {
    if (responseData == undefined) return;
    if (status == Status.Success) {
      onSavePermutationComplete(responseData?.message);
    }
    
  }, [status, responseData]);

  const savePermutation = (permutation) => {
    const data = {
      selectedPermutation: permutation,
      inserted_id: insertedId,
      command: "savePermutation",
    };
    postData(data, BASE_URL + "/savepermutations/");
  };

  return (
    <>
      {permutations?.map((permutation, index) => {
        return (
          <LoadingButton loading={status==Status.Pending}
            variant="contained"
            color="primary"
            onClick={() => savePermutation(permutation)}
            key={index}
          >
            {permutation.map((item) => item + ", ")}
          </LoadingButton>
        );
      })}
    </>
  );
};
