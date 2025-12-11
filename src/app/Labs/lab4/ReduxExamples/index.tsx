"use client";
import AddRedux from "./AddRedux";
import CounterRedux from "./CounterRedux";
import HelloRedux from "./HelloRedux";

export default function ReduxExamples() {
    return (
        <div id="wd-redux-examples">
            <h3>Redux Examples</h3>
            <HelloRedux/>
            <CounterRedux/>
            <AddRedux/>
        </div>
    );
}