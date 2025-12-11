export default function BackgroundColors() {
    return (
        <div className='wd-background-colors'>
            <h3 className="wd-bg-blue wd-fg-white"> Background Color</h3>
            <br />
            <p className="wd-bg-red wd-fg-black">This text has a red background but
                <span className="wd-bg-green wd-fg-white"> this part has a green background.</span>
            </p>
        </div>
    );
}