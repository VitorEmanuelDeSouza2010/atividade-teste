import { useState, useEffect } from 'react'
import s from './App.module.css'
import { api } from './api/api'

function App() {
  const [data, setData] = useState([])

  useEffect(() => {
    api.get(`/character`).then((response) => {
      setData(response.data.results)
      console.log(response.data.results)
    }).catch((error) => {
      console.log("NÃO FOI POSSÍVEL ACESSAR API", error)
    })
  }, [])

  return (
    <>
      <h1 classname={s.title}>Rick and Morty Characters</h1>
      <main>
        <input type="text" value={''} onChange={''} placeholder='1/42'/>
        <input type="text" value={''} onChange={''} place='Procure um personagem'/>
      </main>
    </>
  )
}

export default App
