import React, { useState, useEffect } from "react";
import Field from "./../Field";
import { usePeerState, useReceivePeerState } from "react-peer";
import checkWin from "./win_check";
const axios = require("axios").default;

const initializeState = size => {
  let initialState = [];
  for (let y = 0; y < size; y++) {
    const row = [];
    for (let x = 0; x < size; x++) {
      row.push(null);
    }
    initialState.push(row);
  }
  return initialState;
};

const Game = ({ size, gameId }) => {
  const [gameState, setGameState] = useState({
    started: false,
    isCircle: null,
    move: null,
    winner: null
  });
  const [board, setBoard] = useState(initializeState(size));

  const [peerBrokerId, setPeerBrokerId] = useState("");
  const [state, setState, brokerId, connections, stateErr] = usePeerState({
    type: "connection",
    data: "Connected"
  });
  const [peerState, isConnected, recErr] = useReceivePeerState(peerBrokerId);

  const clickHandler = (x, y) => {
    if (gameState.started && gameState.move && board[y][x] === null) {
      const newBoard = board.map((row, indexOut) =>
        row.map((col, indexIn) =>
          x === indexIn && y === indexOut ? gameState.isCircle : col
        )
      );
      setBoard(newBoard);
      setState({ type: "turn", data: newBoard });

      const winStatus = checkWin(newBoard, x, y);

      if (winStatus.type == "win") {
        setGameState({
          ...gameState,
          move: false,
          winner: winStatus.isCircle ? "O" : "X",
          started: false
        });
        setState({ type: "win", data: winStatus.isCircle });
      } else {
        setGameState({ ...gameState, move: false });
      }
    }
  };

  useEffect(() => {
    if (brokerId) {
      const update = setInterval(() => {
        axios
          .get(`/game-connect/${gameId}/${brokerId}`)
          .then(function(response) {
            const data = response.data;
            for (let name in data) {
              let broker = data[name];
              if (broker !== brokerId) {
                setPeerBrokerId(broker);
                clearInterval(update);
                break;
              }
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }, 2000);
    }
  }, [brokerId]);

  useEffect(() => {
    if (peerState) {
      switch (peerState.type) {
        case "connection":
          console.log(peerState.data);
          break;
        case "turn":
          setBoard(peerState.data);
          setGameState({ ...gameState, move: true });
          break;
        case "win":
          setGameState({
            ...gameState,
            move: false,
            started: false,
            winner: peerState.data ? "O" : "X"
          });
      }
    }
  }, [peerState]);

  useEffect(() => {
    if (isConnected) {
      if (peerBrokerId > brokerId) {
        setGameState({
          ...gameState,
          started: true,
          isCircle: true,
          move: true
        });
      } else {
        setGameState({
          ...gameState,
          started: true,
          isCircle: false,
          move: false
        });
      }
    }
  }, [isConnected]);

  console.log(gameState);

  const move = gameState.move ? "You" : "Opponent";
  const started = gameState.started ? "Yes" : "No";
  const isCircle = gameState.isCircle ? "O" : "X";
  const conn = isConnected ? "Yes" : "No";

  return (
    <div>
      Move: {move} <br />
      Started: {started}
      <br />
      Symbol: {isCircle}
      <br />
      IsConnected: {conn}
      <br />
      Winner: {gameState.winner}
      <table style={{ borderCollapse: "collapse" }}>
        <tbody>
          {board.map((items, y) => (
            <tr key={y}>
              {items.map((item, x) => (
                <Field
                  key={`${y}${x}`}
                  isCircle={item}
                  onClick={() => clickHandler(x, y)}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Game;
