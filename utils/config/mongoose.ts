import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    mongoose.connection.on("connected", () => {
      console.log("Mongodb connected");
    });

    mongoose.connection.on("error", (err) => {
      console.log("Mongodb error" + err);
      process.exit();
    });
  } catch (error: any) {
    console.log(error);
  }
};
