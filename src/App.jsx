import { useState, useEffect } from 'react'
import s from './App.module.css'
import { api } from './api/api'
import { Card } from './components/card'
import Tilt from 'react-parallax-tilt'
import {InfoModal} from './components/infoModal'

function App() {
  const [data, setData] = useState([])
  const [searchName, setSearchName] = useState("")
  const [searchPage, setSearchPage] = useState("")
  const [searchStatus, setSearchStatus] = useState("")
  const [modal, setModal] = useState();

  useEffect(() => {
    api.get(`/character/?name=${searchName}&page=${searchPage}&status=${searchStatus}`).then((response) => {
      setData(response.data.results)
    }).catch((error) => {
      console.error("NÃO FOI POSSÍVEL ACESSAR API", error)
    })
  }, [searchPage, searchName, searchStatus])

  return (
    <>
   {modal !== undefined && (
  <InfoModal
    data={data[modal]}
    close={() => setModal(undefined)}
    onNext={() => modal < data.length - 1 && setModal(modal + 1)}
    onPrev={() => modal > 0 && setModal(modal - 1)}
    hasNext={modal < data.length - 1}
    hasPrev={modal > 0}
  />)}
      <h1 className={s.title}>Rick and Morty Characters</h1>
      <main>
        <div style={{display: "flex", gap: "10px", alignItems: "center", justifyContent: "center"}}>
        <input type="text" value={searchPage} onChange={(e) => setSearchPage(e.target.value)} placeholder='1/42'/>
        <input type="text" value={searchName} onChange={(e) => setSearchName(e.target.value)} place='Procure um personagem'/>
        </div>

              <div className={s.radioGroup}>
                <label>
                  <input
                    type="radio"
                    value=""
                    checked={searchStatus === ""}
                    onChange={(e) => setSearchStatus(e.target.value)}
                    />
                  All
                </label>

                <label>
                  <input
                    type="radio"
                    value="Alive"
                    checked={searchStatus === "Alive"}
                    onChange={(e) => setSearchStatus(e.target.value)}
                    />
                  Alive
                </label>

                <label>
                  <input
                    type="radio"
                    value="Dead"
                    checked={searchStatus === "Dead"}
                    onChange={(e) => setSearchStatus(e.target.value)}
                  />
                  Dead
                </label>

                <label>
                  <input
                    type="radio"
                    value="Unknown"
                    checked={searchStatus === "Unknown"}
                    onChange={(e) => setSearchStatus(e.target.value)}
                    />
                  Unknown
                </label>
              </div>

        <div className={s.wrapCards}>
          {data.map((item, index) => {
            return(
                <div key={index} style={{display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center"}}>
                  <Tilt tilt tiltReverse={false} key={index}>
                    <Card image={item.image} name={item.name} species={item.species}/>
                  </Tilt>
                  <button onClick={() => setModal(index)} className={s.infoBtn}>Info {item.name}</button>
                </div>
            )
          })}

        </div>

      </main>
    </>
  )
}

export default App
