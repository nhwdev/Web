import {useState, useEffect} from "react";
import dayjs from "dayjs";

function BoardComment({boardNum}) {
    const [comments, setComments] = useState([]);
    const [name, setName] = useState("");
    const [pass, setPass] = useState("");
    const [content, setContent] = useState("");

    // 댓글 목록 조회
    const getComments = () => {
        fetch("http://localhost:8080/comment/list?boardNum=" + boardNum)
            .then((resp) => resp.json())
            .then((json) => setComments(json))
    }

    useEffect(() => {
        if (boardNum) getComments();
    }, [boardNum]);

    // 댓글 등록
    const handleSubmit = () => {
        const formData = new FormData();
        formData.append("boardNum", boardNum);
        formData.append("name", name);
        formData.append("pass", pass);
        formData.append("content", content);

        fetch("http://localhost:8080/comment/commentPro", {
            method: "POST",
            body: formData
        })
            .then((resp) => {
                if (resp.ok) {
                    setName("");
                    setPass("");
                    setContent("");
                    getComments(); // 등록 후 목록 새로고침
                }
            })
    }

    // 댓글 삭제
    const handleDelete = (commentNum) => {
        const pass = prompt("비밀번호를 입력하세요");
        if (!pass) return;

        fetch(`http://localhost:8080/comment/commentDeletePro?num=${commentNum}&pass=${pass}`, {
            method: "DELETE"
        })
            .then((resp) => {
                if (resp.ok) {
                    getComments();
                } else {
                    alert("비밀번호가 틀렸습니다.");
                }
            })
    }

    return (
        <div className="mt-3">

            {/* 댓글 헤더 */}
            <div className="d-flex align-items-center mb-3">
                <small className="font-weight-bold">댓글</small>
                <span className="badge badge-secondary ml-2">{comments.length}</span>
            </div>

            {/* 댓글 목록 */}
            {comments.length > 0 ? (
                comments.map((c, index) => (
                    <div key={index} className="bg-white rounded p-2 mb-2 border">
                        <div className="d-flex justify-content-between align-items-center mb-1">
                            <small className="font-weight-bold">{c.name}</small>
                            <div>
                                <small className="text-muted mr-2">{dayjs(c.regdate).format("YYYY-MM-DD")}</small>
                                <button
                                    className="btn btn-outline-danger btn-sm py-0"
                                    style={{fontSize: "11px"}}
                                    onClick={() => handleDelete(c.num)}
                                >
                                    삭제
                                </button>
                            </div>
                        </div>
                        <p className="mb-0 text-muted small">{c.content}</p>
                    </div>
                ))
            ) : (
                <div className="text-center text-muted py-3 small">
                    댓글이 없습니다.
                </div>
            )}

            <hr className="mt-2 mb-3"/>

            {/* 댓글 입력 */}
            <div className="form-row mb-1">
                <div className="form-group col-md-2 mb-1">
                    <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="작성자"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="form-group col-md-2 mb-1">
                    <input
                        type="password"
                        className="form-control form-control-sm"
                        placeholder="비밀번호"
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                    />
                </div>
            </div>
            <div className="input-group">
            <textarea
                className="form-control form-control-sm"
                rows="2"
                placeholder="댓글을 입력하세요"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
                <div className="input-group-append">
                    <button className="btn btn-dark btn-sm" onClick={handleSubmit}>
                        등록
                    </button>
                </div>
            </div>

        </div>
    )
}

    export default BoardComment;