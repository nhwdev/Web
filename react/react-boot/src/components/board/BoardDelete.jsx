import {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import dayjs from "dayjs";

function BoardDelete() {
    const [board, setBoard] = useState({})
    const [pass, setPass] = useState("")
    const [boardName, setBoardName] = useState("")
    const {bNum} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:8080/board/boardInfo?num=" + bNum)
            .then((resp) => resp.json())
            .then((json) => {
                setBoard(json.board);
                setBoardName(json.boardName);
            })
    }, []);

    const handleDelete = async (e) => {
        try {
            const resp = await fetch("http://localhost:8080/board/boardDeletePro", {
                method: "DELETE",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({
                    num : bNum,
                    pass
                })
            });
            if (resp.ok) {
                alert("게시글이 삭제되었습니다!");
                navigate("/board/boardList/" + board.boardid);
            } else {
                alert(await resp.text());
            }
        } catch (error){
            console.error("네트워크 에러", error);
        }
    }

    return (
        <div className="container mt-4" style={{maxWidth: "700px"}}>
            <div className="card shadow-sm">

                {/* 헤더 */}
                <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">{boardName} - 게시글 수정</h5>
                    <span className="badge badge-danger">삭제</span>
                </div>

                {/* 본문 */}
                <div className="card-body">

                    {/* 삭제 경고 */}
                    <div className="alert alert-danger mb-4">
                        정말 삭제하시겠습니까? 삭제 후 복구가 불가능합니다.
                    </div>

                    {/* 게시글 미리보기 */}
                    <h5 className="font-weight-bold mb-1">{board.subject}</h5>
                    <small className="text-info mr-3">작성자: {board.name}</small>
                    <small className="text-muted">{dayjs(board.regdate).format("YYYY-MM-DD")}</small>
                    <div className="mt-2 p-3 bg-light rounded text-muted small">
                        {board.content}
                    </div>

                    {/* 첨부파일 */}
                    {board.file1 && (
                        <div className="mt-3 d-flex align-items-center">
                            <span className="badge badge-secondary mr-2">첨부파일</span>
                            <span className="text-muted small">{board.file1}</span>
                            <img
                                src={"http://localhost:8080/img/board/" + board.file1}
                                width="60" height="60"
                                className="ml-3 rounded border"
                                alt="첨부이미지"
                            />
                        </div>
                    )}

                    {/* 비밀번호 검증 */}
                    <div className="form-group">
                        <label className="text-muted" style={{fontSize: "13px"}}>비밀번호</label>
                        <input
                            type="password"
                            className="form-control"
                            value={pass}
                            placeholder="비밀번호를 입력하세요"
                            onChange={(e) => setPass(e.target.value)}
                        />
                    </div>

                </div>

                {/* 푸터 - 버튼 */}
                <div className="card-footer bg-white d-flex justify-content-between">
                    <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => navigate("/board/boardInfo/" + bNum)}
                    >
                        ← 취소
                    </button>
                    <button
                        className="btn btn-danger btn-sm px-4"
                        onClick={handleDelete}
                    >
                        삭제
                    </button>
                </div>

            </div>
        </div>
    )
}

export default BoardDelete;