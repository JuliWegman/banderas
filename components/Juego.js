"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image'
import { setTimeout } from 'timers';


function Juego() {
  const [paises, setPaises] = useState([]);
  const [paisSeleccionado, setPaisSeleccionado] = useState(null);
  const [puntos, setPuntos] = useState(0);
  const [respuesta, setRespuesta] = useState('');
  const [mensaje, setMensaje] = useState('');

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

    const input = document.getElementById("cont");
    const resp = document.getElementById("texto");
    if (e!=null) {
      e.preventDefault();
    }
    if (respuesta.trim().toLowerCase() === paisSeleccionado.name.toLowerCase()) {
      setPuntos(puntos + 10);
      input.className="correct"
      setMensaje('¡Correcto');
    } else {
      setPuntos(puntos - 1);
      input.className="incorrect"
      setMensaje(`¡${paisSeleccionado.name}`);
    }
    resp.className="a";
    setTimeout(()=>{
      resp.className="invi";
      input.className="contenedor";
      Inicio()
    },1200)
    
  };

  const Inicio=()=>{

    setMensaje(``);
    randomBandera(paises);
    setRespuesta('');
  }

  if (!paisSeleccionado) return <div>Cargando...</div>;

  return (
    
    <div className='contenedor' id='cont'>
      <h2>¡Adivina la bandera!</h2>
      <Image src={paisSeleccionado.flag} alt="Bandera"  width={250} height={150} />
      <form onSubmit={handleEnvio}>
        <input id='input' type="text" value={respuesta} onChange={handleCambio} placeholder="País de la bandera"/>
        <button type="submit">Enviar</button>
      </form>
      <p>Puntos: {puntos}</p>
      <p id='texto' className='invi'>{mensaje}!</p>
    </div>
  );
}

export default Juego;
