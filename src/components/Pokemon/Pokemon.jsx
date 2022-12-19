import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import './Pokemon.css';

function Pokemon() {
    let { id } = useParams();
    id = Number(id);
    const [ pokemon, setPokemon ] = useState({});
    //const [ newPokemon, setNewPokemon ] = useState({});
    const [ isLoading, setIsLoading ] = useState(true);
    const [ hasError, setHasError ] = useState(false);

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) => {
            setPokemon(res.data);
            setIsLoading(false);
        }).catch((err) => {
            setHasError(true);
            throw new Error('Pokémon does not exist with that name or ID')
        })
    }, [isLoading])

    return (
        <>
            {!hasError ? 
            !isLoading ? 
                <div className="pokemon-info">
                    <h1>{(pokemon.name).charAt(0).toUpperCase() + (pokemon.name).slice(1) + ` #${pokemon.id}`}</h1>
                    <img src={pokemon.sprites.front_default} />
                    <div className="types">
                        <p className={`type ${pokemon.types[0].type.name}`}>{(pokemon.types[0].type.name).toUpperCase()}</p>
                        {pokemon.types[1] && 
                            <p className={`type ${pokemon.types[1].type.name}`}>{(pokemon.types[1].type.name).toUpperCase()}</p>
                        }
                    </div>
                    <div className="size">
                        <p>{(pokemon.height) / 10} m</p>
                        <p>{(pokemon.weight) / 10} kg</p>
                    </div>
                    <div className="stats">
                        <p>Base Stats:</p>
                        <p>HP: {pokemon.stats[0].base_stat}</p>
                        <p>Attack: {pokemon.stats[1].base_stat}</p>
                        <p>Defense: {pokemon.stats[2].base_stat}</p>
                        <p>Sp. Attack: {pokemon.stats[3].base_stat}</p>
                        <p>Sp. Defense: {pokemon.stats[4].base_stat}</p>
                        <p>Speed: {pokemon.stats[5].base_stat}</p>
                    </div>
                    <Link to={`/${id - 1}`}>
                        <button onClick={() => {
                            setIsLoading(true);
                            //setNewPokemon(id - 1);
                        }}>
                            Previous
                        </button>
                    </Link>
                    <Link to={`/${id + 1}`}>
                        <button onClick={() => {
                            setIsLoading(true);
                            //setNewPokemon(Number(id) + 1);
                        }}>
                            Next
                        </button>
                    </Link>
                    <Link to='/'><p className="link">Return Home</p></Link>
                </div> :
                <p>Getting Pokédata....</p>
             : <>
                <p>404 No Pokédata found!</p>
                <Link to='/'><p className="link">Return Home</p></Link>
               </>}
        </>
    )
}

export default Pokemon;