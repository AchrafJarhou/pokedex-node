exports.success = (message, data) => {
  return { message, data };
};
//genere un id unique en fonction des id existants
exports.getUniqueId = (pokemons) => {
  // Récupère tous les ids des pokémons existants
  const pokemonsIds = pokemons.map((pokemon) => pokemon.id);
  // Trouve le plus grand id existant
  const maxId = pokemonsIds.reduce((a, b) => Math.max(a, b));
  const uniqueId = maxId + 1;

  return uniqueId;
};
