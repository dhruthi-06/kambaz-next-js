import Math, {add,subtract,multiply,divide} from "./Math";
import * as operation from "./Math";
export default function DestructingImports  () {
    return (
        <div id="wd-destructing-imports">
            <h3>Destructing Imports</h3>
            <table className="table table-sm">
                <thead>
                    <tr>
                        <th>Math</th>
                        <th>Operations</th>
                        <th>Function</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Math.add(2,3) = {Math.add(2,3)}</td>
                        <td>operation.add (2,3) = {operation.add(2,3)}</td>
                        <td>add(2,3) = {add(2,3)}</td>
                    </tr>
                    <tr>
                        <td>Math.subtract(2,3) = {Math.subtract(2,3)}</td>
                        <td>operation.subtract (2,3) = {operation.subtract(2,3)}</td>
                        <td>subtract(2,3) = {subtract(2,3)}</td>
                    </tr>
                    <tr>
                        <td>Math.multiply(2,3) = {Math.multiply(2,3)}</td>
                        <td>operation.multiply (2,3) = {operation.multiply(2,3)}</td>
                        <td>multiply(2,3) = {multiply(2,3)}</td>
                    </tr>
                    <tr>
                        <td>Math.divide(6,3) = {Math.divide(6,3)}</td>
                        <td>operation.divide (6,3) = {operation.divide(6,3)}</td>
                        <td>divide(6,3) = {divide(6,3)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}