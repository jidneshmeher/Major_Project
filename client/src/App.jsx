import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const hi = function () {
    return <h1>Hiiiiii</h1>
  }

  return (
    <>
      <h1>Hello World</h1>
      <h1>Hello World by Jidnesh</h1>
      {hi()}
    </>
  )
}

export default App
