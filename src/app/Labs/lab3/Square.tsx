import { ReactNode } from "react";
export default function Square ({children} : {children:ReactNode}) {
    const num = Number(children);
    return (
        <div>
        <h3>Square of a number (Child Components)</h3>
        Square of {num} = <span id="wd-square">{num*num}</span> <hr/>
        </div>
    );
}