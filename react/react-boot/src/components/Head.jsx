import { Link } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { useState } from 'react';

function Head(props) {
    const [, , removeCookie] = useCookies();
    const [isOpen, setIsOpen] = useState(false);

    const logout = () => {
        removeCookie("id", { path: '/' })
        window.location.href = "/member/login";
    }
    return (
        <nav className="navbar navbar-expand-sm navbar-light bg-white px-4" style={{borderBottom: "1px solid #e9ecef"}}>
            <Link className="navbar-brand font-weight-bold" style={{letterSpacing: "-0.3px"}} to="/">ReactApp</Link>

            <button className="navbar-toggler border-0" type="button" onClick={() => setIsOpen(!isOpen)}>
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className={`navbar-collapse ${isOpen ? 'show' : 'collapse'}`}>
                {/* 가운데 메뉴 */}
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item"><Link className="nav-link text-secondary" style={{fontSize:"14px"}} to="/board/boardList/1" onClick={() => setIsOpen(false)}>공지사항</Link></li>
                    <li className="nav-item"><Link className="nav-link text-secondary" style={{fontSize:"14px"}} to="/board/boardList/2" onClick={() => setIsOpen(false)}>자유게시판</Link></li>
                    <li className="nav-item"><Link className="nav-link text-secondary" style={{fontSize:"14px"}} to="/board/boardList/3" onClick={() => setIsOpen(false)}>QNA</Link></li>
                </ul>

                {/* 오른쪽 메뉴 */}
                <ul className="navbar-nav ml-auto align-items-center">
                    {!props.cook && <>
                        <li className="nav-item">
                            <Link className="nav-link text-secondary" style={{fontSize:"14px"}} to="/member/join" onClick={() => setIsOpen(false)}>회원가입</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="btn btn-dark btn-sm px-3" style={{fontSize:"13px"}} to="/member/login" onClick={() => setIsOpen(false)}>로그인</Link>
                        </li>
                    </>}
                    {props.cook &&
                        <li className="nav-item">
                            <button className="btn btn-outline-dark btn-sm px-3" style={{fontSize:"13px"}} onClick={logout}>로그아웃</button>
                        </li>
                    }
                </ul>
            </div>
        </nav>
    )
}
export default Head;