import { useState } from 'react'

function PlayerEntry({player,setPlayer}){
  // const [player,setPlayer] = useState([...initialPlayersList])       // Using it from Lifitng state up
  const [isDuplicate, setIsDuplicate] = useState(false)

  function onSubmit(e){
    e.preventDefault();
    const formData = new FormData(e.target);
    const {score, name, id} = Object.fromEntries(formData);

  
    if (!name || !score || !id) return;           // Guard clause: Avoid adding empty entries if fields are left blank

    const idDatas = player.reduce((acc,value)=>{
      acc.push(Number(value.playerID))
      return acc;
    },[])
    if (idDatas.includes(Number(id))){
      setIsDuplicate(true);
      return;
    }

    setPlayer((prev)=>[
      ...prev,
      {playerID: Number(id),name:name, score:Number(score)}
    ])
    setIsDuplicate(false)
  }

  return (
    <>
      <h2>Player's Entry</h2>
      <form action="" onSubmit={onSubmit}>
        <label htmlFor="name">Player's Name : </label>
        <input type="text" name='name' id='name'/> 
        <br />

        <label htmlFor="score">Initial Score : </label>
        <input type="number" name='score' id='score'/>
        <br />

        <label htmlFor="id">Player's ID : </label>
        <input type="number" name='id' id='id'/>
        <br />

        <button>Submit</button>
      </form>

      {isDuplicate && <p><i>⚠️ Error : Already Player Exist...</i></p>}
      <br />

      <h2>Players' Details</h2>
      {player.map(value=>{
        return <p key={value.playerID}>Name : {value.name}, Score : {value.score}, Player's ID : {value.playerID}</p>
      })}
      <p style={{borderBottom:"white 1px solid"}}>Thank You...</p>
    </>
  )
}
export default PlayerEntry;