import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";
import PictureUpload from "./PictureUpload.jsx";

function MemberUpdate() {
    const [member, setMember] = useState({});
    const [passConfirm, setPassConfirm] = useState("");
    const [picture, setPicture] = useState(null);
    const [preview, setPreview] = useState(null);
    const [showPicture, setShowPicture] = useState(false);
    const [errors, setErrors] = useState({});
    const [cookies] = useCookies(["id"]);
    const navigate = useNavigate();

    // 회원 정보 불러오기
    useEffect(() => {
        fetch("http://localhost:8080/member/mypage?id=" + cookies.id, {
            method: "GET",
            credentials: "include"
        })
            .then((resp) => resp.json())
            .then((json) => setMember(json))
    }, []);

    // 공통 onChange
    const handleChange = (e) => {
        setMember({...member, [e.target.name]: e.target.value});
    }

    const handlePictureUpload = (file, previewUrl) => {
        setPicture(file);
        setPreview(previewUrl);
    }

    // 유효성 검사
    const validate = () => {
        const newErrors = {};
        if (!member.name) newErrors.name = "이름을 입력하세요.";
        if (member.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(member.email)) newErrors.email = "이메일 형식이 올바르지 않습니다.";
        if (member.pass && member.pass !== passConfirm) newErrors.passConfirm = "비밀번호가 일치하지 않습니다.";
        return newErrors;
    }

    // 정보 수정
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setErrors({});

        const formData = new FormData();
        formData.append("id", member.id);
        formData.append("name", member.name);
        formData.append("tel", member.tel || "");
        formData.append("email", member.email || "");
        formData.append("gender", member.gender);
        if (member.pass) formData.append("pass", member.pass);
        if (picture) formData.append("profileFile", picture);

        const response = await fetch("http://localhost:8080/member/updatePro", {
            method: "POST",
            body: formData
        });
        if (response.ok) {
            alert("정보가 수정되었습니다!");
            navigate("/member/myPage");
        } else {
            alert("수정에 실패했습니다.");
        }
    }

    return (
        <div className="container mt-4" style={{maxWidth: "500px"}}>
            <div className="card shadow-sm">

                {/* 헤더 */}
                <div className="card-header bg-dark text-white">
                    <h5 className="mb-0">정보 수정</h5>
                </div>

                {/* 본문 */}
                <div className="card-body">
                    <form id="update-form" onSubmit={handleSubmit}>

                        {/* 프로필 사진 */}
                        <div className="form-group text-center">
                            {preview ? (
                                <img src={preview} width="100" height="100"
                                     className="rounded-circle border mb-2"
                                     style={{objectFit: "cover"}} alt="프로필"/>
                            ) : member.profileFileName ? (
                                <img src={"http://localhost:8080/img/profile/" + member.profileFileName}
                                     width="100" height="100"
                                     className="rounded-circle border mb-2"
                                     style={{objectFit: "cover"}} alt="프로필"/>
                            ) : (
                                <div className="rounded-circle border mb-2 bg-light d-inline-flex align-items-center justify-content-center"
                                     style={{width: "100px", height: "100px", fontSize: "13px", color: "#aaa"}}>
                                    사진없음
                                </div>
                            )}
                            <div>
                                <button className="btn btn-outline-dark btn-sm" type="button"
                                        onClick={() => setShowPicture(true)}>
                                    사진 변경
                                </button>
                            </div>
                        </div>

                        <hr/>

                        {/* 아이디 - 수정불가 */}
                        <div className="form-group">
                            <label className="text-muted" style={{fontSize: "13px"}}>아이디</label>
                            <input type="text" className="form-control" value={member.id || ""} disabled/>
                        </div>

                        {/* 이름 */}
                        <div className="form-group">
                            <label className="text-muted" style={{fontSize: "13px"}}>이름</label>
                            <input
                                type="text"
                                name="name"
                                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                placeholder="이름을 입력하세요"
                                value={member.name || ""}
                                onChange={handleChange}
                            />
                            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                        </div>

                        {/* 성별 */}
                        <div className="form-group">
                            <label className="text-muted" style={{fontSize: "13px"}}>성별</label>
                            <div>
                                <div className="form-check form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        id="male"
                                        value={1}
                                        checked={member.gender === 1}
                                        onChange={() => setMember({...member, gender: 1})}
                                    />
                                    <label className="form-check-label" htmlFor="male">남</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        id="female"
                                        value={2}
                                        checked={member.gender === 2}
                                        onChange={() => setMember({...member, gender: 2})}
                                    />
                                    <label className="form-check-label" htmlFor="female">여</label>
                                </div>
                            </div>
                        </div>

                        {/* 전화번호 */}
                        <div className="form-group">
                            <label className="text-muted" style={{fontSize: "13px"}}>전화번호</label>
                            <input
                                type="text"
                                name="tel"
                                className="form-control"
                                placeholder="전화번호를 입력하세요"
                                value={member.tel || ""}
                                onChange={handleChange}
                            />
                        </div>

                        {/* 이메일 */}
                        <div className="form-group">
                            <label className="text-muted" style={{fontSize: "13px"}}>이메일</label>
                            <input
                                type="email"
                                name="email"
                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                placeholder="이메일을 입력하세요"
                                value={member.email || ""}
                                onChange={handleChange}
                            />
                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                        </div>

                        <hr/>

                        {/* 비밀번호 */}
                        <div className="form-group">
                            <label className="text-muted" style={{fontSize: "13px"}}>새 비밀번호 (변경시에만 입력)</label>
                            <input
                                type="password"
                                name="pass"
                                className="form-control"
                                placeholder="새 비밀번호"
                                onChange={handleChange}
                            />
                        </div>

                        {/* 비밀번호 확인 */}
                        <div className="form-group mb-0">
                            <label className="text-muted" style={{fontSize: "13px"}}>새 비밀번호 확인</label>
                            <input
                                type="password"
                                className={`form-control ${errors.passConfirm ? 'is-invalid' : member.pass && passConfirm && member.pass === passConfirm ? 'is-valid' : ''}`}
                                placeholder="새 비밀번호 확인"
                                value={passConfirm}
                                onChange={(e) => setPassConfirm(e.target.value)}
                            />
                            {errors.passConfirm
                                ? <div className="invalid-feedback">{errors.passConfirm}</div>
                                : member.pass && passConfirm && member.pass === passConfirm
                                    ? <div className="valid-feedback">비밀번호가 일치합니다.</div>
                                    : null
                            }
                        </div>

                    </form>
                </div>

                {/* 모달 */}
                <PictureUpload
                    show={showPicture}
                    onClose={() => setShowPicture(false)}
                    onUpload={handlePictureUpload}
                />

                {/* 푸터 */}
                <div className="card-footer bg-white d-flex justify-content-between">
                    <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => navigate("/member/myPage")}
                    >
                        ← 취소
                    </button>
                    <button className="btn btn-dark btn-sm px-4" form="update-form">
                        수정완료
                    </button>
                </div>

            </div>
        </div>
    )
}

export default MemberUpdate;