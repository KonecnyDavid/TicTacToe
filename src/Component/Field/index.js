import React from "react";
import ReactSVG from "react-svg";
const Field = ({ isCircle, onClick }) => {
  const symbol =
    isCircle === null ? (
      ""
    ) : isCircle === true ? (
      <ReactSVG
        beforeInjection={svg => {
          svg.setAttribute("style", "height: 30px; width: 30px;");
        }}
        src="/circle.svg"
      />
    ) : (
      <ReactSVG
        beforeInjection={svg => {
          svg.setAttribute("style", "height: 30px; width: 30px;");
        }}
        src="/cross.svg"
      />
    );
  return (
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
      {symbol}
    </td>
  );
};

export default Field;
