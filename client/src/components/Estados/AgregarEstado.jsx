import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { AGREGAR_ESTADO } from '../../graphql/mutations'; 
import { OBTENER_CIUDADES_ESTADOS } from '../../graphql/queries'; 

const AgregarEstado = () => {
  const [nombre, setNombre] = useState('');

  const [agregarEstado, { loading, error }] = useMutation(AGREGAR_ESTADO, {
    refetchQueries: [{ query: OBTENER_CIUDADES_ESTADOS }], 
    onCompleted: (data)=>{
      const {nombre} = data.agregarEstado
      alert(`Se agrego el estado: "${nombre}" correctamente`)
    }
  });

  const manejarSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await agregarEstado({ variables: { nombre } });
      setNombre('');
    } catch (err) {
      console.error('Error agregando el estado:', err);
    }
  };

  return (
    <div>
      <h3>Agregar Estado</h3>
      <form onSubmit={manejarSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre del Estado</label>
          <input
            type="text"
            className="form-control w-25"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Agregando...' : 'Agregar'}
        </button>

        {error && <p className="text-danger">Error: {error.message}</p>}
      </form>
    </div>
  );
};

export default AgregarEstado;
