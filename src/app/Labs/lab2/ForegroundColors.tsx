export default function ForegroundColors() {
    return (
<div className='wd-foreground-colors'>
    <h2> Colors</h2>
    <h3 className="wd-fg-blue"> Foreground Color</h3>
    <br />
    <p className="wd-fg-red">This text is red but
        <span className="wd-fg-green"> this part is green.</span>
    </p>   
</div>
    );
}