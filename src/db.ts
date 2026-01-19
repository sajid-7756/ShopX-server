import mongoose from "mongoose";

async function connectDB(): Promise<void> {
  try {
    const mongoURI = process.env.MONGODB_URI;

    if (!mongoURI) {
      throw new Error("MONGODB_URI is not defined in env");
    }

    await mongoose.connect(mongoURI);
    console.log("Database connection success");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

export default connectDB;
