import { useState } from "react";
import ChildStateComponents from "./ChildStateComponents";
export default function ParentStateComponents () {
    const initial=123;
    const [counter, setcounter] = useState(initial);
    return (
        <div id="wd-parent-state">
            <h3>Parent State Component and Child State Component</h3>
            <h4>Counter: {counter}</h4>
            <ChildStateComponents
            counter={counter}
            setcounter={setcounter}
            initial={initial}/>
        </div>
    );
}
