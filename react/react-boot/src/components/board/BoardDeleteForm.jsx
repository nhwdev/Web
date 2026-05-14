import {useState, useEffect} from "react";
import {Link, useLocation, useParams} from "react-router-dom";
import dayjs from "dayjs";

function BoardDeleteForm() {
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

    return(
        <>
            <h4>게시글 삭제</h4>
            <form method={"POST"}>
                <div className={"form-group"}>
                    제목: <input type="text" id="subject" className="form-control" />
                </div>
                <div className={"form-group"}>
                    제목: <input type="text" id="subject" className="form-control" />
                </div>
                <div className={"form-group"}>
                    제목: <input type="text" id="subject" className="form-control" />
                </div>
            </form>
        </>
    )
}

export default BoardDeleteForm;