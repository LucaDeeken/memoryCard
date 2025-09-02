import Modal from "../Modal.jsx"
import { useState } from "react";

function NewGameButton() {

const [isModalOpen, setIsModalOpen] = useState(false);


function closeModal() {
  setIsModalOpen(false);
}

function openModal() {
  setIsModalOpen(true);
}


  return (
    <>
      <button onClick={() =>openModal()}>New Game!</button>

      {isModalOpen &&(
        <Modal >
          <button onClick={() => closeModal()}>Close it</button>
          <p>Yow</p>
        </Modal>
      )
      
      }
    </>
  );
}

export default NewGameButton;
