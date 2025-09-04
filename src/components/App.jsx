import { useEffect, useState } from "react";
import "../style/reset.css";
import "../style/app.css";
import NewGameButton from "./Buttons/NewGameButton.jsx";
import Card from "./Card.jsx";
import Modal from "./Modal.jsx";

function App() {
  //Stores the current amount of successfully clicked cards.
  const [counter, setCounter] = useState(0);
  //Stores the Ids of all successfully clicked cards.
  const [clickedIds, setClickedIds] = useState([]);
  //Stores all PokemonAPI Data.
  const [cardObjectList, setObjectList] = useState([]);
  //Changes to true, when the game is running.
  const [gameRunning, setGameRunning] = useState(false);
  //Changes to true, when the newGame modal opens.
  const [isModalOpen, setIsModalOpen] = useState(true);
  //Stores the amount of pokemons, equivalent to the chosen difficulty.
  const [difficulty, setDifficulty] = useState(0);
  //Stores the HighScore in the LocalStorage.
  const [highScore, setHighscore] = useState(0);

  //opens the modal, which let you chose a difficulty and afterwards starts/resets the game.
  function closeModal() {
    setIsModalOpen(false);
  }
  function openModal() {
    setIsModalOpen(true);
  }

  //increases the counter and also puts the clicked Ids in an array, which keeps track of the cards, that already got clicked.
  function increaseCounter(id) {
    if (clickedIds.includes(id)) {
      if (counter > highScore) {
        setHighscore(counter);
      }
      setCounter(0);
      console.log(highScore);
      alert("you lost. New game?");
    } else {
      setCounter((prevCounter) => prevCounter + 1);
      setClickedIds((prevList) => [...prevList, id]);

      if(counter===difficulty) {
        alert("you won!");
      }
      console.log(counter);
      console.log(clickedIds);
    }
  }

  //Shuffles the pokemonArray for a fresh sortage.
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

  //Loads the pokemons from PokeAPI when the game starts
  useEffect(() => {
    const getPokeData = async () => {
      const pokemonList = [];

      for (let i = 0; i < difficulty; i++) {
        let randomNum = Math.floor(Math.random() * 151) + 1;
        while (pokemonList.includes(randomNum)) {
          randomNum = Math.floor(Math.random() * 151);
        }
        pokemonList.push(randomNum);
      }

      try {
        if (!gameRunning) {
          return;
        }

        //Reset
        setClickedIds([]);
        setObjectList([]);
        setCounter(0);

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
    setGameRunning(false);
  }, [gameRunning]);

  return (
    <>
      <div className="bodyElement">
        <pre
          className="mainHeader"
        >
          {String.raw`
  _____      _         _____              _ _ 
 |  __ \    | |       / ____|            | | |
 | |__) |__ | | _____| |     __ _ _ __ __| | |
  |  ___/ _ \| |/ / _ \ |    / _\` | '__/ _\` | 
 | |  | (_) |   <  __/ |___| (_| | | | (_| |_|
                |_|   \___/|_|\_\___|\_____\__,_|_|  \__,_(_)               
`}
        </pre>
        <div className="newGameArea">
          <NewGameButton
            isModalOpen={isModalOpen}
            openModal={openModal}
            closeModal={closeModal}
            setGameRunning={setGameRunning}
            setDifficulty={setDifficulty}
          />
        </div>
        <div className="scoresArea">
          <h2 className="currentScore">
            Score:{" "}
            <span>
              {counter}/{difficulty}{" "}
            </span>
          </h2>
          <h2 className="highScore">
            HighScore: <span>{highScore}</span>
          </h2>
        </div>
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
        {isModalOpen && (
          <Modal>
            <p>Chose your Difficulty!</p>
            <button
              onClick={() => {
                closeModal();
                setGameRunning(true);
                setDifficulty(5);
              }}
            >
              Easy
            </button>
            <button
              onClick={() => {
                closeModal();
                setGameRunning(true);
                setDifficulty(10);
              }}
            >
              Medium
            </button>
            <button
              onClick={() => {
                closeModal();
                setGameRunning(true);
                setDifficulty(15);
              }}
            >
              Hard
            </button>
          </Modal>
        )}
      </div>
    </>
  );
}

export default App;
