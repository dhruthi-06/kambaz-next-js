"use client";
import { useDispatch, useSelector } from "react-redux";
import {increment, decrement} from "../CounterRedux/counterReducer";
import { RootState } from "../../store";
export default function CounterRedux () {
    const {count} = useSelector ((state: RootState) => state.counter);
    const dispatch = useDispatch();
    return (
        <div id="wd-counter-redux">
            <h3>Counter redux</h3>
            <h4>{count}</h4>
            <button onClick={() => dispatch(increment())} id="wd-redux-increment" className="btn btn-success me-2">Increment</button>
            <button onClick={() => dispatch(decrement())} id="wd-redux-decrement" className="btn btn-danger me-2">Decrement</button>
        </div>
    );
} 