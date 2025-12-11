import { FormCheck, FormControl, FormLabel, FormSelect, InputGroup } from "react-bootstrap";
import FormRange from "react-bootstrap/esm/FormRange";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { Row, Col } from "react-bootstrap";
export default function BootstrapForms () {
    return (
        <div id="wd-forms">
            <div id="wd-css-styling-forms">
                <h2>Forms</h2>
                <FormLabel>Email Address</FormLabel>
                <FormControl type="email" placeholder="name@example.com" />
                <FormLabel>Example Textarea</FormLabel>
                <FormControl as="textarea" rows={3} />
            </div> <br/>
            <div id="wd-css-styling-dropdown">
                <h3>Dropdowns</h3>
                <FormSelect>
                    <option value="0" defaultChecked>Open the select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </FormSelect>
            </div> <br/>
            <div id="wd-css-styling-switches">
                <FormCheck type="switch" defaultChecked={false} label="Unchecked Switch Checkbox input"/>
                <FormCheck type="switch" defaultChecked={true} label="Checked Switch Checkbox input"/>
                <FormCheck type="switch" defaultChecked={false} label="Unchecked Switch Checkbox input" disabled/>
                <FormCheck type="switch" defaultChecked={true} label="Checked Switch Checkbox input" disabled/>
            </div> <br />
            <div id="wd-css-styling-range-and-sliders">
                <h3>Ranges</h3>
                <FormLabel>Example Range</FormLabel>
                <FormRange min={0} max={20} step={0.5} />
            </div> <br />
            <div id="wd-css-styling-addons">
                <h3>Addons</h3>
                <InputGroup className="mb-3">
                    <InputGroupText>$</InputGroupText>
                    <InputGroupText>0.00</InputGroupText>
                    <FormControl />
                </InputGroup>
                <InputGroup>
                    <FormControl />
                    <InputGroupText>$</InputGroupText>
                    <InputGroupText>0.00</InputGroupText>
                </InputGroup>
            </div>
            <div id="wd-css-responsive-forms">
                <h3>Responsive Forms</h3>
                <Row className="mb-3" controlId="email1">
                    <FormLabel column sm={2}>Email</FormLabel>
                    <Col sm={10}>
                        <FormControl type="email" defaultValue="name@example.com" />                   
                    </Col>
                </Row>
                <Row className="mb-3" controlId="password1">
                    <FormLabel column sm={2}>Password</FormLabel>
                    <Col sm={10}>
                        <FormControl type="password" />                   
                    </Col>
                </Row>
                <Row className="mb-3" controlId="textarea2">
                    <FormLabel column sm={2}>Bio</FormLabel>
                    <Col sm={10}>
                        <FormControl as="textarea" />
                    </Col>
                </Row>
            </div>
            <div id="wd-css-responsive-forms-2">
                <Row className="mb-3" controlId="email1">
                    <FormLabel column sm={2}>Email</FormLabel>
                    <Col sm={10}>
                        <FormControl type="email" defaultValue="name@exmaple.com" />                   
                    </Col>
                </Row>
                <Row className="mb-3" controlId="password1">
                    <FormLabel column sm={2}>Password</FormLabel>
                    <Col sm={10}>
                        <FormControl type="password" />                   
                    </Col>
                </Row>
                <Row className="mb-3">
                    <FormLabel as="legend" column sm={2}>Radios</FormLabel>
                    <Col sm={10}>
                        <FormCheck type="radio" label="First Radio" name="formhorizontalradio" defaultChecked />
                        <FormCheck type="radio" label="Second Radio" name="formhorizontalradio" />
                        <FormCheck type="radio" label="Third Radio" name="formhorizontalradio" />
                    </Col>
                </Row>
            </div>
        </div>
    );
}