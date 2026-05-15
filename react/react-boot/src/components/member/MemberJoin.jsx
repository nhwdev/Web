import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

function MemberJoin() {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [pass, setPass] = useState("");
    const [passConfirm, setPassConfirm] = useState("");
    const [gender, setGender] = useState(1);
    const [tel, setTel] = useState("");
    const [email, setEmail] = useState("");
    const [picture, setPicture] = useState(null);
    const [errors, setErrors] = useState({});
    const [idChecked, setIdChecked] = useState(false);
    const navigate = useNavigate();

    const validate = () => {
        const newErrors = {};
        if (!id) newErrors.id = "아이디를 입력하세요.";
        if (!pass) newErrors.pass = "비밀번호를 입력하세요.";
        if (!passConfirm) newErrors.passConfirm = "비밀번호 확인을 입력하세요.";
        if (pass && passConfirm && pass !== passConfirm) newErrors.passConfirm = "비밀번호가 일치하지 않습니다.";
        if (!name) newErrors.name = "이름을 입력하세요.";
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "이메일 형식이 올바르지 않습니다.";
        return newErrors;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setErrors({});

        const formData = new FormData();
        formData.append('id', id);
        formData.append('name', name);
        formData.append('pass', pass);
        formData.append('gender', gender);
        formData.append('tel', tel);
        formData.append('email', email);
        if(picture) {
            formData.append('profileFile', picture);
        }

        const response = await fetch("http://localhost:8080/member/joinPro", {
            method: 'POST',
            body: formData
        });
        try {
            if (response.ok) {
                alert("회원가입에 성공했습니다!");
                navigate("/member/login");
            } else {
                const errorData = await response.text();
                alert(`회원가입 실패: ${errorData || "입력 정보를 확인하세요."}`);
            }
        } catch (error) {
            console.error("서버 오류!", error);
        }
    }

    // 아이디 입력할때마다 중복체크
    useEffect(() => {
        if (!id) {
            setIdChecked(false);
            return;
        }

        // 입력 멈추면 0.5초 후 체크 (너무 자주 요청 안보내게)
        const timer = setTimeout(() => {
            fetch("http://localhost:8080/member/idCheck?id=" + id)
                .then((resp) => resp.json())
                .then((json) => {
                    if (json) {
                        setErrors(prev => ({...prev, id: "이미 사용중인 아이디입니다."}));
                        setIdChecked(false);
                    } else {
                        setErrors(prev => ({...prev, id: ""}));
                        setIdChecked(true);
                    }
                })
        }, 500) // 0.5초 대기

        return () => clearTimeout(timer) // 입력중에는 타이머 취소
    }, [id])

    return (
        <div className="container mt-4" style={{maxWidth: "500px"}}>
            <div className="card shadow-sm">

                {/* 헤더 */}
                <div className="card-header bg-dark text-white">
                    <h5 className="mb-0">회원가입</h5>
                </div>

                {/* 본문 */}
                <div className="card-body">
                    <form id="register-form" onSubmit={handleSubmit}>

                        {/* 아이디 */}
                        <div className="form-group">
                            <label className="text-muted" style={{fontSize: "13px"}}>아이디</label>
                            <input
                                type="text"
                                className={`form-control ${errors.id ? 'is-invalid' : idChecked ? 'is-valid' : ''}`}
                                placeholder="아이디를 입력하세요"
                                value={id}
                                onChange={(e) => {
                                    setId(e.target.value);
                                    setIdChecked(false);
                                }
                            }
                            />
                            {errors.id && <div className="invalid-feedback">{errors.id}</div>}
                            {idChecked && <div className="valid-feedback">사용 가능한 아이디입니다.</div>}
                        </div>

                        {/* 비밀번호 */}
                        <div className="form-group">
                            <label className="text-muted" style={{fontSize: "13px"}}>비밀번호</label>
                            <input
                                type="password"
                                className={`form-control ${errors.pass ? 'is-invalid' : ''}`}
                                placeholder="비밀번호를 입력하세요"
                                value={pass}
                                onChange={(e) => setPass(e.target.value)}
                            />
                            {errors.pass && <div className="invalid-feedback">{errors.pass}</div>}
                        </div>

                        {/* 비밀번호 확인 */}
                        <div className="form-group">
                            <label className="text-muted" style={{fontSize: "13px"}}>비밀번호 확인</label>
                            <input
                                type="password"
                                className={`form-control ${errors.passConfirm ? 'is-invalid' : pass && passConfirm && pass === passConfirm ? 'is-valid' : ''}`}
                                placeholder="비밀번호를 다시 입력하세요"
                                value={passConfirm}
                                onChange={(e) => setPassConfirm(e.target.value)}
                            />
                            {errors.passConfirm
                                ? <div className="invalid-feedback">{errors.passConfirm}</div>
                                : pass && passConfirm && pass === passConfirm
                                    ? <div className="valid-feedback">비밀번호가 일치합니다.</div>
                                    : null
                            }
                        </div>

                        {/* 이름 */}
                        <div className="form-group">
                            <label className="text-muted" style={{fontSize: "13px"}}>이름</label>
                            <input
                                type="text"
                                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                placeholder="이름을 입력하세요"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
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
                                        checked={gender === 1}
                                        onChange={() => setGender(1)}
                                    />
                                    <label className="form-check-label" htmlFor="male">남</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        id="female"
                                        value={2}
                                        checked={gender === 2}
                                        onChange={() => setGender(2)}
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
                                className="form-control"
                                placeholder="전화번호를 입력하세요"
                                value={tel}
                                onChange={(e) => setTel(e.target.value)}
                            />
                        </div>

                        {/* 이메일 */}
                        <div className="form-group">
                            <label className="text-muted" style={{fontSize: "13px"}}>이메일</label>
                            <input
                                type="email"
                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                placeholder="이메일을 입력하세요"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                        </div>

                        {/* 프로필 사진 */}
                        <div className="form-group mb-0">
                            <label className="text-muted" style={{fontSize: "13px"}}>프로필 사진</label>
                            <input
                                type="file"
                                className="form-control-file"
                                onChange={(e) => setPicture(e.target.files[0])}
                            />
                        </div>

                    </form>
                </div>

                {/* 푸터 */}
                <div className="card-footer bg-white d-flex justify-content-between align-items-center">
                    <small className="text-muted">
                        이미 계정이 있으신가요?
                        <a href="/member/login" className="ml-1">로그인</a>
                    </small>
                    <button className="btn btn-dark btn-sm px-4" form="register-form">
                        가입하기
                    </button>
                </div>

            </div>
        </div>
    )
}

export default MemberJoin;