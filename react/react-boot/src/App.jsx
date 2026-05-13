import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {useCookies} from 'react-cookie'
import Head from './components/Head.jsx'
import BoardList from './components/board/BoardList.jsx'
import BoardForm from './components/board/BoardForm.jsx'
import BoardInfo from './components/board/BoardInfo.jsx'
import BoardUpdate from './components/board/BoardUpdate.jsx'

function App() {
    const [cookies] = useCookies(['id']) // id 이름의 쿠키정보
    return (
        <BrowserRouter>
            <Head cook={cookies.id}/> {/* 쿠키 중 id이름의 쿠키값 Head 컨테이너에 전달 */}
            <Routes>
                <Route path='/' />
                <Route path='/board/boardList/:boardId' element={<BoardList/>}/>
                <Route path='/board/boardForm/:boardId' element={<BoardForm/>}/>
                <Route path='/board/boardInfo/:bNum' element={<BoardInfo/>}/>
                <Route path='/board/boardUpdateForm/:bNum' element={<BoardUpdate/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
