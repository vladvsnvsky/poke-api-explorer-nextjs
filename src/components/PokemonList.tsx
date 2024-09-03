import React from 'react';
import PokemonCard from '@/components/PokemonCard';
import styles from '../styles/PokemonList.module.css';
import Link from "next/link";

interface Pokemon {
    name: string;
    url: string;
}

interface PokemonListProps {
    pokemons: Pokemon[];
}

const PokemonList = ({ pokemons }: PokemonListProps) => {
    return (
        <div className={styles.listContainer}>
            {pokemons.map((pokemon) => (
                <Link key={pokemon.name} href={`/details/${pokemon.name}`} passHref>
                    <PokemonCard
                        key={pokemon.name}
                        name={pokemon.name}
                        url={pokemon.url} // Passing the URL to fetch the sprite within PokemonCard
                    />
                </Link>
            ))}
        </div>
    );
};

export default PokemonList;
