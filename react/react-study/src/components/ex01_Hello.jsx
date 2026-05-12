import { useState } from "react";
/*
 * props(properties)
 * 1. 컴포넌트 간의 데이터 전달시 사용되는 객체
 * 2. 부모 컴포넌트(App.jsx)에서 자식 컴포넌트(ex01_Hello.jsx)로 값을 전달시 사용
 * 3. props 변수에 age 값을 가져옴
 * 4. props 값은 변경 불가(immutable) → 자식 컴포넌트에서 props의 값을 수정❌
 */
export default function Hello ({age}) {
    const [name, setName] = useState("Mike"); // name 변수에는 Mike로 초기화
    const [newage, setAge] = useState(age); // newage 변수에는 props.age 값을 초기화
    let newAge1 = newage
    const msg = newage >= 18 ? "성인" : "미성년자"
    return (
        <div>
            <h2>{name} : {newAge1}살({msg})</h2>
            <button onClick={() => {
                setName(name === "Mike" ? "Tom" : "Mike"); // name 변수의 값을 변경
                setAge(newage + 1); // useState에 의해 newage 값 1 증가
            }}>이름 / 나이변경</button>
        </div>
    )
}