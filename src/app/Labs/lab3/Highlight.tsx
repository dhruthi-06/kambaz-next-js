import { ReactNode } from "react";

export default function Highlight ({children} : {children:ReactNode}) {
    return (
        <div>
            <h3>Highlight of the text</h3>
        <span id="wd-highlight" style={{backgroundColor:"yellow", color:"red"}}>
            {children}
        </span> <hr/>
        </div>
    );
}