import React from 'react';
import Field from "./../Field";

const Board = ({clickHandler, board}) => (
<table style={{ borderCollapse: "collapse", float: "right" }}>
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
)

export default Board;