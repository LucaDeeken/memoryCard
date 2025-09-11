import pokeball from "../assets/pokeball.png";

function Card({
  card,
  increaseCounter,
  rotateCards,
  rotate,
  flipped,
  catchEmAll,
  gameOver,
  canClick,
  win,
}) {
  return (
    <>
      <div
        className="card"
        onClick={() => {
          increaseCounter(card.id);
          rotateCards(card.id);
        }}
        style={{
          ...(catchEmAll ? { height: "100px", width: "100px" } : {}),
          pointerEvents: gameOver || win || canClick ? "none" : "auto",
        }}
      >
        <div
          className="card-inner"
          style={{
            transform: flipped
              ? "rotateY(180deg)" // Wenn rotate true ist
              : rotate
                ? "rotateY(180deg)" // Wenn rotate false, aber isNew true ist
                : "rotateY(0deg)", // Wenn beide false sind
          }}
        >
          <div className="card-front">
            <img
              src={card.picture}
              alt={card.pokemon}
              className="pokemonImage"
              style={{
                ...(catchEmAll ? { transform: "scale(1)" } : {}),
                backgroundColor: gameOver
                ? "#f15d5dff"
                : win
                ? "#5df17dff"
                : "auto"
              }}
                        
            ></img>
          </div>
          <div className="card-back">
            <img
              src={pokeball}
              alt="Pokeball Rückseite"
              className="card-back-image"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
