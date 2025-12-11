"use client";

const add = (a:number, b:number) => {
    alert (`${a} + ${b} = ${a+b}`);
}
export default function PassingDataOnEvent () {
    return (
        <div id="wd-passing-event">
            <h3>Passing on Event</h3>
            <button onClick={() => add(2,3)} id="wd-add-button" className="btn btn-primary">Pass 2 and 3 to add</button> <hr/>
        </div> 
    );
}