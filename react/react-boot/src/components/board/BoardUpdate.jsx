import {useState, useEffect} from "react";
import {useLocation, useParams, useNavigate} from "react-router-dom";

function BoardUpdate() {
    const [board, setBoard] = useState({})
    const [boardName, setBoardName] = useState("")
    const [subject, setSubject] = useState("")
    const [content, setContent] = useState("")
    const [pass, setPass] = useState("")
    const [file, setFile] = useState(null)
    const location = useLocation();
    let queryString = location.search;
    const {bNum} = useParams();
    const navigate = useNavigate();

    // 기존 데이터 불러오기
    const getBoardInfo = () => {
        fetch("http://localhost:8080/board/boardInfo?num=" + bNum)
            .then((resp) => resp.json())
            .then((json) => {
                setBoard(json.board);
                setBoardName(json.boardName);
                setSubject(json.board.subject);   // 기존 제목 세팅
                setContent(json.board.content);   // 기존 내용 세팅
            })
    }

    useEffect(() => {
        getBoardInfo()
    }, []);

    // 수정 전송
    const handleSubmit = async (e) => {
        const formData = new FormData();
        formData.append("num", board.num);
        formData.append("pass", pass);
        formData.append("boardid", board.boardid);
        formData.append("subject", subject);
        formData.append("content", content);

        if (file) formData.append("file2", file);
        try {
            const resp = await fetch("http://localhost:8080/board/boardUpdatePro", {
                method: "POST",
                body: formData
            });
            if (resp.ok) {
                alert("수정 완료!")
                navigate("/board/boardInfo/" + board.num); // 수정 후 상세로 이동
            } else {
                alert("비밀번호가 일치하지 않습니다.");
            }
        } catch (error) {
            console.error("네트워크 에러", error);
        }
    }

    return (
        <div className="container mt-4" style={{maxWidth: "700px"}}>
            <div className="card shadow-sm">

                {/* 헤더 */}
                <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">{boardName} - 게시글 수정</h5>
                    <span className="badge badge-light">수정</span>
                </div>

                {/* 본문 */}
                <div className="card-body">
                    {/* 작성자 */}
                    <div className="form-group">
                        <label className="text-muted" style={{fontSize: "13px"}}>작성자</label>
                        <input
                            type="text"
                            className="form-control-plaintext"
                            value={board.name}
                            readonly
                        />
                    </div>

                    {/* 제목 */}
                    <div className="form-group">
                        <label className="text-muted" style={{fontSize: "13px"}}>제목</label>
                        <input
                            type="text"
                            className="form-control"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                        />
                    </div>

                    {/* 내용 */}
                    <div className="form-group">
                        <label className="text-muted" style={{fontSize: "13px"}}>내용</label>
                        <textarea
                            className="form-control"
                            rows="8"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>

                    {/* 기존 첨부파일 */}
                    {board.file1 && (
                        <div className="form-group">
                            <label className="text-muted" style={{fontSize: "13px"}}>기존 첨부파일</label>
                            <div className="d-flex align-items-center">
                                <span className="badge badge-secondary mr-2">첨부파일</span>
                                <span className="text-muted small">{board.file1}</span>
                                <img
                                    src={"http://localhost:8080/img/board/" + board.file1}
                                    width="60" height="60"
                                    className="ml-3 rounded border"
                                    alt="첨부이미지"
                                />
                            </div>
                        </div>
                    )}

                    {/* 새 파일 업로드 */}
                    <div className="form-group mb-0">
                        <label className="text-muted" style={{fontSize: "13px"}}>파일 변경</label>
                        <input
                            type="file"
                            className="form-control-file"
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                    </div>

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
                        onClick={() => navigate("/board/boardInfo/" + board.num)}>
                        ← 취소
                    </button>
                    <button
                        className="btn btn-dark btn-sm px-4"
                        onClick={handleSubmit}>
                        수정 완료
                    </button>
                </div>

            </div>
        </div>
    )
}

export default BoardUpdate;