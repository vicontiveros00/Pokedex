import React, { useState, useEffect } from "react";
import axios from "axios";
import './WeaknessCalculator.css';

function WeaknessCalculator(props) {
    const firstTypeUrl = props.types[0].type.url;
    const secondTypeUrl = props.types[1]?.type.url;
    //get url from props for primary type and secondary type if it exists from pokemon.jsx

    const [ firstTypeWeakness, setFirstTypeWeakness ] = useState([]);
    const [ secondTypeWeakness, setSecondTypeWeakness ] = useState([]);
    const [ comparedWeakness, setComparedWeakness ] = useState([]);
    const [ isGettingMoreData, setIsGettingMoreData ] = useState(true);
    //arrays for type weakness data

    const compareWeaknessArrays = (firstTypes, secondTypes) => {
        let newWeaknessArr = [];
        for (let i = 0; i < firstTypes.length; i++) {
            for (let j = 0; j < secondTypes.length; j++) {
                if (firstTypes[i].name === secondTypes[j].name) {
                    newWeaknessArr.push(`4x ${firstTypes[i].name}`)
                }
                    newWeaknessArr.push(`2x ${firstTypes[i].name}`)
                    newWeaknessArr.push(`2x ${secondTypes[j].name}`) 
            }
        }
        setComparedWeakness(newWeaknessArr.filter((type, index) => {
            return newWeaknessArr.indexOf(type) === index;
        }));
    } //ignore this stupid mess ill figure something else out this works for now

    useEffect(() => {
        axios.get(firstTypeUrl).then((res) => {
            setFirstTypeWeakness(res.data.damage_relations.double_damage_from);
            {secondTypeUrl && axios.get(secondTypeUrl).then((res) => {
                setSecondTypeWeakness(res.data.damage_relations.double_damage_from);
                compareWeaknessArrays(firstTypeWeakness, secondTypeWeakness);
                setIsGettingMoreData(false);
            })}
        })
        //get weakness data for primary pokémon type and secondary type
    }, [isGettingMoreData]);

    return (
        <div className="weakness">
            <p>Weakness:</p>
            {secondTypeUrl ?
                comparedWeakness.sort().reverse().map((type) => {
                    return (
                        <p key={type}>{type}</p>
                    )
                }) :
                firstTypeWeakness.map((type) => {
                    return (
                        <p key={type.name}>{type.name}</p>
                    )
                })
            }
        </div>
    )
}

export default WeaknessCalculator;