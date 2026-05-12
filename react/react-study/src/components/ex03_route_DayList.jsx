import { Link } from "react-router-dom"
import data from "../db/data.json"
/*
 * Link : a 태그와 기능이 비슷함. Route에 설정된 컴포넌트로 변경
 *    a : url 변경하여 화면을 호출
 */
export default function DayList() {
    return (
        <ul className="list_day">
            {data.days.map(day => (
                <li key={day.id}>
                    <Link to={`/day/${day.day}`}>Day {day.day}</Link>
                </li>
            ))}
        </ul>
    )
}