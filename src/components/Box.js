import React from 'react'
import '../css/Box.css'

const Box = (props) => {

  // 컴퓨터 승패 알려주기
  let result;
  if (props.title === "Computer" && props.result !="TIE" && props.result != "") {
    result = (props.result === "WIN" ? "LOSE" : "WIN")
  } else {
    result = props.result
  }

  return (
    <div className= "box">
        <h2>{props.title}</h2>
        <img className="img-size" src={props.item && props.item.img}/>
        <h3 className={`${result}`}>{result}</h3>
    </div>
  )
}

export default Box