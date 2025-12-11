import { Table } from "react-bootstrap";

export default function BootstrapTables () {
    return (
        <div id="wd-styling-tables">
            <h2>Tables</h2>
            <Table>
                <thead>
                    <tr className="table-dark"><th>Quiz</th><th>Topic</th><th>Date</th><th>Grade</th></tr>
                </thead>
                <tbody>
                    <tr className="table-warning"><td>Q1</td><td>HTML</td><td>10/1/21</td><td>85</td></tr>
                    <tr className="table-danger"><td>Q2</td><td>CSS</td><td>10/8/21</td><td>90</td></tr>
                    <tr className="table-primary"><td>Q3</td><td>JS</td><td>10/15/21</td><td>95</td></tr>
                </tbody>
                <tfoot>
                    <tr className="table-success"><td colSpan={3}>Average</td><td>90</td></tr>
                </tfoot>
            </Table>
            <div id="wd-responsive-tables">
                <h2>Responsive Tables</h2>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>Very</th><th>long</th><th>set</th><th>of</th><th>columns</th><th>Very</th><th>long</th><th>set</th><th>of</th><th>columns</th><th>Very</th><th>long</th><th>set</th><th>of</th><th>columns</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Very</td><td>long</td><td>set</td><td>of</td><td>columns</td><td>Very</td><td>long</td><td>set</td><td>of</td><td>columns</td><td>Very</td><td>long</td><td>set</td><td>of</td><td>columns</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    );
}