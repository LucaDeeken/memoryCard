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
  let [cardObjectList, setObjectList] = useState([]);
  //Changes to true, when the game is running.
  const [gameRunning, setGameRunning] = useState(false);
  //Changes to true, when the newGame modal opens.
  const [isModalOpen, setIsModalOpen] = useState(true);
  //Gets true when Pokemon are loaded into window
  const [windowGrows, setWindowGrows] = useState(false);
  //Stores the amount of pokemons, equivalent to the chosen difficulty.
  const [difficulty, setDifficulty] = useState(0);
  //Stores the HighScore in the LocalStorage.
  const [highScore, setHighscore] = useState(() => {
  const saved = localStorage.getItem("highScore");
  return saved !== null ? JSON.parse(saved) : 0;
});
  //Gets true, when you lose the game.
  const [gameOver, setgameOver] = useState(false);
  //Gameover modal.
  const [gameOverModal, setGameoverModal] = useState(false);
  //Gets true, when you win the game.
  const [win, setWin] = useState(false);
  //Win modal.
  const [winModal, setWinModal] = useState(false);
  //blocks click-event while cards are rotating.
  const [noclick, setNoClick] = useState(false);
  //Controlls the cardRotate-animation.
  const [rotate, setRotate] = useState(false);
  //Extra controll for the cardRotate-animation.
  const [flipped, setFlip] = useState(false);
  //Gets true, when 'gottaCatchEmAll'-Mode enables.
  const [catchEmAll, setCatchEmAll] = useState(false);
  //Extra array for 'gottaCatchEmAll'-Mode. Stores all the pokemon that are still coming.
  const [catchEmAllPokLeft, setCatchEmAllPokLeft] = useState([]);
  //Triggers the start of 'gottaCatchEmAll'-Mode and shows only the starters in the firstRound.
  const [firstClick, setFirstClick] = useState(true);
  //Controlls the shuffle-Animation.
  const [shufflePokemon, setShufflePokemon] = useState("");

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
      if (counter + 1 > highScore) {
        setHighscore(counter);
      }
      setCounter(0);
      setgameOver(true);
    } else {
      setCounter((prevCounter) => prevCounter + 1);
      setClickedIds((prevList) => [...prevList, id]);
      if (counter + 1 === difficulty) {
        setWin(true);
        setWinModal(true);
      }
    }
  }

  //stores highScore in localStorage
    useEffect(() => {
    localStorage.setItem("highScore", JSON.stringify(highScore));
  }, [highScore]);

  //Shuffles the pokemonArray for a fresh sortage.
  useEffect(() => {
    if (counter === 0) return;
    setTimeout(() => {
      setObjectList((prevList) => {
        let array = [...prevList];
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      });
    }, 1500);
  }, [counter, shufflePokemon]);

  //shows gameOver Modal and stops clickEvents on cards.
  useEffect(() => {
    if (gameOver) {
      setGameoverModal(true);
      setNoClick(true);
    } else {
      return;
    }
  }, [gameOver]);

  //Loads the pokemons from PokeAPI when the game starts
  useEffect(() => {
    const getPokeData = async () => {
      const pokemonList = [];

      if (catchEmAll) {
        for (let i = 1; i < 151; i++) {
          pokemonList.push(i);
        }
      } else {

        //choses random pokemon of firstGen.
        for (let i = 0; i < difficulty; i++) {
          let randomNum = Math.floor(Math.random() * 151) + 1;
          while (pokemonList.includes(randomNum)) {
            randomNum = Math.floor(Math.random() * 151);
          }
          pokemonList.push(randomNum);
        }
      }
      try {
        if (!gameRunning) {
          return;
        }

        //Reset
        setClickedIds([]);
        setCatchEmAllPokLeft([]);
        setObjectList([]);
        setFirstClick(true);

        const responses = await Promise.all(
          pokemonList.map((pokemon) =>
            fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`),
          ),
        );
        const responseData = await Promise.all(
          responses.map((obj) => obj.json()),
        );
        const updateState = responseData.map((obj) => ({
          id: crypto.randomUUID(),
          pokemon: obj.name,
          picture: obj.sprites.front_default,
        }));

        if (catchEmAll) {
          setCatchEmAllPokLeft(updateState);
          const starters = [updateState[0], updateState[3], updateState[6]];
          setObjectList(starters);
          setCatchEmAllPokLeft((prev) =>
            prev.filter((_, index) => ![0, 3, 6].includes(index)),
          );
        } else {
          setObjectList(updateState);
        }
      } catch (error) {
        console.error("failed", error);
      }
    };
    getPokeData();
    setGameRunning(false);
  }, [gameRunning]);

  //rotates the cards
  function rotateCards(id) {
    if (noclick) {
      return;
    }
    setNoClick(true);
    setRotate((prev) => !prev);

    setTimeout(() => {
      if (catchEmAll) {
        setFlip(true);
        if (firstClick) {
          for (let j = 0; j < cardObjectList.length; j++) {
            if (cardObjectList[j].id === id) {
              //
            } else {
              setCatchEmAllPokLeft((prev) => [...prev, cardObjectList[j]]);
              setObjectList((prev) => prev.filter((card) => card.id !== cardObjectList[j].id));
            }
          }
          addPokemonForAllYouCanCatch();
          addPokemonForAllYouCanCatch();
          addPokemonForAllYouCanCatch();
          setFirstClick(false);
        }
        setShufflePokemon("s");
        addPokemonForAllYouCanCatch();
      }
    }, 500);
    setTimeout(() => {
      setFlip(false);
      setRotate((prev) => !prev);
      setNoClick(false);
    }, 2100);
  }

  //extra function for 'gottaCatchEmAll'-mode, that choses a random pokemon of the pokemons, that are left.
  function addPokemonForAllYouCanCatch() {
    const numOfPokemonLeft = catchEmAllPokLeft.length;
    const randomIndex = Math.floor(Math.random() * numOfPokemonLeft);
    const pokemonChosen = catchEmAllPokLeft[randomIndex];
    setCatchEmAllPokLeft((prev) => prev.filter((_, i) => i !== randomIndex));
    setObjectList((prev) => [...prev, pokemonChosen]);
  }

  return (
    <>
      <div
        className="bodyElement"
        style={{
          backgroundImage: "url('/background.jpg')",
        }}
      >
        <pre className="mainHeader">
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
            setCounter={setCounter}
            setObjectList={setObjectList}
            setCatchEmAll={setCatchEmAll}
            setgameOver={setgameOver}
            setNoClick = {setNoClick}
            gameOver={gameOver}
            setWin={setWin}
            setWindowGrows = {setWindowGrows}
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
        <main className={`cardArea ${windowGrows ? "grown" : ""}`}>
          {cardObjectList.map((card) => {
            return (
              <Card
                card={card}
                key={card.id}
                increaseCounter={increaseCounter}
                cardObjectList={cardObjectList}
                rotateCards={rotateCards}
                rotate={rotate}
                flipped={flipped}
                catchEmAll={catchEmAll}
                canClick={noclick}
                gameOver={gameOver}
                win={win}
              />
            );
          })}
          {gameOverModal && (
            <Modal>
              {" "}
              <div className="gameOverMod">
                <p>Oops! You clicked this one before, didn't you?</p>
                <button
                  onClick={() => {
                    setGameoverModal(false);
                  }}
                >
                  Game Over
                </button>
              </div>
            </Modal>
          )}
          {winModal && (
            <Modal>
              {" "}
              <div className="gameOverMod">
                <p>You won the game! Sick!</p>
                <button
                  onClick={() => {
                    setWinModal(false);
                  }}
                >
                  Hurray!
                </button>
              </div>
            </Modal>
          )}
        </main>
      </div>
    </>
  );
}

export default App;
