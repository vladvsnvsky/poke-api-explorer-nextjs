// Import Jest types
import { jest } from '@jest/globals';
import { fetchPokemon, FetchPokemonResponse } from './fetchPokemons';

// Mock the global fetch function
global.fetch = jest.fn() as jest.MockedFunction<typeof fetch>;

describe('fetchPokemon', () => {
    const mockPokemonResponse: FetchPokemonResponse = {
        results: [
            { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
            { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
        ],
        count: 2,
        next: 'https://pokeapi.co/api/v2/pokemon?offset=2&limit=2',
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should fetch and return Pokémon data successfully', async () => {
        (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
            ok: true,
            json: async () => mockPokemonResponse,
        } as Response);

        const url = 'https://pokeapi.co/api/v2/pokemon';
        const data = await fetchPokemon(url);

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(url);
        expect(data).toEqual(mockPokemonResponse);
    });

    it('should throw an error when the fetch fails', async () => {
        (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
            ok: false,
        } as Response);

        const url = 'https://pokeapi.co/api/v2/pokemon';

        await expect(fetchPokemon(url)).rejects.toThrow('Error fetching Pokémon data');
    });
});
