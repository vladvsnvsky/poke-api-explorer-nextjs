export interface Pokemon {
    name: string;
    url: string;
}

export interface FetchPokemonResponse {
    results: Pokemon[];
    count: number | null;
    next: string | null;
}

export const fetchPokemon = async (url: string): Promise<FetchPokemonResponse> => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Error fetching Pokémon data');
    }
    const data = await response.json();
    return data;
};
