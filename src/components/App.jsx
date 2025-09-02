import { useEffect, useState } from "react";
import "../style/reset.css";
import "../style/app.css";
import NewGameButton from "./Buttons/NewGameButton.jsx";
import Card from "./Card.jsx";

function App() {
  const [counter, setCounter] = useState(0);
  const [clickedIds, setClickedIds] = useState([]);
  const [cardObjectList, setObjectList] = useState([]);

  function increaseCounter(id) {
    if (clickedIds.includes(id)) {
      console.log("fuckUp");
    } else {
      setCounter((prevCounter) => prevCounter + 1);
      setClickedIds((prevList) => [...prevList, id]);
      console.log(counter);
      console.log(clickedIds);
    }
  }

  useEffect(() => {
    setObjectList((prevList) => {
      let array = [...prevList];
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    });
  }, [counter]);

  useEffect(() => {
    const getPokeData = async () => {
      const pokemonList = [];

      for (let i = 0; i < 5; i++) {
        let randomNum = Math.floor(Math.random() * 151) + 1;
        while (pokemonList.includes(randomNum)) {
          randomNum = Math.floor(Math.random() * 151);
        }
        pokemonList.push(randomNum);
      }

      try {
        const responses = await Promise.all(
          pokemonList.map((pokemon) =>
            fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
          )
        );
        const responseData = await Promise.all(
          responses.map((obj) => obj.json())
        );
        const updateState = responseData.map((obj) => {
          let newForm = {
            id: crypto.randomUUID(),
            pokemon: obj.name,
            picture: obj.sprites.front_default,
          };
          setObjectList((prevList) => [...prevList, newForm]);
        });

        console.log(responseData);
        console.log(cardObjectList);
      } catch (error) {
        console.error("failed", error);
      }
    };
    getPokeData();
  }, []);

  //changes order of the pokemonObjects

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
            return (
              <Card
                card={card}
                key={card.id}
                increaseCounter={increaseCounter}
                cardObjectList={cardObjectList}
              />
            );
          })}
        </main>
      </div>
    </>
  );
}

export default App;
