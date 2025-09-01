import { useEffect, useState } from "react";
import "../style/reset.css";
import "../style/app.css";
import NewGameButton from "./Buttons/NewGameButton.jsx";
import Card from "./Card.jsx";

function App() {

  
  useEffect(() => {
    const pokemonList = ["pikachu", "raichu", "charizard"];
    let fetchArr = [];
    pokemonList.forEach((pokemon) => {
      let request = fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
      fetchArr.push(request);
    });

    Promise.all(fetchArr).then(function(results) {
      console.log(results);
    });
  }, []);

  const [cardObjectList, setObjectList] = useState([
    {
      id: crypto.randomUUID(),
      pokemon: "Pikachu",
    },
    {
      id: crypto.randomUUID(),
      pokemon: "Raichu",
    },
    {
      id: crypto.randomUUID(),
      pokemon: "Pikachu",
    },
    {
      id: crypto.randomUUID(),
      pokemon: "Raichu",
    },
    {
      id: crypto.randomUUID(),
      pokemon: "Pikachu",
    },
    {
      id: crypto.randomUUID(),
      pokemon: "Raichu",
    },
    {
      id: crypto.randomUUID(),
      pokemon: "Pikachu",
    },
    {
      id: crypto.randomUUID(),
      pokemon: "Raichu",
    },
    {
      id: crypto.randomUUID(),
      pokemon: "Pikachu",
    },
    {
      id: crypto.randomUUID(),
      pokemon: "Raichu",
    },
  ]);

  return (
    <>
      <div className="bodyElement">
        <header className="mainHeader">PokeCard!</header>
        <div className="newGameArea">
          <NewGameButton />
        </div>
        <div className="scoresArea"></div>
        <main className="cardArea">
          {cardObjectList.map((card) => {
            return <Card card={card} key={card.id} />;
          })}
        </main>
      </div>
    </>
  );
}

export default App;
