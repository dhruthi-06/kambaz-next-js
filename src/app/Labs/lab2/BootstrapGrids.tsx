import { Container, Row, Col } from "react-bootstrap";

function BootstrapGrids () {
    return (
        <Container>
        <h2>Bootstrap</h2>
            <div id="wd-bs-grid-system">
                <Row>
                    <Col className="bg-danger text-white"> <h3>Left Half</h3> </Col>
                    <Col className="bg-primary text-white"> <h3>Right Half</h3></Col>
                </Row>
                <Row>
                    <Col xs={4} className="bg-warning"><h3>One third</h3></Col>
                    <Col xs={8} className="bg-success text-white"><h3>Two third</h3></Col>
                </Row>
                <Row>
                    <Col xs={2} className="bg-black text-white"><h3>Sidebar</h3></Col>
                    <Col xs={8} className="bg-secondary text-white"><h3>Main Content</h3></Col>
                    <Col xs={2} className="bg-info"><h3>Sidebar</h3></Col>
                </Row>
            </div>
            <br />
            <div id="wd-bs-responsive-grid">
                <h2>Responsive Grid System</h2>
                <Row>
                    <Col xs={12} md={6} xl={3} className="bg-warning">Column A</Col>
                    <Col xs={12} md={6} xl={3} className="bg-primary text-white">Column B</Col>
                    <Col xs={12} md={6} xl={3} className="bg-danger text-white">Column C</Col>
                    <Col xs={12} md={6} xl={3} className="bg-success text-white">Column D</Col>
                </Row>
            </div>
            <div id="wd-bs-responsive-dramatic">
                <h2>Dramatic Responsive Grid System</h2>
                <Row>
                    <Col xs={12} sm={6} md={4} lg={3} xl={2} xxl={1} className="bg-warning">1</Col>
                    <Col xs={12} sm={6} md={4} lg={3} xl={2} xxl={1} className="bg-primary text-white">2</Col>
                    <Col xs={12} sm={6} md={4} lg={3} xl={2} xxl={1} className="bg-danger text-white">3</Col>
                    <Col xs={12} sm={6} md={4} lg={3} xl={2} xxl={1} className="bg-success text-white">4</Col>
                    <Col xs={12} sm={6} md={4} lg={3} xl={2} xxl={1} className="bg-warning">5</Col>
                    <Col xs={12} sm={6} md={4} lg={3} xl={2} xxl={1} className="bg-primary text-white">6</Col>
                    <Col xs={12} sm={6} md={4} lg={3} xl={2} xxl={1} className="bg-danger text-white">7</Col>
                    <Col xs={12} sm={6} md={4} lg={3} xl={2} xxl={1} className="bg-success text-white">8</Col>
                    <Col xs={12} sm={6} md={4} lg={3} xl={2} xxl={1} className="bg-warning">9</Col>
                    <Col xs={12} sm={6} md={4} lg={3} xl={2} xxl={1} className="bg-primary text-white">10</Col>
                    <Col xs={12} sm={6} md={4} lg={3} xl={2} xxl={1} className="bg-danger text-white">11</Col>
                    <Col xs={12} sm={6} md={4} lg={3} xl={2} xxl={1} className="bg-success text-white">12</Col>

                </Row>
            </div>
        </Container>
    );
}
export default BootstrapGrids;