import {useNavigate, useParams} from "react-router-dom";
import {useState} from "react";

function BoardForm() {
    const navigate = useNavigate();
    const [gName, setGname] = useState("");
    const [pass, setPass] = useState("");
    const [subject, setSubject] = useState("");
    const [content, setContent] = useState("");
    const [file2, setFile2] = useState("");
    const {boardId} = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let fileInput = document.querySelector("#file2");
        try {
            const form = new FormData();
            form.append("name", gName);
            form.append("pass", pass);
            form.append("subject", subject);
            form.append("content", content);
            form.append("boardid", boardId);
            form.append("file2", fileInput.files[0]);
            const response = await fetch('http://localhost:8080/board/boardPro', {
                method: 'POST',
                body: form
            });
            if (response.ok) {
                navigate("/board/boardList/" + boardId)
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="container mt-4" style={{maxWidth: "700px"}}>
            <div className="card shadow-sm">

                {/* 헤더 */}
                <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">게시글 등록</h5>
                    <span className="badge badge-light">작성</span>
                </div>

                {/* 본문 */}
                <div className="card-body">
                    <form onSubmit={handleSubmit}>

                        {/* 작성자 + 비밀번호 */}
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label className="text-muted" style={{fontSize: "13px"}}>작성자</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="작성자"
                                    value={gName}
                                    onChange={(e) => setGname(e.target.value)}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label className="text-muted" style={{fontSize: "13px"}}>비밀번호</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="비밀번호"
                                    value={pass}
                                    onChange={(e) => setPass(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* 제목 */}
                        <div className="form-group">
                            <label className="text-muted" style={{fontSize: "13px"}}>제목</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="제목을 입력하세요"
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
                                placeholder="내용을 입력하세요"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </div>

                        {/* 파일 */}
                        <div className="form-group mb-0">
                            <label className="text-muted" style={{fontSize: "13px"}}>파일 첨부</label>
                            <input
                                type="file"
                                className="form-control-file"
                                id="file2"
                                onChange={(e) => setFile2(e.target.value)}
                            />
                        </div>

                    </form>
                </div>

                {/* 푸터 - 버튼 */}
                <div className="card-footer bg-white d-flex justify-content-between">
                    <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => navigate("/board/boardList/" + boardId)}
                    >
                        ← 취소
                    </button>
                    <button
                        className="btn btn-dark btn-sm px-4"
                        onClick={handleSubmit}
                    >
                        등록
                    </button>
                </div>
            </div>
        </div>
    )
}

export default BoardForm;