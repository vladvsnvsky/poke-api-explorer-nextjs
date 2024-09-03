import { fetchPokemonDetails, PokemonDetails } from './fetchPokemonDetails';

// Mock the global fetch function
global.fetch = jest.fn() as jest.MockedFunction<typeof fetch>;

describe('fetchPokemonDetails', () => {
    const mockPokemonDetails: PokemonDetails = {
        name: 'pikachu',
        sprites: {
            front_default: 'https://example.com/front_default.png',
            front_shiny: 'https://example.com/front_shiny.png',
            back_default: 'https://example.com/back_default.png',
            back_shiny: 'https://example.com/back_shiny.png',
        },
        abilities: [
            {
                ability: {
                    name: 'static',
                    url: 'https://pokeapi.co/api/v2/ability/9/',
                },
                is_hidden: false,
                slot: 1,
            },
            {
                ability: {
                    name: 'lightning-rod',
                    url: 'https://pokeapi.co/api/v2/ability/31/',
                },
                is_hidden: true,
                slot: 3,
            },
        ],
        base_experience: 112,
        height: 4,
        weight: 60,
        stats: [
            {
                base_stat: 35,
                effort: 0,
                stat: {
                    name: 'speed',
                    url: 'https://pokeapi.co/api/v2/stat/6/',
                },
            },
        ],
        types: [
            {
                slot: 1,
                type: {
                    name: 'electric',
                    url: 'https://pokeapi.co/api/v2/type/13/',
                },
            },
        ],
        moves: [
            {
                move: {
                    name: 'thunder-shock',
                    url: 'https://pokeapi.co/api/v2/move/84/',
                },
            },
        ],
        cries: {
            latest: 'https://example.com/cries/latest.mp3',
            legacy: 'https://example.com/cries/legacy.mp3',
        },
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should fetch and return Pokémon details successfully', async () => {
        (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
            ok: true,
            json: async () => mockPokemonDetails,
        } as Response);

        const url = 'https://pokeapi.co/api/v2/pokemon/pikachu';
        const data = await fetchPokemonDetails(url);

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(url);
        expect(data).toEqual(mockPokemonDetails);
    });

    it('should throw an error when the fetch response is not ok', async () => {
        (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
            ok: false,
        } as Response);

        const url = 'https://pokeapi.co/api/v2/pokemon/pikachu';

        await expect(fetchPokemonDetails(url)).rejects.toThrow('Error fetching Pokémon details');
    });
});
