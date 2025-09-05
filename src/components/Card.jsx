function Card({ card, increaseCounter, rotateCards, rotate, flipped }) {
  return (
    <>
      <div
        className="card"
        onClick={() => {
          increaseCounter(card.id);
          rotateCards(card.id);
        }}
      >
        <div
          className="card-inner"
          style={{ transform: flipped
            ? "rotateY(180deg)"         // Wenn rotate true ist
            : rotate
            ? "rotateY(180deg)"          // Wenn rotate false, aber isNew true ist
            : "rotateY(0deg)"           // Wenn beide false sind 
            }}
        >
          <div className="card-front">
            <img
              src={card.picture}
              alt={card.pokemon}
              className="pokemonImage"
            ></img>
          </div>
          <div className="card-back">
            <p>Rückseite</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
