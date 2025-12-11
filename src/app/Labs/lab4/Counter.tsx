import { useState } from "react";

export default function Counter () {
    const initial=7;
    const [count, setcount] = useState(initial);
    console.log(count);
    return(
        <div id="wd-counter">
            <h3>Integer State Variables</h3>
            <h5>Counter : {count}</h5>
            <button onClick={() => setcount(count+1)} id="wd-up-button" className="btn btn-success me-2">Up</button>
            <button onClick={() => setcount(count-1)} id="wd-down-button" className="btn btn-danger me-2">Down</button>
            <button onClick={() => setcount(initial)} id="wd-initial-button" className="btn btn-primary">Initial Value</button>
            <hr/>
        </div>
    );
}