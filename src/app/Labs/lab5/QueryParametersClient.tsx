"use client";
import React, {useState} from "react";
import { FormControl } from "react-bootstrap";
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export default function QueryParametersClient () {
    const [a, setA] = useState("34");
    const [b, setB] = useState("24");
    return (
        <div id="wd-lab5-query-parameters">
            <h3>Query Parameters</h3>
            <FormControl id="wd-query-parameter-a" className="mb-2" defaultValue={a} type="number" onChange={(e) => setA(e.target.value)}/>
            <FormControl id="wd-query-parameter-b" className="mb-2" defaultValue={b} type="number" onChange={(e) => setB(e.target.value)}/>
                <a id="wd-query-parameter-add" className="btn btn-primary me-2" href={`${HTTP_SERVER}/lab5/calculator?operation=add&a=${a}&b=${b}`}>Add {a} + {b}</a>
                <a id="wd-query-parameter-sub" className="btn btn-primary me-2" href={`${HTTP_SERVER}/lab5/calculator?operation=sub&a=${a}&b=${b}`}>Sub {a} - {b}</a>
                <a id="wd-query-parameter-mul" className="btn btn-primary me-2" href={`${HTTP_SERVER}/lab5/calculator?operation=mul&a=${a}&b=${b}`}>Mul {a} * {b}</a>
                <a id="wd-query-parameter-div" className="btn btn-primary me-2" href={`${HTTP_SERVER}/lab5/calculator?operation=div&a=${a}&b=${b}`}>Div {a} / {b}</a>
                <hr/>
        </div>
    );
}