import ModuleEditor from "./ModuleEditor";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { RxCircleBackslash } from "react-icons/rx";
import GreenCheckmark from "./GreenCheckmark";
import { useState } from "react";
export default function ModulesControls ({ moduleName, setModuleName, addModule }:
{ moduleName: string; setModuleName: (title: string) => void; addModule: () => void; }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    return (
        <div id="wd-modules-controls" className="text-nowrap">
        <Button variant="danger" onClick={handleShow} size="sm" className="float-end" id="wd-add-module-btn">
        <FaPlus className="me-1 mb-1" />
       Module
     </Button>
     <Dropdown className="float-end me-2">
       <DropdownToggle variant="secondary" size="sm" id="wd-publish-all-btn">
         <GreenCheckmark /> Publish All
       </DropdownToggle>
       <DropdownMenu>
         <DropdownItem id="wd-publish-all">
           <GreenCheckmark /> Publish All
         </DropdownItem>
         <DropdownItem id="wd-publish-all-modules-and-items">
           <GreenCheckmark /> Publish all modules and items
         </DropdownItem>
         <DropdownItem id="wd-publish-modules-only">
           <GreenCheckmark /> Publish modules only
         </DropdownItem>

                <DropdownItem id="wd-unpublish-all-modules-only">
                    <RxCircleBackslash /> Unpublish All Modules and Items
                </DropdownItem>
                <DropdownItem id="wd-upublish-modules-only">
                    <RxCircleBackslash /> Unpublish Modules Only
                </DropdownItem>
            </DropdownMenu>
            </Dropdown>
            <Button id="wd-view-progress" size="sm" className="me-2 float-end mb-2" variant="secondary">View Progress</Button>
            <Button id="wd-collapse-all" size="sm" className="me-2 float-end mb-2" variant="secondary">Collapse All</Button>
            <ModuleEditor show={show} handleClose={handleClose} dialogTitle="Add Module" moduleName={moduleName} setModuleName={setModuleName} addModule={addModule}/>
        </div>
    );
}