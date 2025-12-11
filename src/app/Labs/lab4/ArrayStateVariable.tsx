import { useState } from "react";
export default function ArrayStateVariable () {
    const [array, setarray] = useState([1,2,3,4,5]);
    const addElement = () => {
        setarray([...array, Math.floor(Math.random()*100)]);
    };
    const deleteElement = (index: number) => {
        setarray(array.filter((item, i) => i !== index));
    };
    return (
        <div id="wd-array-variables">
            <h3>Array State Variables</h3>
            <button className="btn btn-success mt-3" onClick={addElement}>Add Element</button>
            <ul>
                {array.map((item, index) => (
                    <li key={index}>{item}
                    <button className="btn btn-danger mt-3 ms-2" onClick={() => deleteElement(index)}>Delete</button>
                    </li>
                ))}
            </ul>
        
            <hr/>
        </div>
    );
}