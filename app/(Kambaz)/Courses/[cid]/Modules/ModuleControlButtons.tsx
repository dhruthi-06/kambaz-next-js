"use client";

import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { BsPlus } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";

export default function ModuleControlButtons({
  cid,
  moduleId,
  deleteModule,
  editModule,
}: {
  cid: string;
  moduleId: string;
  deleteModule: (courseId: string, moduleId: string) => void;
  editModule: (moduleId: string) => void;
}) {
  return (
    <div className="float-end d-flex align-items-center">
      {/* ✏ Edit module */}
      <FaPencil
        onClick={(e) => {
          e.stopPropagation();
          editModule(moduleId);
        }}
        className="text-primary me-3"
        role="button"
        title="Edit module"
      />

      {/* 🗑 Delete module */}
      <FaTrash
        className="text-danger me-3"
        role="button"
        title="Delete module"
        onClick={(e) => {
          e.stopPropagation(); 
          deleteModule(cid, moduleId);
        }}
      />

      <GreenCheckmark />
      <BsPlus className="fs-1 ms-2" />
      <IoEllipsisVertical className="fs-4 ms-2" />
    </div>
  );
}
