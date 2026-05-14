import {useState, useEffect} from "react";
import {useParams, useLocation, Link} from "react-router-dom";
import dayjs from 'dayjs' // npm install dayjs. 날짜 형식 처리 기능
/*
 * Hook
 *  - useState: 상태값 변경
 *  - useEffect: 화면 렌더링 이후 비동기적으로 실행 해야하는 부수적인 효과
 *  - useParams: url에서 전달되는 파라미터 값
 *  - useLocation: url 정보
 */
const BoardList = () => {
    const [bList, setBList] = useState([]); // 게시물 목록
    const [boardCount, setBoardCount] = useState(0); // 게시물 등록 건수
    const [start, setStart] = useState(0); // 페이지 시작 번호
    const [end, setEnd] = useState(0); // 페이지 종료 번호
    const [pageInt, setPageInt] = useState(0); // 현재 페이지
    const [bottomLine, setBottomLine] = useState(0); // 화면에 보여질 페이지번호의 갯수
    const [maxPage, setMaxPage] = useState(0); // 최대 페이지
    const [boardName, setBoardName] = useState(""); // 게시판 종류
    const {boardId} = useParams(); // :boardid에 해당하는 값
    const location = useLocation(); // http://localhost:5173/board/BoardList/1
    // http://localhost:5173/board/BoardList/1?page=1 location.search: page=1
    let queryString = location.search; // http://localhost:5173/board/BoardList/1
    /*
     * 화면이 처음 렌더링 되면 getBoardList 함수 실행, 처음 1회 실행
     * [data]: dat값이 변경될 때 마다 실행
     * 배열값이 없는 경우: 렌더링 마다 실행
     */
    useEffect(() => {
        getBoardList();
    }, [boardId, queryString])

    const getBoardList = () => {
        // 1. 항상 boardId를 먼저 기본으로 잡습니다.
        let targetUrl = `?boardId=${boardId}`;

        // 2. 만약 queryString(?page=...)이 있다면 뒤에 이어 붙입니다.
        if (queryString.length > 0) {
            // queryString은 "?page=2" 형태이므로 앞의 '?'를 '&'로 바꿔서 붙여야 주소가 안 깨집니다.
            targetUrl += queryString.replace('?', '&');
        }

        fetch("http://localhost:8080/board/boardList" + targetUrl) // ajax으로 백엔드 서버와 통신. Spring Boot 서버에서 데이터 수신
            .then((resp) => resp.json())
            .then((json) => {
                setBList(json.bList); // bList 변경
                setBoardCount(json.listCount); // boardCount 변경
                setStart(json.start);
                setEnd(json.end);
                setPageInt(json.pageInt);
                setBottomLine(json.bottomLine)
                setMaxPage(json.maxPage)
                setBoardName(json.boardName)
            })
    }

    function getPage(start, end) {
        let arr = [];
        for (let i = start; i <= end; i++) {
            arr.push(i);
        }
        return arr;
    }

    return (
        <div className="container mt-4">
            <div className="card shadow-sm">
                <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">{boardName} <span className="badge badge-light">{boardCount}</span></h5>
                    <a href={`/board/boardForm/${boardId}`} className="btn btn-sm btn-outline-light">+ 게시판 등록</a>
                </div>
                <div className="card-body p-0">
                    <table className="table table-hover mb-0">
                        <thead className="thead-light">
                        <tr>
                            <th>번호</th>
                            <th>작성자</th>
                            <th>제목</th>
                            <th>날짜</th>
                            <th>조회수</th>
                            <th>파일</th>
                        </tr>
                        </thead>
                        <tbody>
                        {Array.isArray(bList) && bList.length > 0 ? (
                            bList.map((b, index) => (
                                <tr key={index}>
                                    <td>{boardCount - (pageInt - 1) * bottomLine - index}</td>
                                    <td>{b.name}</td>
                                    <td><a href={"/board/boardInfo/" + b.num} className="text-dark font-weight-bold">{b.subject}</a></td>
                                    <td>{dayjs(b.regdate).format("YYYY-MM-DD")}</td>
                                    <td>{b.readcnt}</td>
                                    <td>
                                        {b.file1
                                            ? <span className="badge badge-info">파일</span>
                                            : <span className="badge badge-secondary">없음</span>
                                        }
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center py-4 text-muted">게시물이 없습니다.</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
                <div className="card-footer bg-white">
                    <ul className="pagination pagination-sm justify-content-center mb-0">
                        {/* Previous */}
                        <li className={`page-item ${start <= 1 ? 'disabled' : ''}`}>
                            <Link className="page-link" to={`/board/boardList/${boardId}?page=${start - 1}`}>이전</Link>
                        </li>
                        {getPage(start, end).map((p) => (
                            <li key={p} className={`page-item ${pageInt === p ? 'active' : ''}`}>
                                <Link className="page-link" to={`/board/boardList/${boardId}?page=${p}`}>{p}</Link>
                            </li>
                        ))}
                        {/* Next */}
                        <li className={`page-item ${start + bottomLine > maxPage ? 'disabled' : ''}`}>
                            <Link className="page-link" to={`/board/boardList/${boardId}?page=${start + bottomLine}`}>다음</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
export default BoardList;