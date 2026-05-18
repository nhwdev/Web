import {useState} from "react";

function PictureUpload({show, onClose, onUpload}) {
    const [preview, setPreview] = useState(null);
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        if (!selected) return;
        setFile(selected);
        // 미리보기
        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result);
        reader.readAsDataURL(selected);
    }

    const handleUpload = () => {
        if (!file) {
            alert("이미지를 선택해주세요.");
            return;
        }
        onUpload(file, preview); // BoardUpdate로 파일/미리보기 전달
        onClose(); // 모달 닫기
    }

    const handleClose = () => {
        setPreview(null);
        setFile(null);
        onClose();
    }

    if (!show) return null; // show=false면 렌더링 안함

    return (
        <>
            {/* 배경 어둡게 */}
            <div
                style={{
                    position: "fixed", top: 0, left: 0,
                    width: "100%", height: "100%",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    zIndex: 1000
                }}
                onClick={handleClose}
            />

            {/* 모달 */}
            <div style={{
                position: "fixed", top: "50%", left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 1001, width: "400px"
            }}>
                <div className="card shadow">

                    {/* 헤더 */}
                    <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
                        <h6 className="mb-0">이미지 업로드</h6>
                        <button
                            className="btn btn-sm text-white"
                            onClick={handleClose}
                        >✕</button>
                    </div>

                    {/* 본문 */}
                    <div className="card-body">
                        <div className="form-group">
                            <label className="text-muted" style={{fontSize: "13px"}}>이미지 선택</label>
                            <input
                                type="file"
                                className="form-control-file"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </div>

                        {/* 미리보기 */}
                        {preview && (
                            <div className="text-center mt-3">
                                <label className="text-muted d-block mb-2" style={{fontSize: "13px"}}>미리보기</label>
                                <img
                                    src={preview}
                                    alt="미리보기"
                                    className="rounded border"
                                    style={{maxWidth: "100%", maxHeight: "200px", objectFit: "cover"}}
                                />
                            </div>
                        )}
                    </div>

                    {/* 푸터 */}
                    <div className="card-footer bg-white d-flex justify-content-between">
                        <button className="btn btn-outline-secondary btn-sm" onClick={handleClose}>
                            취소
                        </button>
                        <button className="btn btn-dark btn-sm px-4" onClick={handleUpload}>
                            업로드
                        </button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default PictureUpload;