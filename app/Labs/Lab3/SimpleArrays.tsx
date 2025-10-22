export default function SimpleArrays() {
  const functionScoped: number = 2;
  const blockScoped: number = 5;
  const constant1: number = functionScoped - blockScoped;

  const numberArray1: number[] = [12345];
  const stringArray1: string[] = ["string1string2"];

  // Store plain text for the todo list or keep <li> elements
  const htmlArray1 = [
    <li key={1}>Buy milk</li>,
    <li key={2}>Feed the pets</li>,
  ];

  const variableArray1 = [
    functionScoped,
    blockScoped,
    constant1,
    ...numberArray1,
    ...stringArray1,
  ];

  return (
    <div id="wd-simple-arrays">
      <h4>Simple Arrays</h4>
      numberArray1 = {numberArray1.join(" ")}
      <br />
      stringArray1 = {stringArray1.join(" ")}
      <br />
      variableArray1 = {variableArray1.join("")}
      <br />
      Todo list:
      <ol>{htmlArray1}</ol>
      <hr />
    </div>
  );
}