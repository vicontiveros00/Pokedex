import { useState } from 'react';
import PokeList from './PokeList/PokeList';
import axios from 'axios';
import './App.css';
import { useEffect } from 'react';

function App() {
  const [ pokedata, setPokedata ] = useState([]);

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon').then((res) => {
      setPokedata(res.data.results)
    })
  }, []);

  return (
    <>
      <PokeList pokedata = {pokedata} />
    </>
  )
}

export default App
