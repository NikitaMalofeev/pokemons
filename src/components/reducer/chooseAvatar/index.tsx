import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import arrow_icon from "../../../icons/arrow.svg";
import mark_icon from "../../../icons/mark.svg";
import axios from "axios";
import { appendFile } from "fs";

interface PokemonAvatar {
    id: string;
    name: string;
    url: string;
    imageSrc: string;
}

const Avatar = () => {
    const [images, setImages] = useState<PokemonAvatar[]>([]);
    const [checkedPokemon, setCheckedPokemon] = useState<string>();

    
    const getPokemon = async () => {
        const response = await axios.get<{
            results: Array<Omit<PokemonAvatar, 'id'>>
        }>('https://pokeapi.co/api/v2/pokemon/?limit=12', {
            headers: {
                'Access-Control-Allow-Origin': "http://localhost:3000"
            }
        })
        const data = await response.data.results.map(pokemon => {
            //достаю id покемонов чтобы получить полную ссылку на всех покемонов
            const parts = pokemon.url.split('/'); // ['https:', '', 'pokeapi.co', 'api', 'v2', 'ability', '1', ''];
            const id = parts[parts.length - 2];

            const imageSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`

            return {
                ...pokemon,
                id,
                imageSrc
            };
        });

        setImages(data);
    }
    getPokemon()


    return <div className={styles.avatar}>
                <div className={styles.avatar__container}>
                    <div className={styles.avatar__controllers}>
                        <button className={styles.controllers__back}>
                            <img src={arrow_icon} alt="back" />
                        </button>
                        <span className={styles.controllers__title}>Фотография профиля</span>
                        <button className={styles.controllers__save}>
                        <img src={mark_icon} alt="save" />
                        </button>
                    </div>
                    <div className={styles.photo__area}>
                        <div className={styles.photo__selected}>
                           {checkedPokemon 
                            ? <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${checkedPokemon}.png`} className={styles.photo__avatar}/>
                            : <div>Loading...</div>
                           }
                        </div>
                        <span className={styles.photo__title}>Выберите своего покемона</span>
                        <div className={styles.photo__grid} id="photo__grid">
                                {images.map((item) => (
                                    <img src={item.imageSrc} onClick={() => setCheckedPokemon(item.id)} alt={item.name} className={`${styles.photo__item} ${checkedPokemon === item.id && styles["photo__item--checked"]}`} />
                                ))}
                        </div>
                    </div>
                </div>
                <div className={styles.avatar__underline}></div>
            </div>;
};

export default Avatar;