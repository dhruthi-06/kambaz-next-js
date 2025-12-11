import  './index.css';
import ForegroundColors from './ForegroundColors';
import BackgroundColors from './BackgroundColors';
import Borders from './Borders';
import Padding from './Padding';
import Margins from './Margins';
import Corners from './Corners';
import Dimensions from './Dimensions';
import Positions from './Positions';
import Zindex from './Zindex';
import Float from './Float';
import GridLayout from './GridLayout';
import Flex from './Flex';
import ReactIcons from './ReactIcons';
import { Container } from 'react-bootstrap';
import BootstrapGrids from './BootstrapGrids';  
import ScreenSize from './ScreenSizeLabel';
import BootstrapTables from './BootstrapTables';
import BootstrapLists from './BootstrapLists';
import BootstrapForms from './BootstrapForms';
import BootstrapNavigation from './BootstrapNavigation';
export default function Lab2() {
    return (
        <Container>
        <h1>Lab 2 - Cascading Style Sheets:</h1>
    <h3>Styling with Style attribute</h3>
    <p id='wd-id-first'>Styling attribute allows us to configuring the look and feel right on the element. 
        Although it is not recommended for large scale applications, 
        it can be useful for quick prototypes or testing ideas and should avoid using the style attribute.
    </p>
    <div id ="wd-id-selectors">
        <h3>Styling with Class selector</h3>
        <p id ="wd-id-selector-1">Instead of changing the look and feel of all the elements, 
            we can make use of the Class selector to target specific elements.
        </p>
        <p id ="wd-id-selector-2">This is another paragraph with a different Class.</p>
    </div>
    <div id ="wd-id-class-selectors">
        <h3>Styling with ID selector</h3>
        <p className ="wd-id-class-selector-1">Instead of changing the look and feel of all the elements, 
            we can make use of the ID selector to target specific elements.
        </p>
        <h4 className ="wd-id-class-selector-2">This is another paragraph with a different ID.</h4>
    </div>    
    <div id='wd-id-document-structure'>
        <div className='wd-id-selector-1'>
        <h3>Document Structure</h3>
        <div className='wd-id-selector-2'>
        <p>This is a paragraph inside the Document Structure section.</p>
        <p className='wd-id-selector-3'>This paragraphs red background is due to the following selector: <br/>
            <br/> .selector-2 .selector-3 <br/>
            meaning the descendant of some ancestor <br/>
            <span className='wd-id-selector-4'>this span is a direct child of its parent.</span> <br/>
            You can combine these relationships to create more specific styles depending on the document structure.
        </p>
        </div>
        </div>
    </div>
    <ForegroundColors />
    <BackgroundColors />
    <Borders />
    <Padding />
    <Margins />
    <Corners />
    <Dimensions />
    <Positions />
    <Zindex /> <br /> <br /> <br /> <br /> <br /><br /> <br /> 
    <Float /> <br /><br />
    <GridLayout /> <br /> <br />
    <Flex /> <br />
    <ReactIcons />
    <BootstrapGrids />
    <ScreenSize />
    <BootstrapTables />
    <BootstrapLists /> <br />
    <BootstrapForms />
    <BootstrapNavigation />
    </Container>
    );
}