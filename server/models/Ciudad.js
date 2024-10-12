import mongoose from "mongoose";

const esquemaCiudad = new mongoose.Schema({
  nombre: { type: String, required: true },
  estado: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Estado",
    required: true,
  },
});

esquemaCiudad.index({ nombre: 1, estado: 1 }, { unique: true });

export default mongoose.model("Ciudad", esquemaCiudad, "ciudades");
