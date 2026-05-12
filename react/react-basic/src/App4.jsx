import { useState } from 'react' //사용하지 않앗음. Hook이라고함
import './App.css' //사용하지 않앗음. css 파일 불러옴
import Welcome from "./components/Welcome.jsx";
/*
  문제 : 안녕하세요 홍길동 입니다. 문장을 화면에 출력하기
    - Welcome.jsx로 컴포넌트로 만들기  
    - 바탕색 검정색 / 흰글씨
    - 홍길동 이라고 하는 이름은 변수로 처리
*/

function App() {
  return (
    <div>
      <Welcome />
    </div>
  )
}
export default App
