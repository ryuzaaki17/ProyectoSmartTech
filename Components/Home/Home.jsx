import React from 'react'
import AdvSearch from '../AdvSearch/AdvSearch.jsx'
import {useState} from "react"
import Search from '../Search/Search.jsx'

const Home = ({buscarTermino}) => {
  const[buscarTerminoLocal, setBuscarTerminoLocal] = useState("");

  const handleBuscar = (termino) => {
    setBuscarTerminoLocal(termino)
  }

  return (
    <>
    <Search onSearch = {handleBuscar}/>
    <AdvSearch buscarTermino = {buscarTerminoLocal || buscarTermino}/>
    </>
  )
}

export default Home

