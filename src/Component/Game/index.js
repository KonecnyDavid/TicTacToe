import React, { useState, useEffect } from "react";
import { usePeerState, useReceivePeerState } from "react-peer";
import checkWin from "./win_check";
import Board from "../Board";
import GameInfo from "../GameInfo";
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

      const is_win = checkWin(newBoard, x, y, gameState.isCircle);

      console.log(is_win);

      if (is_win) {
        setGameState({
          ...gameState,
          move: false,
          winner: gameState.isCircle ? "O" : "X",
          started: false
        });
        setState({ type: "win", data: gameState.isCircle });
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
          break;
        case "turn":
          setBoard(peerState.data);
          console.log("My turn");
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

  return (
    <div>
      <div className="columns">
        <div className="column">
          <Board clickHandler={clickHandler} board={board} />
        </div>
        <div className="column">
          <GameInfo gameState={gameState} isConnected={isConnected} />
        </div>
      </div>
      <nav className="level">
        <div className="level-item has-text-centered">
          <div>
            <p className="heading">Game Id</p>
            <p className="title">{gameId}</p>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Game;
