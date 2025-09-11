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
          increaseCounter(card);
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
              ? "rotateY(180deg)" 
              : rotate
                ? "rotateY(180deg)"
                : "rotateY(0deg)",
          }}
        >
          <div className="card-front">
            <img
              src={card.picture}
              alt={card.pokemon}
              className="pokemonImage"
              style={{
                ...(catchEmAll ? { transform: "scale(1)" } : {}),
                backgroundColor: 
                gameOver || win
                ? card.clicked
                ? "#f15d5dff"
                : "#5df17dff" 
                : "transparent" 
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
