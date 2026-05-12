const Welcome = function() {

const name = "홍길동"
const mystyle = {
    color : "white",
    backgroundColor  : "black",
    padding : "10px",
    borderRadius : "20px"
}
    return (
    <h1 style={mystyle}>안녕하세요 {name} 입니다</h1>
    )
}
export default Welcome;