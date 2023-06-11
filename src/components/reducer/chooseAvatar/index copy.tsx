import React, { useState } from "react";
import styles from "./style.module.scss";
import arrow_icon from "../../../icons/arrow.svg";
import mark_icon from "../../../icons/mark.svg";
import axios from "axios";

export default class Avatar extends React.Component {
    state = {
        pokemons: []
    }

    getPokemon = async () => {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon/', {
            headers: {
                'Access-Control-Allow-Origin': "http://localhost:3000"
            }
        })
        const pokemons = await response.data[1]
        console.log(pokemons)
        this.setState({pokemons})
    }

    
    render() {
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
                        <div className={styles.photo__selected}></div>
                        <span className={styles.photo__title}>Выберите фото кота</span>
                        <div className={styles.photo__grid} id="photo__grid">
                            <ul className={styles.photo__items}>
                            { this.state.pokemons.map(pokemons => <img src={pokemons} alt="" />)}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={styles.avatar__underline}></div>
            </div>;
    }
}