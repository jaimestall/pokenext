import styles from '../../styles/Pokemon.module.css'

import Image from 'next/image'

export const getStaticPaths = async () => {
  const maxPokemons = 251
  const api = `https://pokeapi.co/api/v2/pokemon/`

  const res = await fetch(`${api}/?limit=${maxPokemons}`)

  const data = await res.json()

  const paths = data.results.map((pokemon, index) => {
    return {
      params: {
        pokemonId: index.toString()
      },
    }
  })

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async (context) => {
  let id = context.params.pokemonId;

  if (id === 0) {
    id = 1
  }

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)

  const data = await res.json()

  return {
    props: {
      pokemon: data,
      fallback: false
    },
  }
}

export default function Pokemon({ pokemon }) {
  pokemon.id = String(pokemon.id)
  console.log(typeof pokemon.id)
  return (
    <div className={styles.pokemon_container}>
      <h1 className={styles.title}>{pokemon.name}</h1>
      <Image
        src={`https://cdn.traction.one/pokedex/pokemon/${pokemon.id}.png`}
        width="200"
        height="200"
        alt={pokemon.name}
      />
      <div>
        <h3>Number:</h3>
        <p>#{pokemon.id}</p>
      </div>
      <div>
        <h3>Types:</h3>
        <div className={styles.types_container}>
          {pokemon.types.map((item, index) => (
            <span
              key={index}
              className={`${styles.type} ${styles['type_' + item.type.name]}`}
            >
              {item.type.name}
            </span>
          ))}
        </div>
      </div>

      <h3>Status:</h3>
      <div className={styles.stats_table}>
        <div className={styles.stats_container}>
          {pokemon.stats.map((item, index) => (
            <span
              key={index}
            >
              {item.stat.name}:
            </span>
          ))}
        </div>
        <div className={styles.stats_container_values}>
          {pokemon.stats.map((item, index) => (
            <span
              key={index}
            >
              {item.base_stat}
            </span>
          ))}
        </div>
      </div>
      <div className={styles.data_container}>
        <div className={styles.data_height}>
          <h4>Height:</h4>
          <p>{pokemon.height * 10} cm</p>
        </div>
        <div className={styles.data_weight}>
          <h4>Weight:</h4>
          <p>{pokemon.weight / 10} kg</p>
        </div>
      </div>
    </div>
  )
}