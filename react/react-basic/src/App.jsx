import { useState } from 'react' // 사용하지 않음. Hook이라고 함
import './App.css' // 사용하지 않음. css 파일 불러옴
/*
 * 이벤트 처리
 */
function App() {
  const handleClick = () => {
    console.log("안녕하세요");
  }
  const handleClick2 = () => {
    document.querySelector("#msg").innerHTML = "반갑습니다";
  }
  const handleChange = (e) => {
    console.log(e.target.value); // 입력내용을 console에 출력
  }
  const handleChange2 = (e) => {
    document.querySelector("#msg2").innerHTML = e.target.value;
  }
  const greet = (name) => {
    document.querySelector('#msg3').innerText = `안녕하세요 ${name} 입니다!`;
  }
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <button onClick={handleClick}>1. 인사하기</button><br />
      <button onClick={() => console.log("두번째 인사")}>2. 인사하기</button><br />
      <input type="text" onChange={handleChange} /><br />
      <button onClick={handleClick2}>3. 인사하기</button> {/* 3. 인사하기를 클릭하면 msg 영역에 "반갑습니다" 출력하기 */}
      <div id='msg'></div><br />
      {/* 아래의 input 태그에 글자를 입력하면 내용이 msg2 영역에 값이 출력되도록 구현하기 */}
      <input type="text" onChange={handleChange2} />
      <div id='msg2'></div><br />
      {/* onClick={greet('웅이')} : 앱이 실행되는 순간(렌더링 순간) greet 함수 호출. '웅이' 값이 전달 안됨
        * onClick{() => greet('웅이')} : 클릭이 되면 greet 함수 호출. 매개변수 전달
        */}
      <button onClick={()=> greet('웅이')}>웅이 인사시키기</button>
      <button onClick={()=> greet('림이')}>림이 인사시키기</button>
      <div id='msg3'></div>
    </div>
  )
}
export default App