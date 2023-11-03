import { useState } from "react"

export default function EnterNames(){
  const [names, setNames] = useState("");

  return(
    <div>
      <h1 className="info-question">Who's Splitting the Bill?
      </h1>
      <h2 className="info-question">Enter names:
      </h2>
      <textarea 
        id="name-input"
        value={names} 
        onChange={e => setNames(e.target.value)}
       />
    </div>
  )
}