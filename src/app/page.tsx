"use client";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { fetchPokemon, Pokemon } from "@/utils/fetchPokemons";
import PokemonList from "@/components/PokemonList";
import styles from "@/styles/Home.module.css";

const POKEMON_API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=20';

const HomePage = () => {
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
    const [nextUrl, setNextUrl] = useState<string | null>(null);
    const [totalNumber, setTotalNumber] = useState<number | null>(null);
    const loadMoreRef = useRef<HTMLDivElement | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<'none' | 'asc' | 'desc'>('none');

    useEffect(() => {
        const fetchInitialPokemon = async () => {
            const data = await fetchPokemon(POKEMON_API_URL);
            setPokemonList(data.results);
            setTotalNumber(data.count);
            setNextUrl(data.next);
        };

        fetchInitialPokemon();
    }, []);

    const loadMorePokemon = async () => {
        if (nextUrl) {
            const data = await fetchPokemon(nextUrl);
            setPokemonList(prev => [...prev, ...data.results]);
            setNextUrl(data.next);
        }
    };

    useEffect(() => {
        if (!loadMoreRef.current) return;

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && nextUrl) {
                loadMorePokemon();
            }
        }, {
            rootMargin: '100px',
        });

        const currentElement = loadMoreRef.current;
        if (currentElement) {
            observer.observe(currentElement);
        }

        return () => {
            if (currentElement) {
                observer.unobserve(currentElement);
            }
        };
    }, [nextUrl]);

    const filteredPokemonList = pokemonList
        .filter(pokemon => pokemon.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .sort((pokemon1, pokemon2) => {
            switch (sortOrder) {
                case 'asc':
                    return pokemon1.name.localeCompare(pokemon2.name);
                case 'desc':
                    return pokemon2.name.localeCompare(pokemon1.name);
                case 'none':
                default:
                    return 0;
            }
        });

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Pokémon List</h1>

            <form onSubmit={(e) => e.preventDefault()} className={styles.searchForm}>
                <input
                    type="text"
                    placeholder="Search Pokémon by name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={styles.searchInput}
                />
                <Link href={`/details/${searchQuery}`} passHref>
                    <button type="button" className={styles.searchButton} disabled={!searchQuery.trim()}>
                        Search
                    </button>
                </Link>
            </form>

            <div className={styles.sortSection}>
                <label className={styles.sortLabel}>Sort Alphabetically:</label>
                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value as 'none' | 'asc' | 'desc')}
                    className={styles.sortSelect}
                >
                    <option value="none">NONE</option>
                    <option value="asc">A-Z</option>
                    <option value="desc">Z-A</option>
                </select>
            </div>

            <p className={styles.resultCount}>{filteredPokemonList.length} / {totalNumber}</p>
            <PokemonList pokemons={filteredPokemonList} />
            <div ref={loadMoreRef}></div>
        </div>
    );
};

export default HomePage;
