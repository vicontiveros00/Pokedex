import React from 'react';
import Home from './components/Home/Home';
import Pokemon from './components/Pokemon/Pokemon';
import { Route, Routes } from 'react-router-dom';
import './App.css';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:id' element ={<Pokemon />} />
      </Routes>
    </>
  )
}

export default App;
