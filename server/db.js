import mongoose from "mongoose";

const conectarDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/capacitacionCrud");
    console.log("Conectado a MongoDB");
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
    process.exit(1);
  }
};

export default conectarDB;
