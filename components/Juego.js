"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image'
import { clearInterval } from 'timers';
function Juego() {
  const [paises, setPaises] = useState([]);
  const [paisSeleccionado, setPaisSeleccionado] = useState(null);
  const [puntos, setPuntos] = useState(0);
  const [respuesta, setRespuesta] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [tiempo,setTiempo]= useState(15)

  useEffect(() => {
    async function getBanderas() {
      try {
        const res = await fetch('https://countriesnow.space/api/v0.1/countries/flag/images');
        const {data} = await res.json();
        setPaises(data);
        randomBandera(data);
      } catch (error) {
        console.error('ERROR', error);
      }
    }

    getBanderas();
    
  }, []);

  const randomBandera = (paises) => {
    const randomIndex = Math.floor(Math.random() * paises.length);
    setPaisSeleccionado(paises[randomIndex]);
  };

  const handleCambio = (e) => {
    setRespuesta(e.target.value);
  };

  const handleEnvio = (e) => {
    clearTimeout(idTimer)
    clearInterval(idContador)
    const input = document.getElementById("cont");

    e.preventDefault();
    if (respuesta.trim().toLowerCase() === paisSeleccionado.name.toLowerCase()) {
      setPuntos(puntos + 10);
      input.className="correct"
      setMensaje('¡Correcto!');
    } else {
      setPuntos(puntos - 1);
      input.className="incorrect"
      setMensaje(`Incorrecto. Era ${paisSeleccionado.name}.`);
    }
    setTimeout(()=>{input.className="contenedor";Inicio()},750)
    
  };

  const Inicio=()=>{
    setMensaje(``);
    randomBandera(paises);
    setRespuesta('');
     idTimer=setTimeout(handleEnvio,15000)
    idContador=setInterval(setTiempo(tiempo-1),1000)
  }

  if (!paisSeleccionado) return <div>Cargando...</div>;

  return (
    
    <div className='contenedor' id='cont'>
      <h2>¡Adivina la bandera!</h2>
      <p>{tiempo}</p>
      <Image src={paisSeleccionado.flag} alt="Bandera"  width={250} height={150} />
      <form onSubmit={handleEnvio}>
        <input id='input' type="text" value={respuesta} onChange={handleCambio} placeholder="País de la bandera"/>
        <button type="submit">Enviar</button>
      </form>
      <p>Puntos: {puntos}</p>
      <p>{mensaje}</p>
    </div>
  );
}

export default Juego;
