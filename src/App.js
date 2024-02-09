// 240209 제작 시작
// 240209 해결해야하는 것
// 1. state 값이 바로 바뀌지 않음.
// 2. 오른쪽 box의 오른쪽 경계선을 없애야 함.
// 3. 처음 시작 시, User와 Computer 이름만 중간에 뜨도록

//[추가로 하면 좋은 것]
// 1. 반응형 웹 만들기
// 2. 게임 시작 전, 랜딩페이지 (게임시작페이지 만들기)

import './App.css';
import Box from './components/Box';
import RockImg from './images/Rock.png'
import ScissorImg from './images/Scissor.png'
import PaperImg from './images/Paper.png'
import { useEffect, useState } from 'react';

// 가위바위보게임 만들기 [내가 쓴 것] (*는 코알누 보충)
// 1. 내가 낸 것과 컴퓨터가 낸 것을 알려주는 박스 만들기 *(누구인지(타이틀), 사진, 결과)
// 2. * 가위, 바위, 보 버튼이 있다.
// 3. 내가 가위, 바위, 보 중 하나의 아이콘을 누르면 그 결과를 보여줌.
// 4. 컴퓨터는 가위, 바위, 보 중 랜덤으로 낸다.
// 5. * 3, 4의 결과를 가지고 누가 이겼는지 승패 따짐
// 6. 승패 결과무에 따른 색깔 변화 ~ 이김: 초록, 비김: 검정, 짐: 빨강

// 선택할 수 있는 옵션을 객체로 만들어줌. (img 문제 해결 > src 폴더에서 import한 이미지 이름을 넣어줌.)
const option = {
  rock:{
    name: "Rock",
    img: RockImg
  },
  scissor:{
    name: "Scissor",
    img: ScissorImg
  },
  paper:{
    name: "Paper",
    img: PaperImg
  }
}

function App() {

  const [userSelect, setUserSelect] = useState(null);
  const [comSelect, setComSelect] = useState(null);
  const [result, setResult] = useState("");
  const [userWin, setUserWin] = useState(0);
  const [comWin, setComWin] = useState(0);
  
  const play = (userChoice) => {
    setUserSelect(option[userChoice])

    let comChoice = randomChoice();
    setComSelect(option[comChoice])

    setResult(showResult(option[userChoice], option[comChoice]));
    counter(result);
  }

  // 점수 reset
  const resetScore = () => {
    setUserWin(0);
    setComWin(0);
  }

  // 승패 점수 보여주기 (240209 현재 state 값이 바로 반영되지 않는 이슈)
  const counter = (result) => {
      if (result == "WIN") setUserWin(userWin+1);
      else if (result == "LOSE") setComWin(comWin+1);
  }

  // 승패 보여주기 (User 입장)
  const showResult = (user, com) => {
    if (user.name === com.name) return "TIE"
    else if (user.name == "Rock") return com.name == "Scissor" ? "WIN" : "LOSE";
    else if (user.name == "Scissor") return com.name == "Paper" ? "WIN" : "LOSE";
    else if (user.name == "Paper") return com.name == "Rock" ? "WIN" : "LOSE";
  }

  // 컴퓨터 랜덤 값
  const randomChoice = () =>{
    let optionArr = Object.keys(option);
    let element = Math.floor(Math.random() * optionArr.length);
    return optionArr[element]
  }

  return (
    <div className='wrap'>
      <div className='counter'>
        <div>{userWin}</div>
        <div>:</div>
        <div>{comWin}</div>
        <button className="reset-btn" onClick={resetScore}>reset</button>
      </div>
      <div className='area'>
        <Box title="User" item={userSelect} result={result}/>
        <Box title="Computer" item={comSelect} result={result}/>
      </div>
      <div className='area btn-area'>
        <button className="scissor btn" onClick={() => play("scissor")}>
          <img className="btn-img" src={ScissorImg}/>
          </button>
        <button className="rock btn" onClick={() => play("rock")}>
          <img className="btn-img" src={RockImg}/>
        </button>
        <button className="paper btn" onClick={() => play("paper")}>
          <img className="btn-img" src={PaperImg}/>
        </button>
      </div>
    </div>
  );
}

export default App;
