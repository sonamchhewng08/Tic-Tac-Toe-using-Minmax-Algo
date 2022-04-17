import React ,{useState} from 'react'
import './css/app.css'
import * as Algo from './minimax.js'
const App = () => {
  const [text, settext] = useState("");
  const [Stop, setStop] = useState(false)
  const [players,setPlayers]=useState("1");
  const[isplayer,setisplayer]=useState(false);
  let human=true;
  const board=[
    ['','',''],
    ['','',''],
    ['','','']
  ];
  const handlePlayers=(e)=>{
      setPlayers(e.target.value);
  }
  const reset=()=>{
    for(let i=0;i<3;i++){
      for(let j=0;j<3;j++){
        board[i][j]='';
      }
    }
    settext("");
    setStop(false);
    setisplayer(false);
    human=true;
    for(let i=0;i<=8;i++){
      document.getElementById(i).classList.remove('ai','human');
    }
    console.log(board);
  }
  const controler=(e)=>{
      if(players==="1"){
        addhuman(e);
      }else{
        if(human) addhuman(e);
        else addA(e);
      }
  }
  const addhuman=(key)=>{
    if(!human || Stop)return;
    const list=document.getElementById(key.target.id).classList;
    if(list.length>1) return;
    let j=key.target.id%3;
    let i=0;
    if(key.target.id<=2) i=0;
    else if(key.target.id<=5)i=1;
    else i=2;
    board[i][j]='H';
    list.add('human');
    human=false;
    const winner=Algo.checkWinner(board);
    if(winner!==null){
      setStop(true);
      if(winner==="X") settext("X win");
      else if(winner==="O") settext("O win")
      else settext("Draw") 
    }
    if(players==="1"){
      setTimeout(() => {
        
        addAi();
      }, 100);
    }
  }
  const addA=(key)=>{
    if(human || Stop)return ;
    const list=document.getElementById(key.target.id).classList;
    if(list.length>1) return;
    let j=key.target.id%3;
    let i=0;
    if(key.target.id<=2) i=0;
    else if(key.target.id<=5)i=1;
    else i=2;
    board[i][j]='A';
    list.add('ai');
    human=true;
    const winner=Algo.checkWinner(board);
    if(winner!==null){
      setStop(true);
      if(winner==="X") settext("X win");
      else if(winner==="O") settext("O win")
      else settext("Draw") 
    }
    // alert(Algo.checkWinner(board));
  }
  const addAi=()=>{
    if(human || Stop) return;
    const cor=Algo.bestMove(board);
    let key=0;
    console.log(key);
    if(cor.i===0)key=cor.j;
    else if(cor.i===1)key=cor.j+3;
    else key=cor.j+6;
    const list=document.getElementById(key).classList;
    let j=key%3;
    if(key<=2) board[0][j]='A';
    else if(key<=5)board[1][j]='A';
    else board[2][j]='A';
    list.add('ai');
    human=true;
    const winner=Algo.checkWinner(board);
    if(winner!==null){
      setStop(true)
      if(winner==="X") settext("X win");
      else if(winner==="O") settext("O win")
      else settext("Draw") 
    } 
  }
  return (
    <div className='Main'>
      <div className='left'>
        <h2>Tic Tac Toe</h2>
        <div className='left_inside'>
          <button className='button' onClick={()=>reset()}> Reset</button>
          <div>
            <span>Select players:</span>
            <select className='select' disabled={isplayer} onChange={(e)=>handlePlayers(e)} id="sonam_Uiet" name='Number of Players' >
                <option value="1">1</option>
                <option value="2">2</option>
            </select>
          </div>
        </div>
        <div className="middle_text"> {text}</div>
        <span>{text?"press the reset button to play again":""}</span>
      </div>
      <div className='right'>
        <div className='Square'>
          <div className="row">
            <div onClick={(e)=> controler(e) } id='0' className='box'></div>
            <div onClick={(e)=> controler(e)} id='1' className='box'></div>
            <div onClick={(e)=> controler(e) } id='2' className='box'></div>
          </div>
          <div className="row">
            <div  onClick={(e)=>controler(e) } id='3' className='box'></div>
            <div onClick={(e)=> controler(e) } id='4' className='box'></div>
            <div onClick={(e)=> controler(e) } id='5' className='box'></div>
          </div>
          <div className="row">
            <div onClick={(e)=> controler(e) } id='6' className='box'></div>
            <div onClick={(e)=> controler(e) } id='7' className='box'></div>
            <div onClick={(e)=> controler(e) } id='8' className='box'></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App