import React from 'react';

class PokemonDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pokemonDescription: null
    }
    this.renderType = this.renderType.bind(this);
    this.renderDescription = this.renderDescription.bind(this);
    // this.makeRequest = this.makeRequest.bind(this);
    // this.descriptionRenderer = this.descriptionRenderer.bind(this);
  }

  renderDescription() {
    var desc = "";
    const url = this.props.pokemon.species.url;
    const request = new XMLHttpRequest();
    request.open("GET", url);
    request.addEventListener("load", () => {
      if (request.status === 200) {
        const jsonString = request.responseText;
        const data = JSON.parse(jsonString);
        let pokeData = data.flavor_text_entries;
        for (let item of pokeData) {
          if (item.language.name === "en") {
            desc = item.flavor_text;
          }
        }

      }
      console.log(desc);
      this.setState({pokemonDescription: desc})
    });

    request.send();
    //
    // return desc;

    // return desc;
  }

  // descriptionRenderer() {
  //   if(this.status === 200) {
  //     console.log("Hiya");
  //     var jsonString = this.responseText;
  //     var data = JSON.parse(jsonString);
  //     let pokeData = data.flavor_text_entries;
  //     console.log(pokeData[0]);
  //     let desc = "";
  //     for (let item of pokeData) {
  //       if(item.language.name === 'en') {
  //         desc = item.flavor_text;
  //       }
  //     }
  //     console.log(desc);
  //     return desc
  //   }
  // }
  //
  // makeRequest(url, callback) {
  //   console.log("hiya");
  //   var request = new XMLHttpRequest();
  //   request.open('GET', url);
  //   request.addEventListener('load', callback);
  //   request.send();
  //   console.log(callback);
  // }

  renderType() {

    let typeArr = "";
    for (var typing of this.props.pokemon.types) {
      typeArr += (typing.type.name) + " ";
    }
    console.log(typeArr);

    return typeArr;
  }

  render() {
    const pokemonSelected = this.props.pokemon



    if (!this.props.pokemon) {
      return null
    }

    const typing = this.renderType();
    // const pokeDesc = this.makeRequest(pokemonSelected.species.url, this.descriptionRenderer)
    this.renderDescription();
    // console.log("Hello", pokeDesc);
    // console.log(pokeDesc);

    return (
      <div>
        <img alt={pokemonSelected.name} src={pokemonSelected.sprites.front_default}></img>
        <h3>
          {pokemonSelected.name}
        </h3>
        <h5>
          {typing}
        </h5>
        <h5>
          {this.state.pokemonDescription}
        </h5>
      </div>
    )
  }
}

export default PokemonDetail;
