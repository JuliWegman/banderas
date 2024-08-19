"use client";

import { useState, useEffect } from 'react';

function Juego() {
  const [paises, setPaises] = useState([]);
  const [paisSeleccionado, setPaisSeleccionado] = useState(null);
  const [puntos, setPuntos] = useState(0);
  const [respuesta, setRespuesta] = useState('');
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    async function obtenerPaises() {
      try {
        const respuesta = await fetch('https://countriesnow.space/api/v0.1/countries/flag/images');
        const data = await respuesta.json();
        setPaises(data.data);
        seleccionarPaisAleatorio(data.data);
      } catch (error) {
        console.error('Error al obtener los países:', error);
      }
    }

    obtenerPaises();
  }, []);

  const seleccionarPaisAleatorio = (paises) => {
    const randomIndex = Math.floor(Math.random() * paises.length);
    setPaisSeleccionado(paises[randomIndex]);
  };

  const manejarCambio = (e) => {
    setRespuesta(e.target.value);
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (respuesta.trim().toLowerCase() === paisSeleccionado.name.toLowerCase()) {
      setPuntos(puntos + 10);
      setMensaje('¡Correcto!');
    } else {
      setPuntos(puntos - 1);
      setMensaje(`Incorrecto. Era ${paisSeleccionado.name}.`);
    }
    seleccionarPaisAleatorio(paises);
    setRespuesta('');
  };

  if (!paisSeleccionado) return <div>Cargando...</div>;

  return (
    <div>
      <h1>Adivina el País</h1>
      <img src={paisSeleccionado.flag} alt="Bandera" style={{ width: '200px', height: 'auto' }} />
      <form onSubmit={manejarEnvio}>
        <input
          type="text"
          value={respuesta}
          onChange={manejarCambio}
          placeholder="Escribe el nombre del país"
        />
        <button type="submit">Enviar</button>
      </form>
      <p>Puntos: {puntos}</p>
      <p>{mensaje}</p>
    </div>
  );
}

export default Juego;
