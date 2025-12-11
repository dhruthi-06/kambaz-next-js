export default function AddingandRemovingToFromArrays () {
    const numberarray = [1,2,3,4,5];
    const stringarray = ["string 1, ", "string 2, "];
    const todoarray = [<li key={1}>Buy milk</li>, <li key={2}>Feed the pets</li>]
    numberarray.push(6);
    stringarray.push("string 3");
    numberarray.splice(1,1);
    stringarray.splice(1,1);
    todoarray.push(<li key={3}>Walk the dog</li>)
    return (
        <div id="wd-add-and-remove-from-array">
            <h3>Adding and Removing to an Array</h3>
            Number Array = {numberarray} <br/>
            String Array = {stringarray} <br/>
            TODO list : 
            <ol>{todoarray}</ol> <hr/>
        </div>
    );
}