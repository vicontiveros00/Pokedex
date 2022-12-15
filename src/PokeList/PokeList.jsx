import axios from "axios";
import React, { useState, useEffect } from "react";
import './PokeList.css';

function PokeList(props) {
    const { pokedata } = props;
    const [ pokemonData, setPokemonData ] = useState([]);

    useEffect(() => {
        pokedata.map((pokemon) => {
            axios.get(pokemon.url).then((res) => {
                setPokemonData(current => [...current, res.data]);
            })
        })
    }, []);

    return (
        <>
            {pokemonData.map((pokemon) => {
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