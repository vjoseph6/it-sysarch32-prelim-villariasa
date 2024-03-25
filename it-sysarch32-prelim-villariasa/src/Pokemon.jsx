import React from "react";

function Pokemon({ pokemon, language, image, id, name, HP, Speed, Defense, SPAttack, attack,SPDef}) {
  return (
    <div className="pokemon">
      <img className="pokemon-image" src={image} alt={pokemon.name.english} />
      <div className="title">
        {/* Render the name based on the selected language */}
        <h2 className="pokemon-name">[{id}] {name[language]}</h2>
      </div>
      <div className="type">
        {pokemon.type.map((type, index) => (
          <button className="btn" key={index}>
            {type}
          </button>
        ))}
      </div>
      <div className="details">
        <div className="stats">
          <h2>HP: {HP}</h2>
          <h2>Speed: {Speed}</h2>
        </div>
        <div className="stats">
          <h2>Defense: {Defense}</h2>
          <h2>Sp. Attack: {SPAttack}</h2>
        </div>
        <div className="stats">
          <h2>Attack: {attack}</h2>
          <h2>Sp. Def: {SPDef}</h2>
        </div>
      </div>
    </div>
  );
}

export default Pokemon;
