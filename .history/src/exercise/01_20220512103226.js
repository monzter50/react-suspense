// Simple Data-fetching
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'
// 🐨 you'll also need to get the fetchPokemon function from ../pokemon:
import {PokemonDataView, fetchPokemon, PokemonErrorBoundary} from '../pokemon'

// 💰 use it like this: fetchPokemon(pokemonName).then(handleSuccess, handleFailure)

// 🐨 create a variable called "pokemon" (using let)

// 💣 delete this now...
let pokemon 
let pokemonError

// We don't need the app to be mounted to know that we want to fetch the pokemon
// named "pikachu" so we can go ahead and do that right here.
// 🐨 assign a pokemonPromise variable to a call to fetchPokemon('pikachu')

// 🐨 when the promise resolves, assign the "pokemon" variable to the resolved value
// 💰 For example: somePromise.then(resolvedValue => (someValue = resolvedValue))
const pokemonPromise = fetchPokemon('charizar').then(
  pokemonData => (pokemon = pokemonData),
  error => (pokemonError = error),
)
function PokemonInfo() {
 if(pokemonError){
  throw pokemonError
 }

 if(!pokemon){
   throw pokemonPromise
 }
  return (
    <div>
      <div className="pokemon-info__img-wrapper">
        <img src={pokemon.image} alt={pokemon.name} />
      </div>
      <PokemonDataView pokemon={pokemon} />
    </div>
  )
}

function App() {
  return (
    <div className="pokemon-info-app">
      <div className="pokemon-info">
        {/* 🐨 Wrap the PokemonInfo component with a React.Suspense component with a fallback */}
        <PokemonErrorBoundary>
        <React.Suspense fallback={<div>.....Loading pokemon</div>}>
        <PokemonInfo />
       </React.Suspense>
        </PokemonErrorBoundary>
       
      </div>
    </div>
  )
}

export default App
