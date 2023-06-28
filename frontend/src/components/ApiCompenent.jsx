import React, { useState, useEffect } from "react";
import allbasket from "../utils/json/allBaskets.json";
import { Select } from "@mui/material";

// Base URL for the API
const BASE_URL = "http://100061.pythonanywhere.com";

// MakePostRequest is a React component that sends a POST request to the API
const MakePostRequest = (url , request) => {
    fetch(BASE_URL + url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
    })
    .then(
        (response) => response.json()
    )
    .then((data) => {
            console.log(data);
        return data;
        }
    )
    .catch((error) => {
        console.error("Error fetching data:", error);
    }
    );
};

// BasketComponent is a React component that renders the basket    
const AllBasket = () => {
    try{
        const Id = MakePostRequest(
            "/allbaskets/",
            allbasket
        );
        console.log(Id);
        return Id;
    } catch (error) {
        console.log(error);
    }
};

// ClassificationType is a React component that renders the classification type
const ClassificationType = (Id) => {
    try{
        const type = MakePostRequest(
                "/type/", 
                {
                    "numberOfLevels": 3,
                    "classificationType": "N",
                    "dbInsertedId": Id
                }
            );
        return type;
    } catch (error) {
        console.log(error);
    }
};

// SelectBasket is a React component that renders the selected basket
const SelectBasket = (NewSelection , PreviousSelection) => {
    try{
        PreviousSelection.selectedBasket = NewSelection;
        const select = MakePostRequest(
            "/basket/",
            PreviousSelection
        );
        return select;
    } catch (error) {
        console.log(error);
    }
};

// SelectPermutation is a React component that renders the selected permutation
const SavePermitation = (Id ,  SelectedPermitation) => {
    try{
        const save = MakePostRequest(
            "/savepermutations/",
            {
                "dbInsertedId": Id,
                "selectedPermutations": SelectedPermitation,
                "command": "savePermutation"
            }
        );
        return save;
    } catch (error) {
        console.log(error);
    }
};

// SaveFinalBasketOrder is a React component that renders the final basket order
const SaveFinalBasketOrder = (SelectedBasket , Basket , Id) => {
    try{
        const savefinal = MakePostRequest(
            "/basket/",
            {
                "selectedBasket": SelectedBasket,
                "baskets": Basket,
                "insertedId": Id
            }
        );
        return savefinal;
    } catch (error) {
        console.log(error);
    }
};

// End Of API Components
// Function To Test The API
const CallAPI = () => {
    try{
        // All Basket 
        const all_response = AllBasket();
        // Classification Type
        const classificationtype_response = ClassificationType(all_response.dbInsertedId);
    } catch (error) {
        console.log(error);
    }
};