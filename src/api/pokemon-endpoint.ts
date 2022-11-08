export const fetchPokemon = (pokemenonName: string) =>
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemenonName}/`).then(
    response => response.status === 200 && response.json()
  );
