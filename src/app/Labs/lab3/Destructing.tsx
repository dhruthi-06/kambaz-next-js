export default function Destructing () {
    const person = {name : "John", age : 25};
    const {name, age} = person;
    const numbers = ["first", "second", "third"];
    const [first,second,third] = numbers;
    return (
        <div id="wd-destructing">
            <h3>Destructing</h3>
            <h4>Object Destructing</h4>
                const &#123; name, age &#125; = &#123; name: &quot;John&quot;, age: 25 &#125;<br />
                name = {name}<br />
                age = {age}<br/><br/>
            <h4>Array Destructing</h4>
            const [first, second, third] = [&quot;one&quot;, &quot;two&quot;, &quot;three&quot;]<br />
            first = {first}<br />
            second = {second}<br />
            third = {third}<hr/>
        </div>
    );
}