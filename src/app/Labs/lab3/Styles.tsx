export default function Styles () {
    const black = {color:"black"};
    const padding10px = {padding : "10px"};
    const bgblue = {
        "backgroundColor" : "lightblue",
        "color" : "black", ...padding10px
    };
    const bgred = {
        "backgroundColor" : "lightcoral",
        ...black, ...padding10px
    };
    return (
        <div id="wd-styles">
            <h3>Styles</h3>
            <div style={{backgroundColor: "lightyellow", color: "black", padding: "10px"}}>
                Yellow Background
            </div> <br/>
            <div style={bgred}>
                Red Background
            </div> <br/>
            <div style={bgblue}>
                Blue Background
            </div> <hr/>
        </div>
    );
}