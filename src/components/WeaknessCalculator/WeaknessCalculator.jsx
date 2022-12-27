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

    const arrayOfObjectToArray = (arr) => {
        let newArr = [];
        for (let i = 0; i < arr.length; i++) {
            newArr.push(arr[i].name);
        }
        return newArr;
    }

    const compareWeaknessArrays = (firstTypes, secondTypes) => {
        try {
            let weaknesses = [];
            let primary = arrayOfObjectToArray(firstTypes);
            let secondary = arrayOfObjectToArray(secondTypes);
            
            for (let i = 0; i < primary.length; i++) {
                for (let j = 0; j < secondary.length; j++) {
                    if (primary[i] === secondary[j]) {
                        weaknesses.push(`4x ${primary[i].toUpperCase()}`);
                        primary.splice(i, 1);
                        secondary.splice(j, 1);
                    }
                }
            }

            primary = primary.map((type) => {
                return `2x ${type.toUpperCase()}`
            })

            secondary = secondary.map((type) => {
                return `2x ${type.toUpperCase()}`
            })

            weaknesses = weaknesses.concat(primary, secondary);

            setComparedWeakness(weaknesses);
        } catch {
            setComparedWeakness(['Error calculating weaknesses!']);
            throw new Error("If you're seeing this message you found a bug for me, please contact me at https://vicontiveros00.github.io/#contact and let me know which Pokémon this happened with");
        }
    } 

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
        <>
            {secondTypeUrl ?
                <div className="weakness">
                    <p>Weakness:</p>
                    {comparedWeakness.map((type) => {
                        return (
                            <p className={`type ${type.toLowerCase()}`} key={type}>{type}</p>
                        )
                    })}
                </div> :
                <div className="weakness">
                    <p>Weakness:</p>
                    {firstTypeWeakness.map((type) => {
                        return (
                            <p className={`type ${type.name}`} key={type.name}>{`2x ${type.name.toUpperCase()}`}</p>
                        )
                    })}
                </div>
            }
        </>
    )
}

export default WeaknessCalculator;