export async function HandleGeneratePrediction(_prompt) 
{
    //e.preventDefault();
    const response = await fetch("/api/predictions", {
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
        setError(prediction.detail);
        return null;
    }
    else if (response.status === 201)
    {
        console.log("Prediction created successfully");
        return prediction;
    }

    while (
        prediction.status !== "succeeded" &&
        prediction.status !== "failed"
    )
    {
        await sleep(1000);
        const response = await fetch("/api/predictions/" + prediction.id);
        prediction = await response.json();
        if (response.status !== 200)
        {
            setError(prediction.detail);
            return;
        }
        console.log({ prediction: prediction });
        return prediction;
    }
};