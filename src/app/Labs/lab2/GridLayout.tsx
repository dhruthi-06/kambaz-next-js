export default function GridLayout () {
    return (
        <div id="wd-grid-layout">
        <div id="wd-grid-left-right">
            <h2>Grid Layout</h2>
            <div className="wd-grid-row">
                <div className="wd-grid-col-half-page wd-bg-yellow">
                    <h3>Left half</h3>
                </div>
                <div className="wd-grid-col-half-page wd-bg-blue wd-fg-white">
                    <h3>Right half</h3>
                </div>
            </div>
                <div id="wd-css-left-third-right-two-thirds" className="wd-grid-row">
                    <div className="wd-grid-col-third-page wd-bg-green wd-fg-white">
                            <h3>Left third</h3>    
                    </div>
                    <div className="wd-grid-col-two-thirds-page wd-bg-red wd-fg-white">
                            <h3>Right two thirds</h3>    
                    </div>
                </div>
            <div id="wd-side-bars" className="wd-grid-row">
                <div className="wd-grid-col-left-side-bar wd-bg-yellow">
                    <h3>Side bar</h3>
                    <p>This is left sidebar</p>
                </div>
                <div className="wd-grid-col-main-content wd-bg-blue wd-fg-white">
                    <h3>Main content</h3>
                    <p>This is the main content. This is the main content. This is the main content.</p>
                </div>
            </div>
            <div className="wd-grid-col-right-side-bar wd-bg-green wd-fg-white">
                <h3>Side bar</h3>
                <p>This is right sidebar.</p>
            </div>    
        </div>
        </div>
    );
}