import { useState } from "react"; 

export default function EnterNum(){
  const [people, setPeople] = useState("");
  return(
    <div>
      <h2 className="info-question">How many friends are you spliting with:</h2>
      <input 
        className="info-input"
        value={people} 
        onChange={e => setPeople(e.target.value)}
       />
    </div>
  )
}