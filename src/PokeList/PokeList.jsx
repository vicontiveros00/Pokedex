import axios from "axios";
import React, { useState, useEffect } from "react";
import './PokeList.css';

function PokeList(props) {
    const { pokedata } = props;
    const [ pokemonData, setPokemonData ] = useState([]);

    useEffect(() => {
        pokedata.map((pokemon) => {
            axios.get(pokemon.url).then((res) => {
                if (!pokemonData.find(pokemon => pokemon.id === res.data.id)) {
                    setPokemonData(current => [...current, res.data]);
                } 
            })
        })
    }, [pokedata]);

    return (
        <>
            {pokemonData.sort((a, b) => {
                return a.id - b.id //sort by dex number
            }).map((pokemon) => {
                return (
                    <div key={pokemon.id} className="pokemon-list">
                        <p>{pokemon.id}.</p>
                        <img src={pokemon.sprites.front_default} />
                        <p>{(pokemon.name).charAt(0).toUpperCase() + (pokemon.name).slice(1)}</p>
                    </div>
                )
            })}
        </>
    )
}

export default PokeList;