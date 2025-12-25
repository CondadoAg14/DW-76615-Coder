import mongoose from "mongoose";

export const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB conectado");
  } catch (error) {
    console.error("Error al conectar MongoDB", error);
    process.exit(1);
  }
};