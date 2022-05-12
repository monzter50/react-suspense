// Render as you fetch
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'
import {
  fetchPokemon,
  PokemonInfoFallback,
  PokemonForm,
  PokemonDataView,
  PokemonErrorBoundary,
  // 🐨 you'll need PokemonErrorBoundary here
} from '../pokemon'
// 🐨 you'll need createResource from ../utils
import {createResource } from '../utils'
// 🐨 Your goal is to refactor this traditional useEffect-style async
// interaction to suspense with resources. Enjoy!

function PokemonInfo({pokemonResource}) {
  const pokemon= pokemonResource.read()
  // 💣 you're pretty much going to delete all this stuff except for the one
  // place where 🐨 appears
 




  // 💰 This is the same thing the PokemonErrorBoundary renders
 

  // 💰 this is the part that will suspend
    // 🐨 instead of accepting the pokemonName as a prop to this component
    // you'll accept a pokemonResource.
    // 💰 you'll get the pokemon from: pokemonResource.read()
    // 🐨 This will be the return value of this component. You won't need it
    // to be in this if statement anymore though!
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
  const [pokemonName, setPokemonName] = React.useState('')
  // 🐨 add a useState here to keep track of the current pokemonResource
  const [pokemonResource,setPokemonResource]= React.useState(null)
  // 🐨 Add a useEffect here to set the pokemon resource to a createResource
  // with fetchPokemon whenever the pokemonName changes.
  // If the pokemonName is falsy, then set the pokemon resource to null

  React.useEffect(()=>{
    if(!pokemonName){
      setPokemonResource(null)
    }
    setPokemonResource(createResource(fetchPokemon(pokemonName)))
  },[pokemonName])
  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }
  function handleReset(){
    setPokemonName('')
  }
  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        {pokemonName ? ( // 🐨 instead of pokemonName, use pokemonResource here
          // 🐨 wrap PokemonInfo in a PokemonErrorBoundary and React.Suspense component
          // to manage the error and loading states that PokemonInfo was managing
          // before your changes.
          //
          // 💰 The PokemonErrorBoundary has the ability to recover from errors
          // if you pass an onReset handler (or resetKeys). As a mini
          // extra-credit, try to make that work.
          // 📜 https://www.npmjs.com/package/react-error-boundary
          <PokemonErrorBoundary onReset={handleReset} resetKeys={[pokemonResource]}>
            <React.Suspense fallback={<PokemonInfoFallback name={pokemonName}/>}>
              <PokemonInfo pokemonName={pokemonName} />
            </React.Suspense>
          </PokemonErrorBoundary>
          
        ) : (
          'Submit a pokemon'
        )}
      </div>
    </div>
  )
}

export default App
