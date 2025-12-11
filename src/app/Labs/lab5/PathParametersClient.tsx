"use client";
import React, {useState} from "react";
import { FormControl } from "react-bootstrap";
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export default function PathParametersClient() {
    const [a,seta] = useState("34");
    const [b,setb] = useState("17");
    return (
        <div id="wd-lab5-path-parameters">
            <h3>Path Parameters</h3>
            <FormControl className="mb-2" id="wd-path-parameter-a" type="number" defaultValue={a} onChange={(e) => seta(e.target.value)}/>
            <FormControl className="mb-2" id="wd-path-parameter-b" type="number" defaultValue={b} onChange={(e) => setb(e.target.value)}/>
                <a className="btn btn-primary me-2" id="wd-path-parameter-add" href={`${HTTP_SERVER}/lab5/add/${a}/${b}`}>Add {a} + {b}</a>
                <a className="btn btn-primary me-2" id="wd-path-parameter-sub" href={`${HTTP_SERVER}/lab5/sub/${a}/${b}`}>Sub {a} - {b}</a>
                <a className="btn btn-primary me-2" id="wd-path-parameter-mul" href={`${HTTP_SERVER}/lab5/mul/${a}/${b}`}>Mul {a} * {b}</a>
                <a className="btn btn-primary me-2" id="wd-path-parameter-div" href={`${HTTP_SERVER}/lab5/div/${a}/${b}`}>Div {a} / {b}</a>
            <hr/>
        </div>
    );
}