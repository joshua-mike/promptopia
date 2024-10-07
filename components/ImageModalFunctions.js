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
        throw new Error(prediction.detail);
    }

    while (
        prediction.status !== "succeeded" &&
        prediction.status !== "failed"
    )
    {
        console.log("Waiting for prediction to complete");
        await new Promise(resolve => setTimeout(resolve, 1000));
        response = await fetch("/api/predictions/" + prediction.id);
        prediction = await response.json();
        if (response.status !== 200)
        {
            throw new Error(prediction.detail);
        }
        console.log("While loop prediction status:", prediction.status);
    }

    return prediction;
}