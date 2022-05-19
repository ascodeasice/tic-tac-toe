const boardSize=3
let turn=1;
const infoText=document.getElementById("infoText");

const board= (()=>{
    let board=[];
    for(let i=0;i<boardSize;i++){
        row=[];
        for(let j=0;j<boardSize;j++){
            row.push(' ') //initialize board
        }
        board.push(row);
    }

    const setSymbol=(i,j,symbol)=>{//NOTE controls turn in this function
        if(i<0||j<0||i>boardSize||j>boardSize)
            console.log("invalid index to setSymbol:",i,",",j)

        symbol=symbol.toUpperCase();
        if(symbol!='X'&&symbol!='O'&&symbol!=' '){
            console.log("wrong symbol\n you input:",symbol);
            return;
        }
        if(board[i][j]!=' '){
            console.log("already placed");
            return;
        }
        board[i][j]=symbol;
        turn++;
        if(turn%2==0){
            infoText.innerText=player2.name+" 's turn"
        }
        else{
            infoText.innerText=player1.name+' s turn';
        }
        display();
    }

    const display=()=>{
        //check every value of board, then change class,src of image in div
        for(let i=0;i<boardSize;i++){
            for(let j=0;j<boardSize;j++){
                const block=document.getElementById("block"+String(3*i+j));//NOTE the id is 0~8
                block.classList.remove('emptyBlock');

                if(board[i][j]=='X'){
                    block.src="images/x-svgrepo-com.svg";
                    block.classList.add("imgX");
                }
                else if(board[i][j]=='O'){
                    block.src="images/circle-svgrepo-com.svg";
                    block.classList.add("imgO");
                }
                else{
                    block.src="#";
                    block.classList.remove("imgO");
                    block.classList.remove("imgX");
                    block.classList.add("emptyBlock");
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
                if((i==0)&&(j==boardSize-1)){
                    cnt=0;
                    while(cnt<boardSize){
                        if(board[i+cnt][j-cnt]!=symbol){
                            break;
                        }
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
        for(let i=0;i<boardSize;i++){
            for(let j=0;j<boardSize;j++)
            board[i][j]=' ';
        }
        turn=1;
        infoText.innerText=player1.name+" 's turn"
        display();
    }

    return {board,setSymbol,display,reset,win};
})();



const playerFactory = (name,symbol,board)=>{
    const place = (i,j)=>{
        if(board.win('O')||board.win('X'))
            return;
        board.setSymbol(i,j,symbol);

        if(board.win(symbol)){
            infoText.innerText=name+" wins!"
        }
        else if(turn==10&&!(board.win(symbol))){
            infoText.innerText="It's a tie!";
        }
    }

    return {name,symbol,place};
}


const containers=document.getElementsByClassName("container");
for(let i=0;i<containers.length;i++){
    containers[i].addEventListener("click",function(){
        block=document.getElementById("block"+String(i));
        if(turn%2==1)
            player1.place(Math.floor(i/3),i%3);
        else if(turn%2==0)
            player2.place(Math.floor(i/3),i%3);
    })
}

const player1=playerFactory('player X','X',board);
const player2=playerFactory('player O','O',board);
const restartBtn=document.getElementById("restartBtn");
restartBtn.addEventListener("click",function(){
    board.reset();
})


board.display();