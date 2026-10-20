import React from 'react'

export default function WinnerList({targetScore,setTargetScore ,player}) {
    function onSubmission(e){
        e.preventDefault();
        const formData = new FormData(e.target)
        const target = Number(formData.get("target"))

        if (!target) return;        // If target entries zero nothing will happen
        setTargetScore(target)
        e.target.reset();           // Clears the Input
    }
    
  return (
    <>
        <h2>Winner's List</h2>
        {/* {player.map((p)=>{
            return <li>{(p.score===targetScore) && <p>{p.name}</p>}</li>            
        })} */}
        <form action="" onSubmit={onSubmission}>
            <label htmlFor="target">Target Score : </label>
            <input type="number" id='target' name='target'/>
            <button>Submit</button>
        </form>
        <p>Target Score : {targetScore}</p>
        <ul>
            {player
            .filter((p)=>p.score>=targetScore)
            .map((p)=>(
                <li key={p.playerID}>{p.name}</li>
            ))}
        </ul>
    </>
  )
}
