const board= (()=>{
    let board=[];
    for(let i=0;i<3;i++){
        row=[];
        for(let j=0;j<3;j++){
            row.push(' ') //initialize board
        }
        board.push(row);
    }

    const setSymbol=(i,j,symbol)=>{
        if(symbol!='x'&&symbol!='X'&&symbol!='o'&&symbol!='O'&&symbol!=' '){
            console.log("wrong symbol\n you input:",symbol);
            return;
        }
        board[i][j]=symbol;
    }

    return {board,setSymbol};
})();



const playerFactory = (name,symbol)=>{
    return {name,symbol};
}

const player1=playerFactory('you','X');
