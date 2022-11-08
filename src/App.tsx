import React, {useState } from 'react';
import { useQueries } from "@tanstack/react-query";
import NumberedTextArea from './components/NumberedTextArea';
import { fetchPokemon } from './api/pokemon-endpoint';
import './styles.css';
import * as S from './App.styles';

function App() {
  const [pokemons, setPokemons] = useState('');
  const [pokemonsToFetch, setPokemonsToFetch] = useState<string[]>([]);

  const queryResults =  useQueries({
    queries: pokemonsToFetch.map(pokemonName => ({
      queryKey: ['pokemon', pokemonName],
      queryFn: () => fetchPokemon(pokemonName),
    }))
  });
  const isLoading = queryResults.some(query => query.isLoading)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setPokemons(e.target.value);
  const handleFetch = (e: React.MouseEvent<HTMLButtonElement>) => setPokemonsToFetch(pokemons.trim().split('\n'));

  return (
      <S.Root>
        <S.Card>
          <NumberedTextArea
            value={pokemons}
            onChange={handleChange}
            name="textarea"
          />
        </S.Card>
        <S.Button onClick={handleFetch} >Fetch Pokemon</S.Button>
        {isLoading && <div>Loading....</div>}
        {queryResults?.map((result, index) => {
          if(!result.isSuccess) {
            return;
          }
          return (
            <div key={`${result.data.name}${index}`}>
              <span>
                <img
                  src={result.data.sprites?.front_default}
                  alt={result.data.name}
                />
              </span>
              <span>Name: {result.data.name}</span>
            </div>
        )})
        }
      </S.Root>
  );
}

export default App;
