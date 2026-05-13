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
        e.preventDefault(); // 기본 이벤트 취소, onSubmit 이벤트 취소
        let fileInput = document.querySelector("#file2");
        try {
            const form = new FormData(); // ajax으로 서버에 전달할 객체
            form.append("name", gName); // 글쓴이
            form.append("pass", pass); // 비밀번호
            form.append("subject", subject); // 제목
            form.append("content", content); // 내용
            form.append("boardid", boardId); // 게시판 종류
            form.append("file2", fileInput.files[0]); // 첨부된 파일데이터
            // await: fetch 함수에 결과(response)가 올때까지 대기. async 예약어 필요
            const response = await fetch('http://localhost:8080/board/boardPro', {
                method: 'POST',
                body: form // 파라미터 + 첨부파일데이터
            });
            if (response.ok) { // 정상적으로 서버에서 응답이 온 경우
                navigate("/board/boardList/" + boardId) // 리다이렉트 함
            }
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <div className="container">
            <h4 className="text-center">게시판 입력</h4>
            <form className="container" method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">작성자: </label>
                    <input type="text" className="form-control" placeholder="Enter name" id="name" onChange={(e) => {
                        setGname(e.target.value);
                    }} value={gName} name="name"/>
                </div>
                <div className="form-group">
                    <label htmlFor="pwd">비밀번호: </label>
                    <input type="password" className="form-control" placeholder="Enter password" id="pwd" onChange={(e) => { setPass(e.target.value); }} value={pass} name="pass" />
                </div>
                <div className="form-group">
                    <label htmlFor="subject">제목: </label>
                    <input type="text" className="form-control" placeholder="Enter password"
                           onChange={(e) => {
                               setSubject(e.target.value);
                           }} value={subject} name="subject"/>
                </div>
                <div className="form-group">
                    <label htmlFor="content">내용: </label>
                    <textarea className="form-control" rows="5" id="content" value={content} name="content"
                              onChange={(e) => {
                                  setContent(e.target.value);
                              }}></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="file">파일: </label>
                    <input type="file" className="form-control" id="file2" onChange={(e) => {
                        setFile2(e.target.value);
                    }} value={file2} name="file2"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default BoardForm;