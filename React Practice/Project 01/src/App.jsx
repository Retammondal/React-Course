/**
 * ==========================================
 * PROJECT: MULTI-PLAYER GAME SCOREKEEPER
 * ==========================================
 * 
 * PROJECT DESCRIPTION:
 * Build an interactive, multi-player scoreboard dashboard. The application 
 * must track the individual scores of several players simultaneously, allowing 
 * users to independently modify each player's score while strictly adhering 
 * to immutable state management principles.
 * 
 * SPECIFICATIONS & REQUIREMENTS:
 * 1. Scoreboard Initialization: Set up a tracking system for multiple players, 
 *    where each player has a name, a unique identifier, and a starting score.
 *    Establish a predefined "Target Score" for winning the game (e.g., Target: 3).
 *    player = {name: "Retam", id: 101, score: 1}
 * 
 * 2. Score Controls: Implement independent control mechanisms (buttons) to 
 *    increase, decrease, and completely reset the score for any specific player. 
 * 
 * 3. Strict Immutability: When updating a player's score, calculate the new 
 *    score securely based on their previous score without directly mutating 
 *    the underlying data structures (no direct mutation like count++).
 * 
 * 4. Dynamic UI Generation: Render a dedicated interface (a card or row) for 
 *    each player that displays their current standing alongside their specific 
 *    control buttons.
 * 
 * 5. Event Binding: Ensure that interacting with a specific player's control 
 *    button triggers an update only for that exact player's data.
 * 
 * 6. Victory Condition: Evaluate scores during each update. Conditionally 
 *    render a prominent "Winner!" banner or badge exclusively on the profile 
 *    of any player who reaches or exceeds the target score.
 * 
/*
1. Scoreboard Component Creation
2. useState -- player,setPlayer -- [{player1}, {player2},...]
3. targetScore = 10
4. function incrementScore(players id) --> setPlayers()
*/
// ---------------------------------------------------------------------------------------------------------------------------------------------------
// NOTE : What i have done till Now?
// 1. Players Name, id, initial score entry --> creating a useState --> Players Array --> By mapping through it i am showcasing all the Players details
// Next work will be make it cleaner and take it to Component and then process to rest work as given in project
// ---------------------------------------------------------------------------------------------------------------------------------------------------

import { useState } from 'react'
import './App.css'


function App() {
  return(
    <>
    </>
  )
}
export default App

function Scoreboard(){
  const [player,setPlayer] = useState([])

  function onSubmit(e){
    e.preventDefault();
    const formData = new FormData(e.target);
    const {score, name, id} = Object.fromEntries(formData);
    // Guard clause: Avoid adding empty entries if fields are left blank
    if (!name || !score || !id) return;

    const idDatas = player.reduce((acc,value)=>{
      acc.push(value.playerID)
      return acc;
    },[])
    if (idDatas.includes(id)){
      console.log("Already Player Exist");
      return;
    }

    // setPlayer((prev)=>(prev.push({name: name, score: score})));
    // NOTE: push will not work here, it returns a number(length) not array
    setPlayer((prev)=>[
      ...prev,
      {playerID: id,name:name, score:score}
    ])
    console.log(player);
  }
  function handleInput(e){

  }

  return (
    <>
      <h2>Player's Entry</h2>
      <form action="" onSubmit={onSubmit}>
        <label htmlFor="name">Player's Name : </label>
        <input type="text" name='name' id='name' onInput={handleInput} /> 
        &nbsp;
        <label htmlFor="score">Initial Score : </label>
        <input type="number" name='score' id='score' onInput={handleInput}/>
        <br />
        &nbsp;
        <label htmlFor="id">Player's ID : </label>
        <input type="number" name='id' id='id' onInput={handleInput}/>
        <br />
        <button style={{backgroundColor:'black'}}>Submit</button>
      </form>

      <br />
      <h2>Players' Details</h2>
      {player.map(value=>{
        return <p key={value.playerID}>Name : {value.name}, Score : {value.score}, Player's ID : {value.playerID}</p>
      })}
    </>
  )
}
export {Scoreboard}