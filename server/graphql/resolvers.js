import Estado from "../models/Estado.js";
import Ciudad from "../models/Ciudad.js";

const resolvers = {
  Query: {
    obtenerEstados: async () => {
      try {
        const estados = await Estado.find().sort({ nombre: 1 });
        return estados;
      } catch (error) {
        console.error("Error obteniendo estados:", error);
        throw new Error("Error obteniendo estados");
      }
    },
    obtenerCiudades: async () => {
      try {
        const ciudades = await Ciudad.find().populate("estado");
        return ciudades;
      } catch (error) {
        console.error("Error obteniendo ciudades:", error);
        throw new Error("Error obteniendo ciudades");
      }
    },
  },

  Mutation: {
    agregarEstado: async (_, { nombre }) => {
      try {
        const nuevoEstado = await new Estado({ nombre }).save();
        return nuevoEstado;
      } catch (error) {
        if (error.code === 11000) {
          throw new Error(`El estado con nombre "${nombre}" ya existe.`);
        }
        throw new Error("Ocurrió un error al agregar el estado.");
      }
    },

    actualizarEstado: async (_, { id, nombre }) => {
      try {
        const estadoActualizado = await Estado.findByIdAndUpdate(
          id,
          { nombre },
          { new: true }
        );
        return estadoActualizado;
      } catch (error) {
        throw new Error("Ocurrió un error al actualizar el estado.");
      }
    },

    eliminarEstado: async (_, { id }) => {
      try {
        await Estado.findByIdAndDelete(id);
        return true;
      } catch (error) {
        throw new Error("Ocurrió un error al eliminar el estado.");
      }
    },

    agregarCiudad: async (_, { nombre, estadoId }) => {
      try {
        const nuevaCiudad = await new Ciudad({
          nombre,
          estado: estadoId,
        }).save();

        const ciudadConEstado = await Ciudad.findById(nuevaCiudad._id).populate(
          "estado"
        );

        return ciudadConEstado;
      } catch (error) {
        if (error.code === 11000) {
          throw new Error(`La ciudad "${nombre}" ya existe en este estado.`);
        }
        throw new Error("Ocurrió un error al agregar la ciudad.");
      }
    },

    actualizarCiudad: async (_, { id, nombre, estadoId }) => {
      try {
        const ciudadActualizada = await Ciudad.findByIdAndUpdate(
          id,
          { nombre, estado: estadoId },
          { new: true }
        ).populate("estado");

        return ciudadActualizada;
      } catch (error) {
        if (error.code === 11000) {
          throw new Error(`La ciudad "${nombre}" ya existe en este estado.`);
        }
        throw new Error("Ocurrió un error al actualizar la ciudad.");
      }
    },

    eliminarCiudad: async (_, { id }) => {
      try {
        await Ciudad.findByIdAndDelete(id);
        return true;
      } catch (error) {
        throw new Error("Ocurrió un error al eliminar la ciudad.");
      }
    },
  },
};

export default resolvers;
