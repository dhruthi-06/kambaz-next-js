export default function SimpleArrays () {
    const functionScoped = 2;
    const blockScoped = 5;
    const constant = functionScoped - blockScoped;
    const numberarray = [1,2,3,4,5];
    const stringarray = ["String1", "String2"];
    const htmlarray = [<li key={1}>Buy Milk</li>, <li key={2}>Feed the pets</li>];
    const variablearray = [functionScoped, blockScoped, constant, numberarray, stringarray];
    return (
        <div id="wd-simple-array">
            <h3>Simple Arrays</h3>
            numberarray = {numberarray} <br/>
            stringarray = {stringarray} <br/>
            variablearray = {variablearray} <br/>
            TODO list :
            <ol>{htmlarray}</ol> <hr/>
        </div>
    );
}