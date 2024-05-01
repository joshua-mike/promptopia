import { connectToDB } from "@utils/database";

export const POST = async (req) =>
{
    const {
        prompt,
        userId,
        tag
    } = await req.json();

    try
    {
        await connectToDB();
    } catch (error)
    {
        console.error("Error connecting to MongoDB", error);
        return false;
    }
};