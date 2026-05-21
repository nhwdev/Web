import {BrowserRouter, Routes, Route, Outlet} from 'react-router-dom'
import {useCookies} from 'react-cookie'
import Head from './components/Head.jsx'
import BoardList from './components/board/BoardList.jsx'
import BoardForm from './components/board/BoardForm.jsx'
import BoardInfo from './components/board/BoardInfo.jsx'
import BoardUpdate from './components/board/BoardUpdate.jsx'
import BoardDelete from './components/board/BoardDelete.jsx'
import MemberJoin from './components/member/MemberJoin.jsx'
import MemberLogin from './components/member/MemberLogin.jsx'
import MemberMyPage from "./components/member/MemberMyPage.jsx";
import MemberUpdate from "./components/member/MemberUpdate.jsx";

function App() {
    const [cookies] = useCookies(['id']) // id 이름의 쿠키정보
    return (
        <BrowserRouter>
            <Routes>
                <Route element={
                    <>
                        <Head cook={cookies.id}/> {/* 상단 바 고정 */}
                        <Outlet/>                 {/* 아래 자식 Route들이 교체될 자리 */}
                    </>
                }>
                    <Route path='/'/>
                    <Route path='/board/boardList/:boardId' element={<BoardList/>}/>
                    <Route path='/board/boardForm/:boardId' element={<BoardForm/>}/>
                    <Route path='/board/boardInfo/:bNum' element={<BoardInfo/>}/>
                    <Route path='/board/boardUpdate/:bNum' element={<BoardUpdate/>}/>
                    <Route path='/board/boardDelete/:bNum' element={<BoardDelete/>}/>
                    <Route path='/member/join' element={<MemberJoin/>}/>
                    <Route path='/member/login' element={<MemberLogin/>}/>
                    <Route path='/member/mypage' element={<MemberMyPage/>}/>
                    <Route path='/member/update' element={<MemberUpdate/>}/>
                </Route>
            {/* Head가 필요 없는 단독 페이지 */}
            </Routes>
        </BrowserRouter>
    )
}

export default App
