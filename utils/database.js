import mongoose from "mongoose";

let IsConnected = false;

export const connectToDB = async () =>
{
  mongoose.set("strictQuery", true);
  if (IsConnected)
  {
    console.log("MongoDB is already connected");
    return;
  }
  try
  {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "share_prompt",
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    IsConnected = true;
    console.log("MongoDB is connected");
  }
  catch (error)
  {
    console.error("Error connecting to MongoDB", error);
  }


};
