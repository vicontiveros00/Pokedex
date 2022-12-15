import React from "react";

function PokeList(props) {
    const pokedata = props.pokedata;
    return (
        <>
            {pokedata.map((pokemon) => {
                return (
                    <>
                        <p key={pokemon.name}>{pokemon.name}</p>
                        <a href={pokemon.url}>More info</a>
                    </>
                )
            })}
        </>
    )
}

export default PokeList;