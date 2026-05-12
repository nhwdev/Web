// data의 days 키값만 <li> 태그로 출력
import data from "../db/data.json"
// data : data.json 파일의 내용 객체로 저장
export default function DayList() {
    return (
        <ul className="list_day">
            {/*
              * map: 반복문, 요소들을 순회
              * day: { "id" : 1, "day" : 1} → days 배열객체에 한개의 요소 객체
              */}
            {data.days.map(day => (
                <li key={day.id}>Day {day.day}</li>
            ))}
        </ul>
    )
}