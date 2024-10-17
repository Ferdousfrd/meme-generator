import Header from "./components/Herader"
import Meme from "./components/Meme"
import About from "./components/About"
import { useState } from "react"
import "./style.css"

function App() {

  const [showAbout, setShowAbout] = useState(false)       // state to track our display page

  function toggleAbout(){                                 // to change between main contetn and about display logic
    setShowAbout(prevState => !prevState)
  }

  return (
    <>
      <Header handleClick={toggleAbout}/>                 
      {showAbout === false?                               // checking which display to show
        <Meme /> : <About />
      }     
    </>
  )
}

export default App
