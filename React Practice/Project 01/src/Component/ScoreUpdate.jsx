import React from 'react'

export default function ScoreUpdate({player,setPlayer, targetScore}) {
    function onIncrement(id){
        setPlayer((prev)=>{
        return prev.map((p)=>(p.playerID==id)&&(p.score<targetScore) ? {...p, score:p.score+1} : p)
        })
    }
    function onDecrement(id){
        setPlayer((prev)=>{
        return prev.map((p)=>(p.playerID==id)&&(p.score>0) ? {...p, score:p.score-1} : p)
        })
    }

    function increaseAll(){
        setPlayer((prev)=>{
        return prev.map((p)=>((p.score<targetScore) ? {...p, score:p.score+1} : p))
        })
    }
    function decreaseAll(){
        setPlayer((prev)=>{
        return prev.map((p)=>((p.score>0) ? {...p, score:p.score-1} : p))
        })
    }

  return(
    <>
    
      <button onClick={increaseAll}>Increase</button>
      <div style={{display:'flex', flexWrap:'wrap', gap:'10px', justifyContent:'center'}}>
        {player.map((p)=>{
          return(         
              <div key={p.playerID} style={{display:'flex', justifyContent:'space-between', alignItems:'center', border:'solid 1px', width:'400px'}}>
                {/* <button onClick={onIncrement(p.playerID)}>+</button> */}
                <button onClick={()=>onIncrement(p.playerID)}>+</button>
                <div>
                  <p>Name : {p.name}</p>
                  <p>Score : {p.score}</p>
                </div>
                <button onClick={()=>onDecrement(p.playerID)}>-</button>
              </div>
          )
        })}
      </div>
      <button onClick={decreaseAll}>Decrease</button>
      <p style={{borderBottom:'solid 1px white', marginBottom:'15px'}}/>
    </>
  )
}
