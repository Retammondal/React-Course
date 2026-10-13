
import React, { useState } from 'react'
import Counter from "./components/Counter.jsx"
import Todo from './components/Todo.jsx';

export default function App() {
  // Defining the lifted state in the Parent
  const [count, setCount] = useState(0);  


  return (
    <div>
      <Counter/>
      <Counter/>
      {/* We know very well both counter will act separately */}
      <Counter count = {count} setCount={setCount}/>
      <div>Count How Much ? {count}</div>
      <br /><br />

      <Todo/>
    </div>
  )
}



