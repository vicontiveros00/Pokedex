import React, { useState, useEffect } from 'react';
import Home from './components/Home/Home';
import Pokemon from './components/Pokemon/Pokemon';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import axios from 'axios';

function App() {
  const [ pokeCount, setPokeCount ] = useState(0);

  useEffect(() => {
    //use this url to get total amount of unique pokémon species
    axios.get('https://pokeapi.co/api/v2/pokemon-species/').then((res) => {
      setPokeCount(res.data.count);
    })
  }, [])

  return (
    <>
      <Routes>
        <Route path='/' element={<Home pokeCount={pokeCount} />} />
        <Route path='/:id' element ={<Pokemon pokeCount={pokeCount} />} />
      </Routes>
      <p className='link watermark'><a href="https://github.com/vicontiveros00">github/vicontiveros00</a></p>
    </>
  )
}

export default App;
