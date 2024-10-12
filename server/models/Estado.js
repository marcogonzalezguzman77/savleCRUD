import mongoose from "mongoose";

const esquemaEstado = new mongoose.Schema({
  nombre: { type: String, unique: true, required: true },
});

export default mongoose.model("Estado", esquemaEstado);
