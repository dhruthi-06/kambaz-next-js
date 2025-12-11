import './Classes.css';
export default function Classes () {
    const color = 'light-blue';
    const dangerous = true;
    return (
        <div>
            <h2>Classes</h2>
            <div className="wd-bg-light-yellow wd-fg-black wd-padding-10px">
                Yellow Background 
            </div> <br/>
            <div className="wd-bg-light-blue wd-fg-black wd-padding-10px">
                Blue Background 
            </div> <br/>
            <div className="wd-bg-red wd-fg-black wd-padding-10px">
                Red Background 
            </div><br/>
            <div className={`${dangerous?'wd-bg-red':'wd-bg-green'} wd-fg-black wd-padding-10px`}>
                Dangerous Background 
            </div><br/>
            <div className={`wd-bg-${color} wd-fg-black wd-padding-10px`}>
                Dynamic Blue Background 
            </div> <hr/>
        </div>
    );
}