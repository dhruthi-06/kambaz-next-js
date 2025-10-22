export default function MapFunction() {
  const numberArray1: number[] = [123456];

  const square = (a: number): number => a * a;
  const todos: string[] = ["Buy milk", "Feed the pets"];

  const squares: number[] = numberArray1.map(square);
  const cubes: number[] = numberArray1.map((a) => a ** 3);

  return (
    <div id="wd-map-function">
      <h4>Map Function</h4>
      squares = {squares.join(", ")} <br />
      cubes = {cubes.join(", ")} <br />
      Todos:
      <ol>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ol>
      <hr />
    </div>
  );
}