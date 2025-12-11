export default function Flex() {
    return (
        <div id="wd-flex">
            <h2>Flex</h2>
            <div className="wd-flex-row-container">
                <div className="wd-bg-yellow">Column 1</div>
                <div className="wd-bg-blue">Column 2</div>
                <div className="wd-bg-red">Column 3</div>
                <br />
                <div className="wd-bg-yellow">Column 1</div>
                <div className="wd-bg-blue">Column 2</div>
                <div className="wd-bg-red wd-flex-grow-1">Column 3</div>
                <br />
                <div className="wd-bg-yellow wd-width-75px">Column 1</div>
                <div className="wd-bg-blue">Column 2</div>
                <div className="wd-bg-red wd-flex-grow-1">Column 3</div>
                <br />
            </div>
        </div>
    );
}