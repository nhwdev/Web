import { Link } from "react-router-dom";
import { useCookies } from 'react-cookie';

function Head(props) {
    const [, , removeCookie] = useCookies();
    const logout = () => {
        removeCookie("id", { path: '/' })
        window.location.href = "/member/login";
    }
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark px-3">
            <Link className="navbar-brand font-weight-bold" to="/">MyApp</Link>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item"><Link className="nav-link" to="/board/boardList/1">공지사항</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/board/boardList/2">자유게시판</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/board/boardList/3">QNA</Link></li>
                </ul>
                <ul className="navbar-nav ml-auto">
                    {props.cook == null && <>
                        <li className="nav-item">
                            <Link className="btn btn-outline-light btn-sm px-3 mr-1" to="/member/join">회원가입</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="btn btn-light btn-sm px-3 text-dark" to="/member/login">로그인</Link>
                        </li>
                    </>}
                    {props.cook != null &&
                        <li className="nav-item">
                            <button className="btn btn-outline-light btn-sm px-3" onClick={logout}>로그아웃</button>
                        </li>
                    }
                </ul>
            </div>
        </nav>
    )
}
export default Head;