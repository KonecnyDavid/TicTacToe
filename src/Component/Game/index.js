import React, { useState, useEffect } from "react";
import { usePeerState, useReceivePeerState } from "react-peer";
import Field from "./../Field";

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

const Game = ({ recieveBrokerId, size, player}) => {
  const [state, setState] = useState(initializeState(size));

  const [messageIn, isConnected] = useReceivePeerState(recieveBrokerId);
  const [messageOut, setMessageOut, sendBrokerId, connections] = usePeerState();

  const clickHandler = (x, y) => {

    const newState = state.map((row, indexOut) => row.map((col, indexIn)=> x === indexIn && y === indexOut?player === "circle"? true : false : col))
    setState(newState);
  };

  useEffect(() => {

  }, [messageIn]);

  return (
    <div>
      <table style={{ borderCollapse: "collapse" }}>
        <tbody>
          {state.map((items, y) => (
            <tr key={y}>
              {items.map((item, x) => (
                <Field key={`${y}${x}`} isCircle={item} onClick={() => clickHandler(x, y)}/>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Game;
