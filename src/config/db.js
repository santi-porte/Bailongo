import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    console.log("👉 URI desde .env:", process.env.MONGO_URI); 

    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Conectado correctamente a MongoDB");
  } catch (error) {
    console.error("❌ Error al conectar con MONGODB: ", error);
  }
};

export default connectDB;
