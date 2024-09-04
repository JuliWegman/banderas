import Head from 'next/head';
import Juego from '../components/Juego';
import Video from "../components/Video"

export default function Home() {
  return (
    
    <div className='root'>
      <Juego />
      <Video />
    </div>
  );
}
