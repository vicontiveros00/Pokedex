import React, { useState, useEffect } from "react";
import axios from "axios";
import './WeaknessCalculator.css';

function WeaknessCalculator(props) {
    const firstTypeUrl = props.types[0].type.url;
    const secondTypeUrl = props.types[1]?.type.url;
    //get url from props for primary type and secondary type if it exists from pokemon.jsx

    const [ firstTypeWeakness, setFirstTypeWeakness ] = useState({});
    const [ secondTypeWeakness, setSecondTypeWeakness ] = useState({});
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
        if (Object.keys(firstTypes).length !== 0 && Object.keys(secondTypes).length !== 0) {
            let weaknesses = [];
            let primary = arrayOfObjectToArray(firstTypes.double_damage_from);
            let secondary = arrayOfObjectToArray(secondTypes.double_damage_from);
            let halfDamageToPrimary = arrayOfObjectToArray(firstTypes.half_damage_from);
            let halfDamageToSecodary = arrayOfObjectToArray(secondTypes.half_damage_from);
            let noEffectToPrimary = arrayOfObjectToArray(firstTypes.no_damage_from);
            let noEffectToSecondary = arrayOfObjectToArray(secondTypes.no_damage_from);
            
            for (let i = 0; i < primary.length; i++) {
                for (let j = 0; j < secondary.length; j++) {
                    if (primary[i] === secondary[j]) {
                        weaknesses.push(`4x ${primary[i].toUpperCase()}`);
                        primary.splice(i, 1);
                        secondary.splice(j, 1);
                    }
                }
            }

            let leftOverWeaknesses = primary.concat(secondary);
            const weaknessesCancelOut = halfDamageToPrimary.concat(halfDamageToSecodary,noEffectToPrimary,noEffectToSecondary);

            leftOverWeaknesses = leftOverWeaknesses.filter((type) => {
                if (!weaknessesCancelOut.includes(type)) {
                    return type;
                }
            })

            leftOverWeaknesses = leftOverWeaknesses.map((type) => {
                return `2x ${type.toUpperCase()}`
            })

            weaknesses = weaknesses.concat(leftOverWeaknesses);

            setComparedWeakness(weaknesses);
        } else {
            setComparedWeakness(['Loading...'])
        }
    }

    useEffect(() => {
        axios.get(firstTypeUrl).then((res) => {
            setFirstTypeWeakness(res.data.damage_relations);
            {secondTypeUrl && axios.get(secondTypeUrl).then((res) => {
                setSecondTypeWeakness(res.data.damage_relations);
                compareWeaknessArrays(firstTypeWeakness, secondTypeWeakness);
                setIsGettingMoreData(false);
            })}
        })
        //get weakness data for primary pokémon type and secondary type
    }, [isGettingMoreData]);

    return (
        <div className="weakness types">
            <p>Weakness:</p>
            {secondTypeUrl ?
                comparedWeakness.map((type) => {
                    return (
                        <p className={`type ${type.toLowerCase()}`} key={type}>{type}</p>
                    )
                })
                 :
                firstTypeWeakness.double_damage_from?.map((type) => {
                    return (
                        <p className={`type ${type.name}`} key={type.name}>{`2x ${type.name.toUpperCase()}`}</p>
                    )
                })
            }
        </div>
    )
}

export default WeaknessCalculator;