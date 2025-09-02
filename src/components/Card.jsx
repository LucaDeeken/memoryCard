function Card({ card, increaseCounter }) {
  return (
    <>
      <div className="card" onClick={() => increaseCounter(card.id)}>
        <img
          src={card.picture}
          alt={card.pokemon}
          className="pokemonImage"
        ></img>
        <span className="pokemonName">{card.pokemon} </span>
      </div>
    </>
  );
}

export default Card;
