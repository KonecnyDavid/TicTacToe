import React from "react";

const GameInfo = ({ gameState, isConnected }) => {
  const move = gameState.move ? "You" : "Opponent";
  const started = gameState.started ? <span className="tag is-success">Started</span> : <span className="tag is-danger">Not Started</span>;
  const isCircle = gameState.isCircle ? "0" : "X";
  const conn = isConnected ? <span className="tag is-success">Connected</span> : <span className="tag is-danger">Not connected</span>;
  const winner = gameState.winner === null? "No winner" : gameState === "X"? "X is a winner":"O is a winner";

  return (
    <aside className="menu">
      <p className="menu-label">Game Info</p>
      <ul className="menu-list">
        <li>
          <a>{conn}</a>
        </li>
        <li>
          <a>{started}</a>
        </li>
        <li>
          <a>Move: <span class="tag is-link">{move}</span></a>
        </li>
        <li>
          <a>Symbol: {isCircle}</a>
        </li>
        <li>
          <a>{winner}</a>
        </li>
      </ul>
    </aside>
  );
};

export default GameInfo;
