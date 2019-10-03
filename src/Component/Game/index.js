import React, { useState, useEffect } from "react";
import Field from "./../Field";
import Peer from 'peerjs';
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
  const [gameState, setGameState] = useState({started: false, isCircle: null, move: null, oponentId: null});
  const [state, setState] = useState(initializeState(size));
  const [connection, setConnection] = useState();

  const peer = new Peer(); 

  peer.on('connection', (conn) => {
    conn.on('data', (data) => {
      if(data.type === "request-connection"){
        setGameState({...gameState, oponentId: data.name});
        console.log(data);
      }
    });

  });

  const clickHandler = (x, y) => {
    if(gameState.started){
      const newState = state.map((row, indexOut) =>
      row.map((col, indexIn) =>
        x === indexIn && y === indexOut
          ? gameState.isCircle
          : col
      )
    );
    setState(newState);
    }
  };
  useEffect(() => {
    const sendBrokerId = peer.id;

    axios
        .get(`/game-connect/${gameId}/${sendBrokerId}`)
        .then(function(response) {
          const data = response.data;

          for(let name in data)
            if(name !== sendBrokerId){
              const conn = peer.connect(name);
              conn.on('open', () => {
                conn.send({type: "request-connection", name: peer.id});
              });
              console.log(peer.id)
              break;
            }
        })
        .catch(function(error) {
          console.log(error);
        });
  }, [])

  return (
    <div>
      <table style={{ borderCollapse: "collapse" }}>
        <tbody>
          {state.map((items, y) => (
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
