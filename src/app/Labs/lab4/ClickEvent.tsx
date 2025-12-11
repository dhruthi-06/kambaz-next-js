"use client";
const hello = () => {
    alert("Hello World!");
}
const lifeIs = (good: string) => {
    alert(`Life is ${good}`);
}
export default function ClickEvent () {
    return (
        <div id="wd-click-event">
            <h3>Click Event</h3>
            <button onClick={hello} id="wd-hello-click">Hello World!</button><br/><br/>
            <button onClick={() => lifeIs("Good!")} id="wd-lifeIs-click">Life is Good!</button><br/><br/>
            <button onClick={() => {hello();lifeIs("Great!");}} id="wd-life-is-great-click">Life is Great!</button><br/>
            <hr/>
        </div>
    );
}