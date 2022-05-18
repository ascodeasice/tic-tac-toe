
//FIXME clicking on the same block with replace it
const boardSize=3

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
        display();
    }

    const display=()=>{
        console.table(board);

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
            }
        }
        return false;
    }

    const reset=()=>{
        for(let i=0;i<boardSize;i++){
            for(let j=0;j<boardSize;j++)
            board[i][j]=' ';
        }
        display();
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
            //TODO ask for reset
            }
    }

    return {name,symbol,place};
}

let turn=1;//TODO reset turn in reset()

const containers=document.getElementsByClassName("container");
for(let i=0;i<containers.length;i++){
    containers[i].addEventListener("click",function(){
        block=document.getElementById("block"+String(i));
        if(turn%2==1)
            player1.place(Math.floor(i/3),i%3);
        else if(turn%2==0)
            player2.place(Math.floor(i/3),i%3);
        turn++;
    })
}

const player1=playerFactory('player1','X',board);
const player2=playerFactory('player2','O',board);
const restartBtn=document.getElementById("restartBtn");
restartBtn.addEventListener("click",function(){
    board.reset();
})


board.display();