export default function MapFunction () {
    const numberarray = [1,2,3,4,5];
    const square = (a:number) => a*a;
    const todos = ["Buy the milk", "Feed the pets", "Walk the dog"];
    const squares = numberarray.map(square);
    const cubes = numberarray.map((a)=>a*a*a);
    return (
        <div id="wd-array-map">
            <h3>Map Functions</h3>
            Arrays : {numberarray} <br/>
            Square of array : {squares} <br/>
            Cube of array : {cubes} <br/>
            Todos :
            <ol>
                {todos.map((todo,index) => (
                    <li key={index}>{todo}</li>
                ))}
            </ol> <hr/>
        </div>
    );
}