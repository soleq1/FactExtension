import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [facts,setFacts] = useState([])
  const [settings,SetSettings] = useState(false)
  const [storage,setStorage] = useState([])
 //Grabs Chrome Local Storage and puts it in State //
  useEffect(() =>{
    chrome.storage.local.get(["Fact"]).then((result) => {
      if (result.Fact){
        setStorage(result.Fact)

      }
    });
    fetchFact()
  },[])
  const fetchFact = async  () =>{
    try{
  //Go to https://api-ninjas.com/profile and put your api-key in the place of the one already there //
      const data = await fetch("https://api.api-ninjas.com/v1/facts?limit=1",{
        headers: { 'X-Api-Key': 'sNG+SqlGGc+0YJOytgvjBA==XoXtHX7c5FZSA6Fk'},
        contentType: 'application/json',
      })
      const response = await data.json()
      setFacts(response[0])
      // console.log(response)
    }catch(error){
      console.log(error)
    }

  }
  //Toggle Button //
const handleSettings = () =>{
  if (settings === true){
    SetSettings(false)
  }else{
    SetSettings(true)
  }
}
useEffect(() =>{
  console.log(settings)
},[settings])

const addFavorite = () =>{
  setStorage((prevItem) => [...prevItem,facts])
  console.log('clicked')

}
useEffect(() =>{
    chrome.storage.local.set({ Fact: storage}).then(() => {
  console.log("Value is set");
});  
},[storage])
const removeFavorite = (index) =>{
  
  const updatedStorage = [...storage]
  
  updatedStorage.splice(index,1)
  chrome.storage.local.set({Fact:updatedStorage},() =>{
    console.log('removed')
  })
  setStorage(updatedStorage)
}
  return (
    <div className='Container'>
    <div className='Fact-Container'>

      <div>Quick Facts <button onClick={handleSettings} className='Button'><svg  xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-stars" viewBox="0 0 16 16">
  <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828l.645-1.937zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.734 1.734 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.734 1.734 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.734 1.734 0 0 0 3.407 2.31l.387-1.162zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L10.863.1z"/>
</svg></button></div>
{!settings ? (
  <div>

    <div>{facts.fact}</div>  
    <div>
    <button className='Button' onClick={() => fetchFact()}>New</button>
    <button onClick={addFavorite} className='Button'><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-star-half" viewBox="0 0 16 16"><path d="M5.354 5.119 7.538.792A.516.516 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0 1 16 6.32a.548.548 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.52.52 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.58.58 0 0 1 .085-.302.513.513 0 0 1 .37-.245l4.898-.696zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.565.565 0 0 1 .162-.505l2.907-2.77-4.052-.576a.525.525 0 0 1-.393-.288L8.001 2.223 8 2.226v9.8z"/></svg></button>
    </div>
  </div>
) : (
  <div>
    <div>{storage && storage.length > 0 ? <div>{storage.map((item,index) =>{
      return(
        <div key={index} className='stored-Container'>
          <div >{item.fact}</div>
          <div onClick={() =>removeFavorite(index)} className='delete-Button'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
</svg></div>
        </div>
      )
    })}</div>:<div>See Favorites Here</div>}</div>
  </div>
)}
    </div>
    </div>
  )
}

export default App
