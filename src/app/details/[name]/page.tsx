"use client";

import { useState, useEffect } from 'react';
import { fetchPokemonDetails, PokemonDetails } from '@/utils/fetchPokemonDetails';
import styles from '../../../styles/Details.module.css';

interface PokemonDetailsPageProps {
    params: {
        name: string;
    };
}

const POKEMON_DETAILS_API_URL = 'https://pokeapi.co/api/v2/pokemon/';

const PokemonDetailsPage = ({ params }: PokemonDetailsPageProps) => {
    const [data, setData] = useState<PokemonDetails | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedData: PokemonDetails = await fetchPokemonDetails(`${POKEMON_DETAILS_API_URL}${params.name}`);
                setData(fetchedData);
            } catch (error) {
                setError('Pokémon not found');
            }
        };

        fetchData();
    }, [params.name]);

    if (error) {
        return (
            <div className={styles.notFoundContainer}>
                <h1 className={styles.notFoundTitle}>404 - Pokémon Not Found</h1>
                <p className={styles.notFoundMessage}>
                    The Pokémon you're looking for doesn't exist. Please check the name and try again.
                </p>
                <a href="/" className={styles.backButton}>
                    Go Back to Home
                </a>
            </div>
        );
    }

    if (!data) {
        return <div>Loading...</div>;
    }

    const filteredMoves = data.moves.filter((move) =>
        move.move.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{data.name}</h1>

            <div className={styles.imageContainer}>
                {data.sprites.front_default && (
                    <figure className={styles.figure}>
                        <img src={data.sprites.front_default} alt={`${data.name} front`} />
                        <figcaption className={styles.legend}>Front</figcaption>
                    </figure>
                )}
                {data.sprites.front_shiny && (
                    <figure className={styles.figure}>
                        <img src={data.sprites.front_shiny} alt={`${data.name} shiny front`} />
                        <figcaption className={styles.legend}>Shiny Front</figcaption>
                    </figure>
                )}
            </div>

            <div className={styles.details}>
                <section className={styles.section}>
                    <h2>Abilities</h2>
                    <ul>
                        {data.abilities.map((ability, index) => (
                            <li key={index}>
                                {ability.is_hidden && <span className={styles.hiddenAbility}>Hidden</span>}
                                <a href={ability.ability.url}>{ability.ability.name}</a>
                            </li>
                        ))}
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2>Stats</h2>
                    <ul>
                        {data.stats.map((stat, index) => (
                            <li key={index}>
                                <span className={styles.statName}>{stat.stat.name}</span>
                                <span className={styles.statValue}>{stat.base_stat}</span>
                            </li>
                        ))}
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2>Types</h2>
                    <ul>
                        {data.types.map((type, index) => (
                            <li key={index}>
                                <a href={type.type.url}>{type.type.name}</a>
                            </li>
                        ))}
                    </ul>
                </section>

                <section className={`${styles.section} ${styles.movesSection}`}>
                    <h2>Moves</h2>
                    <input
                        type="text"
                        className={styles.searchBar}
                        placeholder="Search moves..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <ul className={styles.movesList}>
                        {filteredMoves.map((move, index) => (
                            <li key={index}>
                                <a href={move.move.url}>{move.move.name}</a>
                            </li>
                        ))}
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2>Cries</h2>
                    <div className={styles.audioContainer}>
                        <audio controls src={data.cries.latest}>Latest Cry</audio>
                        <audio controls src={data.cries.legacy}>Legacy Cry</audio>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default PokemonDetailsPage;
