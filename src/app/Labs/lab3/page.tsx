import BooleanVariables from "./BooleanVariables";
import VariableAndConstants from "./VariablesAndConstants";
import VariableTypes from "./VariableTypes";
import IfElse from "./IfElse";
import TernaryOperator from "./TernaryOperator";
import ConditionalOutputIfElse from "./ConditionalOutputIfElse";
import ConditionalOutputInline from "./ConditionalOutputInline";
import LegacyFunctions from "./LegacyFunctions";
import ArrowFunctions from "./ArrowFunctions";
import ImpliedReturn from "./ImpliedReturn";
import TemplateLiterals from "./TemplateLiterals";
import SimpleArrays from "./SimpleArrays";
import ArrayIndexandLength from "./ArrayIndexandLength";
import AddingandRemovingToFromArrays from "./AddingandRemovingToFtomArrays";
import ForLoops from "./ForLoops";
import MapFunction from "./MapFunction";
import FindFunction from "./FindFunctions";
import FindIndex from "./FindIndex";
import FilterFunction from "./FilterFunction";
import JsonStringify from "./JsonStringify";
import House from "./House";
import Spreader from "./Spreader";
import Destructing from "./Destructing";
import FunctionDestructing from "./FunctionDestructing";
import DestructingImports from "./DestructingImports";
import Classes from "./Classes";
import Styles from "./Styles";
import Add from "./Add";
import Square from "./Square";
import Highlight from "./Highlight";
import Pathparameters from "./PathParameters";
import TodoList from "./todos/TodoList";

export default function Lab3() {
    return (
        <div id="wd-lab3">
    <h1>Lab 3:</h1> <br/>
    <VariableAndConstants/>
    <VariableTypes/>
    <BooleanVariables/>
    <IfElse/>
    <TernaryOperator/> 
    <ConditionalOutputIfElse/> <hr/>
    <ConditionalOutputInline/>
    <LegacyFunctions/>
    <ArrowFunctions/>
    <ImpliedReturn/>
    <TemplateLiterals/>
    <SimpleArrays/>
    <ArrayIndexandLength/>
    <AddingandRemovingToFromArrays/>
    <ForLoops/>
    <MapFunction/>
    <FindFunction/>
    <FindIndex/>
    <FilterFunction/>
    <JsonStringify/>
    <House/>
    <Spreader/>
    <Destructing/>
    <FunctionDestructing/>
    <DestructingImports/>
    <Classes/>
    <Styles/>
    <Add a={3} b={4}/>
    <Square>4</Square>
     <Highlight> 
        This is highlighted sample text.
     </Highlight>
     <Pathparameters/>
     <TodoList/>
    </div>
    );
}