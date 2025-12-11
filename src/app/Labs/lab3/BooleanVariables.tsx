export default function BooleanVariables () {
    const number = 123, floating = 123.456;
    const true1 = true, false1 = false;
    const false2 = true1&&false1;
    const true2 = true1||false1;
    const true3 = !false2;
    const true4 = number === 123;
    const true5 = floating === 123.456;
    const false3 = number < 100;
    return (
        <div id="wd-boolean-variables">
            <h3>Boolean Variables</h3>
            true1 = {true1+""};<br/>
            true2 = {true2+""};<br/>
            true3 = {true3+""};<br/>
            true4 = {true4+""};<br/>
            true5 = {true5+""};<br/>
            false1 = {false1+""};<br/>
            false2 = {false2+""};<br/>
            false3 ={false3+""}; <hr/>
        </div>
    );
}