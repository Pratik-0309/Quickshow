import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose
      .connect(`${process.env.MONGO_URI}/${process.env.MONGO_NAME}`)
      .then(() => {
        console.log("MongoDB connected Successfully");
      })
      .catch((error) => {
        console.log("Connection Error: ", error.message);
        process.exit(1);
      });
  } catch (error) {
    console.log("MongoDB connection Error: ", error.message);
    process.exit(1);
  }
};
