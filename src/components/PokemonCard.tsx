import React, { useEffect, useState } from 'react';
import styles from '../styles/PokemonCard.module.css';

interface PokemonCardProps {
    name: string;
    url: string;
    onClick?: () => void;
}

const PokemonCard = ({ name, url, onClick }: PokemonCardProps) => {
    const [sprite, setSprite] = useState<string | null>(null);

    useEffect(() => {
        const fetchSprite = async () => {
            const response = await fetch(url);
            const data = await response.json();
            setSprite(data.sprites.front_default);
        };

        fetchSprite();
    }, [url]);

    return (
        <div className={styles.card} onClick={onClick}>
            {sprite && <img src={sprite} alt={name} className={styles.sprite} />}
            <h2 className={styles.name}>{name}</h2>
        </div>
    );
};

export default PokemonCard;
