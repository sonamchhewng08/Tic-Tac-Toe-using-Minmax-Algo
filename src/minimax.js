 export const bestMove=(board)=>{
    let bestScore=-Infinity;
    let move;
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            if(board[i][j]==''){
                board[i][j]='A';
                let score=minmax(board,0,false);
                board[i][j]='';
                if(score>bestScore){
                    bestScore=score;
                    move={i,j};
                }                 
            }
        }
    }
    return move;
}
// ai minmax algo
const minmax=(board,depth,ismax)=>{
    let result=checkWinner(board);
    if(result!==null){
        if(result==='tie')return 0;
        else if(result==='X')return 10-depth;
        else return depth-10;
    }
    if(ismax){
        let bestScore=-Infinity;
        for(let i=0;i<3;i++){
            for(let j=0;j<3;j++){
                if(board[i][j]===''){
                    board[i][j]='A';
                    let score=minmax(board,depth+1,false);
                    board[i][j]='';
                    if(score>bestScore){
                        bestScore=score;
                    }
                }
            }
        }
        return bestScore;
    }else{
        let bestScore=Infinity;
        for(let i=0;i<3;i++){
            for(let j=0;j<3;j++){
                if(board[i][j]===''){
                    board[i][j]='H';
                    let score=minmax(board,depth+1,true);
                    board[i][j]='';
                    if(score<bestScore){
                        bestScore=score;
                    }
                }
            }
        }
        return bestScore;
    }
}
export const checkWinner=(board)=>{
    // left diaognal
      if(board[0][0]===board[1][1] && board[1][1]===board[2][2]){
          if(board[0][0]==='A') return 'X';
          else if(board[0][0]==='H')return 'O';
      }
      // right diaognal
      if(board[0][2]===board[1][1] && board[1][1]===board[2][0]){
        if(board[0][2]==='A') return 'X';
        else if(board[2][0]==='H')return 'O';
      }
      // horizontal  top
      if(board[0][0]===board[0][1] && board[0][1]===board[0][2]){
        if(board[0][1]==='A') return 'X';
        else if(board[0][1]==='H')return 'O';
      }
      // horizontal middle
      if(board[1][0]===board[1][1] && board[1][1]===board[1][2]){
        if(board[1][0]==='A') return 'X';
        else if(board[1][0]==='H')return 'O';
      }
      //horizontal bottom
      if(board[2][0]===board[2][1] && board[2][1]===board[2][2]){
        if(board[2][2]==='A') return 'X';
        else if(board[2][2]==='H')return 'O';
      }
      // vertical left
      if(board[0][0]===board[1][0] && board[1][0]===board[2][0]){
        if(board[0][0]==='A') return 'X';
        else if(board[0][0]==='H')return 'O';
      }
      // vertical middle
      if(board[0][1]===board[1][1] && board[1][1]===board[2][1]){
        if(board[1][1]==='A') return 'X';
        else if(board[1][1]==='H')return 'O';
      }
      if(board[0][2]===board[1][2] && board[1][2]===board[2][2]){
        if(board[0][2]==='A') return 'X';
        else if(board[0][2]==='H')return 'O';
      }

      for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
          if(board[i][j]==='')return null;
        }
      }
      return 'tie'
  }