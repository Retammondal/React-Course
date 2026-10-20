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


import { useState } from 'react'
import './App.css'
import PlayerEntry from './Component/PlayerEntry'
import ScoreUpdate from './Component/ScoreUpdate';
import WinnerList from './Component/WinnerList';

const initialPlayersList = [
  { "name": "Anya", "playerID": 102, "score": 4 },
  { "name": "Liam", "playerID": 103, "score": 3 },
  { "name": "Chloe", "playerID": 104, "score": 5 },
  { "name": "Mateo", "playerID": 105, "score": 2 },
  { "name": "Elena", "playerID": 106, "score": 4 }
]

const initialTargetScore = 10;

function App() {
  const [player,setPlayer] = useState(initialPlayersList);  // Lifting State Up
  const [targetScore, setTargetScore] = useState(initialTargetScore)

  return(
    <>
      <PlayerEntry player={player} setPlayer={setPlayer}/>
      {/* Parent can now use the same data */}
    
      <ScoreUpdate player={player} setPlayer={setPlayer} targetScore={targetScore}/>
      <WinnerList targetScore={targetScore} setTargetScore={setTargetScore} player={player}/>
      
    </>
  )
}
export default App

