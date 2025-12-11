import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";
import { BsPlus } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
export default function ModulesControlsButton ({moduleId, deleteModule, editModule}: {moduleId: string, deleteModule: (moduleId: string) => void; editModule: (moduleId: string) => void;}) {
    return (
        <div className="display-flex float-end">
            <FaPencil onClick={() => editModule(moduleId)} style={{ cursor: "pointer" }} className="text-primary me-3"/>
            <FaTrash className="text-danger mb-1 me-2" onClick={() => deleteModule(moduleId)} style={{ cursor: "pointer" }}/>
            <GreenCheckmark/>
            <BsPlus className="fs-1"/>
            <IoEllipsisVertical className="fs-4"/>
        </div>
    );
}