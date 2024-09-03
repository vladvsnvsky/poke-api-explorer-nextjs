
export interface PokemonDetails {
    name: string;
    sprites: {
        front_default: string;
        front_shiny: string;
        back_default: string;
        back_shiny: string;
    };
    abilities: Array<{
        ability: {
            name: string;
            url: string;
        };
        is_hidden: boolean;
        slot: number;
    }>;
    base_experience: number;
    height: number;
    weight: number;
    stats: Array<{
        base_stat: number;
        effort: number;
        stat: {
            name: string;
            url: string;
        };
    }>;
    types: Array<{
        slot: number;
        type: {
            name: string;
            url: string;
        };
    }>;
    moves: Array<{
        move: {
            name: string;
            url: string;
        };
    }>;
    cries: {
        latest: string;
        legacy: string;
    };
}

export const fetchPokemonDetails = async (url: string): Promise<PokemonDetails> => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Error fetching Pokémon details');
    }
    const data = await response.json();
    return {
        name: data.name,
        sprites: {
            front_default: data.sprites.front_default,
            front_shiny: data.sprites.front_shiny,
            back_default: data.sprites.back_default,
            back_shiny: data.sprites.back_shiny,
        },
        abilities: data.abilities,
        base_experience: data.base_experience,
        height: data.height,
        weight: data.weight,
        stats: data.stats,
        types: data.types,
        moves: data.moves,
        cries: data.cries,
    };
};
