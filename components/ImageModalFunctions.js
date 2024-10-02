import { set } from "mongoose";
import { useState } from "react";

export async function HandleGeneratePrediction(_prompt) 
{
    const [prediction, setPrediction] = useState(null);
    const [error, setError] = useState(null);

    console.log("Executing replicate prediction");
    const response = await fetch("/api/predictions",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                prompt: _prompt,
            }),
        });
    let predictionObject = await response.json();
    setPrediction(predictionObject);

    if (response.status !== 201)
    {
        console.log("Replicate API error:", prediction.detail);
        setError(prediction.detail);
        return;
    }
    else if (response.status === 201)
    {
        console.log("Prediction requested. Prediction status:", prediction.status);
        setPrediction(prediction);
    }

    while (
        prediction.status !== "succeeded" &&
        prediction.status !== "failed"
    )
    {
        console.log("Waiting for prediction to complete");
        await sleep(1000);
        const response = await fetch("/api/predictions/" + prediction.id);
        predictionObject = await response.json();
        setPrediction(predictionObject);
        if (response.status !== 200)
        {
            setError(prediction.detail);
            return;
        }
        console.log("While loop prediction status:", prediction.status);
    }
};