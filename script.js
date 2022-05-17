const boardSize=3
//TODO add eventListener for div, and add text next next day

const board= (()=>{
    let board=[];
    for(let i=0;i<boardSize;i++){
        row=[];
        for(let j=0;j<boardSize;j++){
            row.push(' ') //initialize board
        }
        board.push(row);
    }

    const setSymbol=(i,j,symbol)=>{
        if(i<0||j<0||i>boardSize||j>boardSize)
            console.log("invalid index to setSymbol:",i,",",j)

        symbol=symbol.toUpperCase();
        if(symbol!='X'&&symbol!='O'&&symbol!=' '){
            console.log("wrong symbol\n you input:",symbol);
            return;
        }
        board[i][j]=symbol;
        board.display();
    }

    const display=()=>{
        console.table(board);

        //check every value of board, then change class,src of image in div
        for(let i=0;i<boardSize;i++){
            for(let j=0;j<boardSize;j++){
                if(board[i][j]!=' '){
                    const block=document.getElementById("block"+String(i)+"_"+String(j));
                    block.classList.remove('emptyBlock');

                    if(board[i][j]=='X'){
                        block.src="images/x-svgrepo-com.svg";
                        block.classList.add("imgX");
                    }
                    else if(board[i][j]=='O'){
                        block.src="images/circle-svgrepo-com.svg";
                        block.classList.add("imgX");
                    }
                }
            }
        }  
    }

    //check if the symbol has three in a line
    const win=(symbol)=>{
        for(let i=0;i<boardSize;i++){
            for(let j=0;j<boardSize;j++){
                let cnt=0;

                //check row
                if(i==0){
                    while(cnt<boardSize){
                        if(board[i+cnt][j]!=symbol)
                            break;
                        cnt++;
                    }
                    if(cnt==boardSize)
                        return true;
                }
                //check column
                if(j==0){
                    cnt=0;
                    while(cnt<boardSize){
                        if(board[i][j+cnt]!=symbol)
                            break;
                        cnt++;
                    }
                    if(cnt==boardSize)
                        return true;
                }
                //check diagonal
                if(i==0&&j==0){
                    cnt=0;
                    while(cnt<boardSize){
                        if(board[i+cnt][j+cnt]!=symbol)
                            break;
                        cnt++;
                    }
                    if(cnt==boardSize)
                        return true;
                }
            }
        }
        return false;
    }

    const reset=()=>{
        board.forEach(row=>row.forEach(block=>block=" "))
    }

    return {board,setSymbol,display,reset,win};
})();



const playerFactory = (name,symbol,board)=>{
    const place = (i,j)=>{
        if(board.win(symbol))
            return;//end after 

        board.setSymbol(i,j,symbol);
        console.log(name,"placed",symbol,"on","(" ,i+1,",",j+1,")")
        //TODO show text on the page
        if(board.win(symbol)){
            console.log(name,"win!");
            //ask for reset
            }
    }

    return {name,symbol,place};
}

const user=playerFactory('you','X',board);

// user.place(0,2)
// user.place(1,1)
// user.place(2,1)
// user.place(0,1)

board.display();