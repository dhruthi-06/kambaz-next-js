import Link from "next/link";
export default function Labs() {
    return (
        <div id="wd-labs-link">
            <h1>Labs</h1>
            <ul>
                <li>
                    <Link href="/Labs/lab1">Lab 1 : HTML Examples</Link>
                </li>
                <li>
                    <Link href="/Labs/lab2">Lab 2 : CSS Basics</Link>
                </li>
                <li>
                    <Link href="/Labs/lab3">Lab 3 : JavaScript Fundamentals</Link>
                </li>
                <li>
                    <Link href="/Labs/lab4">Lab 4 : State & Redux</Link>
                </li>
                <li>
                    <Link href="/Labs/lab5">Lab 5 : Implementing Node.js </Link>
                </li>
                <li>
                    <Link href="/kambaz/Account/signin">Kambaz</Link>
                </li>
            </ul>
        </div>
    );
}