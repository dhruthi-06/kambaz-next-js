import { useDispatch } from "react-redux";
import {useState} from "react";
import { FormControl } from "react-bootstrap";
import { add } from "./addReducer";
export default function AddRedux () {
    const [a, seta] = useState (12);
    const [b, setb] = useState (23);
    const dispatch = useDispatch();
    return (
        <div id="wd-add-redux">
            <h3>Add Redux</h3>
            <h4>{a}+{b}={a+b}</h4>
            <FormControl type="number" defaultValue={a} onChange={(e) => seta(parseInt(e.target.value))}/>
            <FormControl type="number" defaultValue={b} onChange={(e) => setb(parseInt(e.target.value))}/>
            <button id="wd-add-redux-button" onClick={() => dispatch(add({a,b}))} className="btn btn-primary mt-2 mb-2">Add Redux</button>
        </div>
    );
}