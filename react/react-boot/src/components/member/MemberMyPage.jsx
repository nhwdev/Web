import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";

function MemberMyPage() {
    const [member, setMember] = useState({});
    const [cookies] = useCookies(["id"]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:8080/member/mypage", {
            method: "GET",
            credentials: "include"
        })
            .then((resp) => resp.json())
            .then((json) => setMember(json))
    }, []);

    return (
        <div className="container mt-4" style={{maxWidth: "500px"}}>
            <div className="card shadow-sm">

                {/* 헤더 */}
                <div className="card-header bg-dark text-white">
                    <h5 className="mb-0">마이페이지</h5>
                </div>

                {/* 본문 */}
                <div className="card-body">

                    {/* 프로필 사진 */}
                    <div className="text-center mb-3">
                        {member.picture ? (
                            <img src={"http://localhost:8080/img/profile/" + member.picture}
                                 width="100" height="100"
                                 className="rounded-circle border"
                                 style={{objectFit: "cover"}} alt="프로필"/>
                        ) : (
                            <div className="rounded-circle border bg-light d-inline-flex align-items-center justify-content-center"
                                 style={{width: "100px", height: "100px", fontSize: "13px", color: "#aaa"}}>
                                사진없음
                            </div>
                        )}
                        <p className="font-weight-bold mt-2 mb-0">{member.name}</p>
                        <small className="text-muted">{member.id}</small>
                    </div>

                    <hr/>

                    {/* 정보 */}
                    <table className="table table-borderless table-sm mb-0">
                        <tbody>
                        <tr>
                            <td className="text-muted" style={{fontSize: "13px", width: "100px"}}>성별</td>
                            <td>{member.gender === 1 ? "남" : "여"}</td>
                        </tr>
                        <tr>
                            <td className="text-muted" style={{fontSize: "13px"}}>전화번호</td>
                            <td>{member.tel || "-"}</td>
                        </tr>
                        <tr>
                            <td className="text-muted" style={{fontSize: "13px"}}>이메일</td>
                            <td>{member.email || "-"}</td>
                        </tr>
                        </tbody>
                    </table>

                </div>

                {/* 푸터 */}
                <div className="card-footer bg-white d-flex justify-content-between">
                    <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => navigate("/member/memberDelete")}
                    >
                        회원탈퇴
                    </button>
                    <button
                        className="btn btn-dark btn-sm px-4"
                        onClick={() => navigate("/member/memberUpdate")}
                    >
                        정보수정
                    </button>
                </div>

            </div>
        </div>
    )
}

export default MemberMyPage;