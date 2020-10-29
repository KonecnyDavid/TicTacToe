import React from "react";
import Circle from "../../rec.png"
import Cross from "../../plus.png"

const Field = ({ isCircle, onClick }) => {
  const symbol =
    isCircle === null ? (
      ""
    ) : isCircle === true ? (
      <img src={Circle} style={{width: 40, height: 40, marginBottom: "-5px"}}/>
    ) : (
      <img src={Cross} style={{width: 40, height: 40, marginBottom: "-5px"}}/>
    );
  return (
    <td
      onClick={onClick}
      style={{
        width: 50,
        height: 50,
        padding: 5,
        border: "1px solid black",
      }}
    
    >
      {symbol}
    </td>
  );
};

export default Field;
