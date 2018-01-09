import React from 'react';
import PokemonSelector from '../components/PokemonSelector';
import PokemonDetail from '../components/PokemonDetail';

class PokemonContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemonArray: [],
      selectedPokemon: null,
      // pokemonDescription: null
    }

    this.handleSelectedPokemon = this.handleSelectedPokemon.bind(this);
  }

  componentDidMount() {
    console.log("Did Mount");
    const url = "https://pokeapi.co/api/v2/pokemon/?limit=151"
    const request = new XMLHttpRequest();
    request.open("GET", url);
    request.addEventListener("load", () => {
      if(request.status === 200) {
        const jsonString = request.responseText;
        const data = JSON.parse(jsonString);
        this.setState({pokemonArray: data.results})
      }
    });
    request.send();
  }

  handleSelectedPokemon(index) {
    const url = this.state.pokemonArray[index].url;
    console.log("hit response");
    const request = new XMLHttpRequest();
    request.open("GET", url);
    request.addEventListener("load", () => {
      if (request.status === 200) {
        const jsonString = request.responseText;
        const data = JSON.parse(jsonString);
        this.setState({selectedPokemon: data})
      }
    });
    request.send();
  }

  render() {
    // const pokemon = this.state.pokemonArray;

    return (
      <div>
        <h2>Pokemon List</h2>
        <PokemonSelector
          pokemonArray={this.state.pokemonArray}
          onSelect={this.handleSelectedPokemon}
        />
        <PokemonDetail pokemon={this.state.selectedPokemon} />
      </div>
    )
  }
}

export default PokemonContainer;
