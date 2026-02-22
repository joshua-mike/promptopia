"use client";

export async function HandleGeneratePrediction(_prompt)
{
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
        return prediction;
    }

    while (prediction.status !== "succeeded" && prediction.status !== "failed")
    {
        await new Promise(resolve => setTimeout(resolve, 1000));
        response = await fetch("/api/predictions/" + prediction.id);

        if (response.status !== 200)
        {
            return response.statusText;
        }

        prediction = await response.json();
    }

    return prediction;
}
