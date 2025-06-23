import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import Home from '/Components/Home/Home.jsx';
import Navbar from "../Components/Navbar/Navbar.jsx"
import {useState} from "react"
import Search from "../Components/Search/Search.jsx"

function App() {
  const[buscarTermino, setBuscarTermino] = useState("");
  const handleBuscar = (termino) => {
    setBuscarTermino(termino.toLoweCase())
  }
  return (
    <>
      
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element = { <Home buscarTermino = {buscarTermino}/>}/>
          <Route path='/search' element = { <Search onSearch = {handleBuscar}/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
