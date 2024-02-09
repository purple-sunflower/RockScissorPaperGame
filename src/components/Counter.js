import React, { useState } from 'react'
import '../css/Counter.css'

const Counter = (props) => {
  
    const [userWin, setUserWin] = useState(0);
    const [comWin, setComWin] = useState(0);

    if (props.title === "I" && props.result != "TIE" && props.result != "") {
        if (props.result == "WIN") setUserWin(userWin+1);
        else setComWin(comWin+1);
    }
  
   return (
    <div>{userWin} : {comWin}</div>
  )
}

export default Counter