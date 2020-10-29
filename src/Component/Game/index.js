import React, { useState, useEffect } from "react";
import checkWin from "./win_check";
import Board from "../Board";
import GameInfo from "../GameInfo";
import Peer from "peerjs";

const initializeState = (size) => {
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

const peer = new Peer();

const Game = ({ size, gameId }) => {
  const [gameState, setGameState] = useState({
    started: false,
    isCircle: null,
    move: null,
    winner: null,
  });

  const [board, setBoard] = useState(initializeState(size));
  const [myPeerId, setMyPeerId] = useState("");
  const [opponentPeerId, setOpponentPeerId] = useState("");
  const [connection, setConnection] = useState(null)
  const [data, setData] = useState(null)

  const clickHandler = (x, y) => {
    if (gameState.started && gameState.move && board[y][x] === null) {
      const newBoard = board.map((row, indexOut) =>
        row.map((col, indexIn) =>
          x === indexIn && y === indexOut ? gameState.isCircle : col
        )
      );
      setBoard(newBoard);
      send({ type: "turn", data: newBoard });

      const is_win = checkWin(newBoard, x, y, gameState.isCircle);

      if (is_win) {
        setGameState({
          ...gameState,
          move: false,
          winner: gameState.isCircle ? "O" : "X",
          started: false,
        });
        send({ type: "win", data: gameState.isCircle });
      } else {
        setGameState({ ...gameState, move: false });
      }
    }
  };

  const send = (data) => {
      if(connection) {
          connection.send(data);
      }
  }

  useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const gameId = urlParams.get('gameId');
        if (gameId) {
            setOpponentPeerId(gameId);
        }
  }, [])

  useEffect(() => {
    // Determine player move
    if (data) {
      switch (data.type) {
        case "connection":
          break;
        case "turn":
          setBoard(data.data);
          setGameState({ ...gameState, move: true });
          break;
        case "win":
          setGameState({
            ...gameState,
            move: false,
            started: false,
            winner: data.data ? "O" : "X",
          });
        default:
      }
    }
  }, [data]);

  useEffect(() => {
    peer.on('open', function(id) {
        setMyPeerId(id)
        peer.on('connection', function(conn) { 
            setConnection(conn)
            setOpponentPeerId(conn.id)

            conn.on('data', function(data){
                console.log(data)
                setData(data)
            })
        });
    });
  }, [])

  useEffect(() => {
    if (connection) {
        const starting = opponentPeerId > myPeerId;
        setGameState({
          ...gameState,
          started: true,
          isCircle: starting,
          move: starting,
        });
    }
  }, [connection])

  useEffect(() => {
    if (!connection && opponentPeerId !== "" && myPeerId !== "") {
        let conn = peer.connect(opponentPeerId);
        conn.on('open', function() {
            setConnection(conn)
            conn.on('data', function(data){
                console.log(data)
                setData(data)
            })
        });
    }
  }, [opponentPeerId, myPeerId])

  return (
    <div>
      <div className="columns">
        <div className="column">
          <Board clickHandler={clickHandler} board={board} />
        </div>
        <div className="column">
          <GameInfo gameState={gameState} isConnected={!!connection} />
        </div>
      </div>
      <nav className="level">
        <div className="level-item has-text-centered">
          <div>
            <p className="heading">Game Id</p>
            <p className="title">{myPeerId}</p>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Game;
