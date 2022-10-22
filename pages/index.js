import styles from '../styles/Home.module.css'

export async function getStaticProps() {
  const maxPokemon = 50000;
  const api = 'https://pokeapi.co/api/v2/pokemon/'
  const res = await fetch(`${api}/?limit=${maxPokemon}`)
  const data = await res.json()

  // add pokémon index
  data.results.forEach((item, index) => {
    item.id = index + 1;
  })
  console.log(data.results)

  return {
    props: {
      pokemon: data.results
    },
  }
}

export default function Home({ pokemon }) {
  return (
    <div>
      <h1>PokeNext</h1>
      <ul>
        {pokemon.map((pokemon) => (
          <li key={pokemon.id}>{pokemon.name}</li>
        ))}
      </ul>
    </div>
  )
}
