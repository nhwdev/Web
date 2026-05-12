import data from "../db/data.json"
import { useParams } from "react-router-dom"
/*
 * useParams → Hook
 * <Route path="/day/:day" element={<Day />} />
 * http://.../day/1 → :day 의 값 1 설정됨
 * useParams: url에 제공하는 파라미터를 리턴
 *    :day 파라미터
 *     day : 1 값이 저장
 */
export default function Day() {
    const {day} = useParams(); // url 형식의 파라미터 값 전달
    const wordList = data.words.filter(word => (word.day === Number(day)))
    return (
        <>
            <h2>Day{day}</h2>
            <table>
                <tbody>
                    {wordList.map(word => (
                        <tr key={word.id}>
                            <td>{word.eng}</td>
                            <td>{word.kor}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}