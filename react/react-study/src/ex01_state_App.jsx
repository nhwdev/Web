import './App.css'
import Hello from './components/ex01_Hello.jsx'
import Header from './components/ex02_map_Header.jsx'
/*
 * useState : 변경되는 데이터의 상태 관리해주는 Hook
 *  - 자바스크립트는 변수의 값이 변경되는 경우 화명이 자동으로 변경❌
 *  - useState를 이용하여 만든 변수는 React가 감지하여 화면에 출력함 (Rendering)
 *  - [변수명(상태값), 상태값변경함수] = useState(상태의초기값)
 */
function App() {
  return (
    <div className='App'>
      <Hello age='10'/> {/* age 속성의 값의 자료형: 문자열 */}
      <Hello age={15}/> {/* age 속성의 값의 자료형: 숫자 */}
      <Hello age={20}/> {/* age 속성의 값의 자료형: 숫자 */}
    </div>
  )
}

export default App
