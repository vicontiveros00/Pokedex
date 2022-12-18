import React, { useState, useEffect } from "react";
import './PokeList.css';

function PokeList(props) {
    const { pokedata } = props;
    const [ pokemonData, setPokemonData ] = useState([]);

    useEffect(() => {
        const getAllMons = async() => {
            const pokemonFromApiCall = pokedata.map(async (pokemon) => {
                const res = await fetch(pokemon.url);
                return await res.json();
            })
            setPokemonData(await Promise.all(await pokemonFromApiCall));
        }
        getAllMons();
    }, [pokedata]);

    return (
        <>
            {pokemonData.sort((a, b) => {
                return a.id - b.id //ensure pokemon are sorted by dex number
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