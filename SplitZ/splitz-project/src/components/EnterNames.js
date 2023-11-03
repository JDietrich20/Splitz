import { useState } from "react"

export default function EnterNames(){
  const [names, setNames] = useState("");

  return(
    <div>
      <h2 className="info-question">Enter their names:</h2>
      <textarea 
        className="info-input"
        cols = '16'
        value={names} 
        onChange={e => setNames(e.target.value)}
       />
    </div>
  )
}