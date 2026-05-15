import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {useCookies} from 'react-cookie'
import Head from './components/Head.jsx'
import BoardList from './components/board/BoardList.jsx'
import BoardForm from './components/board/BoardForm.jsx'
import BoardInfo from './components/board/BoardInfo.jsx'
import BoardUpdate from './components/board/BoardUpdate.jsx'
import BoardDelete from './components/board/BoardDelete.jsx'
import MemberJoin from './components/member/MemberJoin.jsx'
import MemberLogin from './components/member/MemberLogin.jsx'
// import BoardUpdateForm from './components/board/BoardUpdateForm.jsx'

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
                {/*<Route path='/board/boardUpdateForm/:bNum' element={<BoardUpdateForm/>}/>*/}
                <Route path='/board/boardUpdate/:bNum' element={<BoardUpdate/>}/>
                <Route path='/board/boardDelete/:bNum' element={<BoardDelete/>}/>
                <Route path='/member/join' element={<MemberJoin/>}/>
                <Route path='/member/login' element={<MemberLogin/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
