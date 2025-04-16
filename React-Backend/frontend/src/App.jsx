import { useState } from 'react'

import './App.css'
import Login from './components/Login';

function App() {
  const [count, setCount] = useState(0)
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");


  return (
    <>
     <div>
      <h1>Hey React</h1>
      <button>Chai</button>
     </div>
    </>
  )
}

export default App
