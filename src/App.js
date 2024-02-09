// 240209 제작 시작
// 240209 해결해야하는 것
// 1. state 값이 바로 바뀌지 않음.
// 2. 오른쪽 box의 오른쪽 경계선을 없애야 함.
// 3. 처음 시작 시, User와 Computer 이름만 중간에 뜨도록
// 4. 가위바위보 사진을 버튼 사진과 같도록

import './App.css';
import Box from './components/Box';
import RockImg from './images/Rock.png'
import ScissorImg from './images/Scissor.png'
import PaperImg from './images/Paper.png'
import { useState } from 'react';

// 가위바위보게임 만들기 [내가 쓴 것] (*는 코알누 보충)
// 1. 내가 낸 것과 컴퓨터가 낸 것을 알려주는 박스 만들기 *(누구인지(타이틀), 사진, 결과)
// 2. * 가위, 바위, 보 버튼이 있다.
// 3. 내가 가위, 바위, 보 중 하나의 아이콘을 누르면 그 결과를 보여줌.
// 4. 컴퓨터는 가위, 바위, 보 중 랜덤으로 낸다.
// 5. * 3, 4의 결과를 가지고 누가 이겼는지 승패 따짐
// 6. 승패 결과무에 따른 색깔 변화 ~ 이김: 초록, 비김: 검정, 짐: 빨강

const option = {
  rock:{
    name: "Rock",
    img: "https://image.auction.co.kr/itemimage/28/65/8e/28658ea5e6.jpg"
  },
  scissor:{
    name: "Scissor",
    img: "data:image/png;base64,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"
  },
  paper:{
    name: "Paper",
    img: "https://previews.123rf.com/images/serezniy/serezniy1401/serezniy140103266/25389789-%ED%9D%B0%EC%83%89%EC%97%90-%EA%B3%A0%EB%A6%BD-%EB%90%9C-%EC%9E%AC%ED%99%9C%EC%9A%A9-%EC%A2%85%EC%9D%B4%EC%9D%98-%EC%8A%A4%ED%83%9D.jpg"
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
      if (result == "WIN") setUserWin(userWin => userWin+1);
      else if (result == "LOSE") setComWin(comWin => comWin+1);
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
