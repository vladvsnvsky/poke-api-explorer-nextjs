import Link from "next/link";
import styles from '../styles/Home.module.css';

interface Pokemon {
    name: string;
    url: string;
}

interface PokemonListProps {
    pokemonList: Pokemon[];
}

export default function PokemonList({ pokemonList }: PokemonListProps) {
    return (
        <ul className={styles.list}>
            {pokemonList.map((pokemon, index) => (
                <li key={index} className={styles.listItem}>
                    <Link href={`/details/${pokemon.name}`}>
                        {pokemon.name}
                    </Link>
                </li>
            ))}
        </ul>
    );
}
