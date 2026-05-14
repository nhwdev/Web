import {useState, useEffect} from "react";
import {Link, useLocation, useParams} from "react-router-dom";
import dayjs from "dayjs";

function BoardInfo() {
    const [board, setBoard] = useState({})
    const [boardName, setBoardName] = useState("")
    const location = useLocation();
    let queryString = location.search;
    const {bNum} = useParams();

    const getBoardInfo = () => {
        if (queryString.length === 0) {
            queryString = "?num=" + bNum;
        }
        fetch("http://localhost:8080/board/boardInfo" + queryString)
            .then((resp) => resp.json())
            .then((json) => {
                setBoard(json.board);
                setBoardName(json.boardName);
            })
    }
    useEffect(() => { getBoardInfo() }, []);

    return (
        <div className="container mt-4">
            <div className="card shadow-sm">

                {/* 헤더 */}
                <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">{boardName}</h5>
                    <span className="badge badge-light">조회수 {board.readcnt}</span>
                </div>

                {/* 본문 */}
                <div className="card-body">
                    {/* 제목 + 날짜 */}
                    <h5 className="font-weight-bold mb-1">{board.subject}</h5>
                    <small className="text-muted">
                        {dayjs(board.regdate).format("YYYY-MM-DD")}
                    </small>
                    <hr />

                    {/* 내용 */}
                    <div className="mb-4 p-3 bg-light rounded">
                        {board.content}
                    </div>

                    {/* 첨부파일 */}
                    {board.file1 && (
                        <div className="d-flex align-items-center mb-2">
                            <span className="badge badge-secondary mr-2">첨부파일</span>
                            <span className="text-muted small">{board.file1}</span>
                            <img
                                src={"http://localhost:8080/img/board/" + board.file1}
                                width="80" height="80"
                                className="ml-3 rounded border"
                                alt="첨부이미지"
                            />
                        </div>
                    )}
                </div>

                {/* 푸터 - 버튼 */}
                <div className="card-footer bg-white d-flex justify-content-between">
                    <Link to={`/board/boardList/${board.boardid}`} className="btn btn-outline-secondary btn-sm">
                        ← 목록
                    </Link>
                    <div>
                        <Link to={`/board/boardUpdate/${board.num}`} className="btn btn-outline-primary btn-sm mr-1">
                        {/*<Link to={`/board/boardUpdateForm/${board.num}`} className="btn btn-outline-primary btn-sm mr-1">*/}
                            수정
                        </Link>
                        <Link to={`/board/boardDelete/${board.num}`} className="btn btn-outline-danger btn-sm">
                            삭제
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default BoardInfo;