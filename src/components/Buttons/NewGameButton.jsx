import Modal from "../Modal.jsx";

function NewGameButton({
  isModalOpen,
  openModal,
  closeModal,
  setGameRunning,
  setDifficulty,
  setCounter,
  setObjectList,
  setCatchEmAll,
  setgameOver,
  setNoClick,
  gameOver,
  win,
  setWin,
  setWindowGrows,
}) {
  return (
    <>
      <button
        className="newGameBtn"
        onClick={() => {
          setCounter(0);
          setObjectList([]);
          openModal();
          setWindowGrows(false);
        }}
        style={{
          animation: gameOver || win ? "pulse 1.5s infinite" : "auto",
        }}
      >
        New Game!
      </button>

      {isModalOpen && (
        <Modal>
          <p className="difficultyText">Chose your Difficulty!</p>
          <button
            className="difficultyEasyBtn"
            onClick={() => {
              closeModal();
              setGameRunning(true);
              setDifficulty(5);
              setCatchEmAll(false);
              setgameOver(false);
              setNoClick(false);
              setWin(false);
              setWindowGrows(true);
            }}
          >
            Easy
          </button>
          <button
            className="difficultyMediumBtn"
            onClick={() => {
              closeModal();
              setGameRunning(true);
              setDifficulty(9);
              setCatchEmAll(false);
              setgameOver(false);
              setNoClick(false);
              setWin(false);
              setWindowGrows(true);
            }}
          >
            Medium
          </button>
          <button
            className="difficultyHardBtn"
            onClick={() => {
              closeModal();
              setGameRunning(true);
              setDifficulty(14);
              setCatchEmAll(false);
              setgameOver(false);
              setNoClick(false);
              setWin(false);
              setWindowGrows(true);
            }}
          >
            Hard
          </button>
          <button
            className="catchAllBtn"
            onClick={() => {
              closeModal();
              setGameRunning(true);
              setDifficulty(151);
              setCatchEmAll(true);
              setgameOver(false);
              setNoClick(false);
              setWin(false);
              setWindowGrows(true);
            }}
          >
            Gotta catch 'em all!
          </button>
        </Modal>
      )}
    </>
  );
}

export default NewGameButton;
