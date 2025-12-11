"use client";
export default function PassingFunction (
    { thefunction } : {thefunction: () => void}){
        return (
            <div id="wd-pass-function">
                <h3>Passing Functions</h3>
                <button onClick={thefunction} className="btn btn-primary">Invoke the Function</button> <hr/>
            </div>
        );
    }