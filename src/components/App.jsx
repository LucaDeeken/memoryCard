import { useState } from "react";
import "../style/reset.css";
import "../style/app.css";
import CardArea from "./CardArea";

function App() {
  return (
    <>
      <div className="bodyElement">
        <header className="mainHeader">PokeCard!</header>
        <div className="newGameArea"></div>
        <div className="scoresArea"></div>
        <CardArea />
      </div>
    </>
  );
}

export default App;
