import Modal from "../Modal.jsx";
import { useState } from "react";

function NewGameButton( {isModalOpen, openModal, closeModal, setGameRunning, setDifficulty } ) {
  

  return (
    <>
      <button onClick={() => openModal()}>New Game!</button>

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
    </>
  );
}

export default NewGameButton;
