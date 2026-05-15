import {useState} from "react";
import {useNavigate} from "react-router-dom";

function MemberLogin() {
    const [id, setId] = useState("");
    const [pass, setPass] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const response = await fetch("http://localhost:8080/member/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({id, pass})
        })

        if(response.ok){
            navigate("/member/mypage/"+id)
        } else {
            setError(await response.text())
        }
    }

    return (
        <div className="container mt-5" style={{maxWidth: "400px"}}>
            <div className="card shadow-sm">

                {/* 헤더 */}
                <div className="card-header bg-dark text-white">
                    <h5 className="mb-0">로그인</h5>
                </div>

                {/* 본문 */}
                <div className="card-body">
                    <form id="login-form" onSubmit={handleSubmit}>

                        {/* 아이디 */}
                        <div className="form-group">
                            <label className="text-muted" style={{fontSize: "13px"}}>아이디</label>
                            <input
                                type="text"
                                className={`form-control ${error ? 'is-invalid' : ''}`}
                                placeholder="아이디를 입력하세요"
                                value={id}
                                onChange={(e) => {
                                    setId(e.target.value)
                                    setError("")
                                }}
                            />
                        </div>

                        {/* 비밀번호 */}
                        <div className="form-group mb-0">
                            <label className="text-muted" style={{fontSize: "13px"}}>비밀번호</label>
                            <input
                                type="password"
                                className={`form-control ${error ? 'is-invalid' : ''}`}
                                placeholder="비밀번호를 입력하세요"
                                value={pass}
                                onChange={(e) => {
                                    setPass(e.target.value)
                                    setError("")
                                }}
                            />
                            {error && <div className="invalid-feedback">{error}</div>}
                        </div>

                    </form>
                </div>

                {/* 푸터 */}
                <div className="card-footer bg-white">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <small className="text-muted">
                            계정이 없으신가요?
                            <a href="/member/join" className="ml-1">회원가입</a>
                        </small>
                        <button className="btn btn-dark btn-sm px-4" form="login-form">
                            로그인
                        </button>
                    </div>
                    <hr className="mt-0 mb-2"/>
                    <div className="d-flex justify-content-center">
                        <a href="/member/findId" className="text-muted small mr-3">아이디 찾기</a>
                        <span className="text-muted small mr-3">|</span>
                        <a href="/member/findPass" className="text-muted small">비밀번호 찾기</a>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default MemberLogin