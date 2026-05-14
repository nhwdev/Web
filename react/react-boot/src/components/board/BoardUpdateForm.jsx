import {useState, useCallback, useEffect} from "react";
/*
 * React 기본 Hook
 * useState: 데이터 값 관리
 * useEffect: 함수의 실행 시점 관리
 * useCallback: 함수의 재사용. 함수 자체를 메모리에 저장하여 재 생성 방지
 */
import {useNavigate, /*useLocation,*/ useParams} from "react-router-dom";

/*
 * React Router Hook
 * useNavigate: 다른 페이지로 이동 기능
 * useLocation: URL 정보 저장
 *     search : ? 이후에 정보
 * useParams: 파라미터 정보 저장
 */
function BoardUpdateForm() {
    const navigate = useNavigate();
    const [num, setNum] = useState(""); // 게시판 번호
    const [gName, setGName] = useState(""); // 글쓴이
    const [pass, setPass] = useState("") // 비밀번호
    const [subject, setSubject] = useState("") // 제목
    const [content, setContent] = useState("") // 내용
    const [file1, setFile1] = useState("") // 첨부파일
    const [boardId, setBoardId] = useState("") //게시판 종류
    const {bNum} = useParams();
    // const location = useLocation();
    // let queryString = location.search; // ?이후의 문자열

    const getBoardInfo = () => {
        fetch("http://localhost:8080/board/boardUpdateForm?num=" + bNum)
            .then((resp) => resp.json())
            .then((json) => { // 게시물의 상세정보를 읽어 화면에 표시할 변수에 저장
                setNum(json.board.num);
                setGName(json.board.name);
                setSubject(json.board.subject);
                setContent(json.board.content);
                setFile1(json.board.file1);
                setBoardId(json.board.boardid);
            });
    };
    useEffect(() => { // 화면이 시작시 getBoardInfo 함수 실행
        getBoardInfo();
    }, []);

    // submit 버튼 클릭시 호출됨
    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        let fileInput = document.querySelector("#file");
        try {
            const form = new FormData();
            form.append('num', bNum);
            form.append('name', gName);
            form.append('pass', pass);
            form.append('subject', subject);
            form.append('content', content);
            form.append('file1', file1);
            if (fileInput.files.length > 0) {
                form.append('file2', fileInput.files[0]);
            }
            form.append('boardid', boardId);

            // 1. 서버에 데이터 전송하고 응답이 올 때까지 기다림
            const resp = await fetch("http://localhost:8080/board/boardUpdatePro", {
                method: 'POST',
                body: form
            });

            // 2. 응답 본문을 JSON으로 파싱할 때까지 기다림
            const json = await resp.json();

            // 3. 결과 확인 후 페이지 이동
            document.querySelector("#msg").innerHTML = json.msg;
            // alert(json.msg)
            if (json.code === 0) {
                navigate("/board/boardInfo/" + bNum);
            }
        } catch (error) {
            console.error("업데이트 실패: ", error);
        }
    }, [num, gName, pass, subject, content, file1, boardId, navigate, bNum]); // 변수의 값이 변경될 때 함수를 메모리 생성
    return (
        <div className={"container"}>
            <h4 className={"text-center"}>게시판 수정</h4>
            <form className={"container"} method={"post"} encType={"multipart/form-data"} onSubmit={handleSubmit}>
                <div className={"form-group"}>
                    <label htmlFor={"name"}>작성자: </label>
                    <input type="text" className={"form-control"} placeholder={"Enter name"} id={"name"}
                           onChange={(e) => setGName(e.target.value)} value={gName} name={"name"}/>
                </div>
                <div id={"msg"} className={"text-danger text-left"} />
                <div className={"form-group"}>
                    <label htmlFor={"pwd"}>비밀번호: </label>
                    <input type="password" className={"form-control"} placeholder={"Enter password"} id={"pwd"}
                           onChange={(e) => setPass(e.target.value)} value={pass} name={"pass"}/>
                </div>
                <div className={"form-group"}>
                    <label htmlFor={"subject"}>제목: </label>
                    <input type="text" className={"form-control"} placeholder={"제목 입력"} id={"subject"}
                           onChange={(e) => setSubject(e.target.value)} value={subject} name={"subject"}/>
                </div>
                <div className={"form-group"}>
                    <label htmlFor={"content"}>내용: </label>
                    <textarea className={"form-control"} id="content" onChange={(e) => setContent(e.target.value)}
                              name={"content"} value={content}></textarea>
                </div>
                <div className={"form-group"}>
                    <label htmlFor="file">파일:&nbsp;{file1}</label>
                    <input type="file" className={"form-control"} id={"file"} onChange={(e) => {
                        setFile1(e.target.value)
                    }} name={"f"}/>
                </div>
                <button type="submit" className={"btn btn-primary"}>Submit</button>
            </form>
        </div>
    );
}

export default BoardUpdateForm;
