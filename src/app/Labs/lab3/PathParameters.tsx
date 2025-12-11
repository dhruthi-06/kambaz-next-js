import Link from "next/link";
export default function Pathparameters () {
    return (
        <div id="wd-path-parameters">
            <h3>Path parameters</h3>
            <Link href="/labs/lab3/add/1/2">1+2</Link> <br/>
            <Link href="/labs/lab3/add/3/4">3+4</Link> <hr/>
        </div>
    );
}