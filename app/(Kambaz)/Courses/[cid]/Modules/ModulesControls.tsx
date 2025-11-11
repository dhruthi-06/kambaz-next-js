"use client";

import { useState } from "react";
import GreenCheckmark from "./GreenCheckmark";
import GrayNoMark from "./GrayNoMark";
import { FaPlus } from "react-icons/fa6";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "react-bootstrap";
import ModuleEditor from "./ModuleEditor";

export default function ModulesControls({
  setModuleName,
  moduleName,
  addModule,
}: {
  setModuleName: (name: string) => void;
  moduleName: string;
  addModule: () => void;
}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div id="wd-modules-controls" className="text-nowrap mb-3 clearfix">
      {/* ✅ Add Module Button */}
      <Button
        variant="danger"
        size="lg"
        className="me-1 float-end"
        id="wd-add-module-btn"
        onClick={() => setShowModal(true)}
      >
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Module
      </Button>

      {/* ✅ Publish / Unpublish Dropdown */}
      <Dropdown className="float-end me-2">
        <DropdownToggle variant="secondary" size="lg" id="wd-publish-all-btn">
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
          <DropdownItem id="wd-unpublish-all-modules-and-items">
            <GrayNoMark /> Unpublish all modules and items
          </DropdownItem>
          <DropdownItem id="wd-unpublish-modules-only">
            <GrayNoMark /> Unpublish modules only
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      {/* ✅ View Progress Button */}
      <Button
        variant="secondary"
        size="lg"
        className="float-end me-2"
        id="wd-view-progress"
      >
        View Progress
      </Button>

      {/* ✅ Collapse All Button */}
      <Button
        variant="secondary"
        size="lg"
        className="float-end me-2"
        id="wd-collapse-all"
      >
        Collapse All
      </Button>

      {/* ✅ ModuleEditor Modal */}
      <ModuleEditor
        show={showModal}
        handleClose={() => setShowModal(false)}
        dialogTitle="Add Module"
        moduleName={moduleName}
        setModuleName={setModuleName}
        addModule={() => {
          addModule();
          setShowModal(false);
        }}
      />
    </div>
  );
}