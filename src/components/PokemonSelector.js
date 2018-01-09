import React from 'react';

class PokemonSelector extends React.Component {
  handleChange(event) {
    this.props.onSelect(parseInt(event.target.value, 10));
  }

  render() {
    const options = this.props.pokemonArray.map((pokemon, index) => {
      return <option value={index} key={index}>{pokemon.name}</option>
    })

    return (
      <select id="pokemon" onChange={this.handleChange.bind(this)}>
        {options}
      </select>
    )
  }
}

export default PokemonSelector;
