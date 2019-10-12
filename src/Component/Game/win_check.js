const requiredToWin = 5

const checkWin = (board, x, y) => {
    const boardSize = board.length
    const current = board[y][x]

    const leftMin = Math.max(0, x - requiredToWin - 1)
    const rightMin = Math.min(boardSize, x + requiredToWin - 1)

    const topMin = Math.max(0, y - requiredToWin - 1)
    const bottomMin = Math.min(boardSize, y + requiredToWin - 1)

    let direct = 1

    //Walk in x axis
    for(let i = x - 1; i >= leftMin; i--){
        if(board[y][i] !== null && board[y][i] === current)
            direct++
        else
            break;
    }
    for(let i = x + 1; i <= rightMin; i++){
        if(board[y][i] !== null && board[y][i] === current)
            direct++
        else
            break;
    }
    if(direct >= requiredToWin)
        return {type: "win", isCircle: current}

    direct = 1

    //Walk in y axis
    for(let i = y - 1; i >= topMin; i--){
        if(board[i][x] !== null && board[i][x] === current)
            direct++
        else
            break; 
    }
    for(let i = y + 1; i <= bottomMin; i++){
        if(board[i][x] !== null && board[i][x] === current)
            direct++
        else
            break;
    }

    if(direct >= requiredToWin)
        return {type: "win", isCircle: current}

    direct = 1

    return {type: "not_win", isCircle: current}
}

export default checkWin