"use Client";

import { set } from "mongoose";
import { useState } from "react";

export async function HandleGeneratePrediction(_prompt) 
{
    console.log("Executing replicate prediction");
    let response = await fetch("/api/predictions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            prompt: _prompt,
        }),
    });
    let prediction = await response.json();

    if (response.status !== 201)
    {
        console.log("Replicate API error:", prediction.detail);
        return prediction;
    }

    while (prediction.status !== "succeeded" && prediction.status !== "failed")
    {
        console.log("Waiting for prediction to complete");
        await new Promise(resolve => setTimeout(resolve, 1000));
        response = await fetch("/api/predictions/" + prediction.id);
        console.log("Prediction response status:", response.status)
        console.log("Response", response)

        if (response.status !== 200)
        {
            console.log("While loop prediction response failed:", response.statusText);
            return response.statusText;
        }
        console.log("While loop prediction status:", prediction.status);
    }

    prediction = await response.json();
    return prediction;
}