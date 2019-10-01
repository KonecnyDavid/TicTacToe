import React from "react";

const Field = ({ isCircle, onClick }) => (
    <td
      onClick={onClick}
      style={{
        width: "40px",
        height: "40px",
        border: "1px solid black",
        fontSize: "30px",
        textAlign: "center",
        verticalAlign: "center",
        cursor: "pointer"
      }}
    >
      {isCircle === null ? "" : isCircle === true ? "O" : "X"}
    </td>
);

export default Field;
