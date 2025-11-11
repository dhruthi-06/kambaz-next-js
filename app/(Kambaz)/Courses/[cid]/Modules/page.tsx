"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { ListGroup, ListGroupItem, FormControl } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import {
  addModule,
  deleteModule,
  editModule,
  updateModule,
} from "./reducer";

import ModulesControls from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";

export default function Modules() {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const { modules } = useSelector((state: RootState) => state.modulesReducer);

  const [moduleName, setModuleName] = useState("");
  

  
  const courseModules = modules.filter(
    (m: any) => m.course.toString().toLowerCase() === cid.toString().toLowerCase()
  );

  return (
    <div>
     
      <ModulesControls
        moduleName={moduleName}
        setModuleName={setModuleName}
        addModule={() => {
          if (!moduleName.trim()) return;
          dispatch(addModule({ name: moduleName, course: cid }));
          setModuleName("");
        }}
      />

      <br />
      <br />
      <br />

      {courseModules.length === 0 ? (
        <div className="p-3 text-center">
          No modules available for this course yet.
        </div>
      ) : (
        <ListGroup id="wd-modules" className="rounded-0">
          {courseModules.map((module: any) => (
            <ListGroupItem
              className="wd-module p-0 mb-5 fs-5 border-gray"
              key={module._id}
            >
              <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <BsGripVertical size={24} color="black" className="me-2" />


                  
                  {!module.editing && module.name}
                  {module.editing && (
                    <FormControl
                      className="w-50 d-inline-block"
                      defaultValue={module.name}
                      onChange={(e) =>
                        dispatch(
                          updateModule({ ...module, name: e.target.value })
                        )
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          dispatch(
                            updateModule({ ...module, editing: false })
                          );
                        }
                      }}
                    />
                  )}
                </div>

               
                <ModuleControlButtons
                  moduleId={module._id}
                  deleteModule={(moduleId) =>
                    dispatch(deleteModule(moduleId))
                  }
                  editModule={(moduleId) => dispatch(editModule(moduleId))}
                />
              </div>

              
              {module.lessons && module.lessons.length > 0 && (
                <ListGroup className="wd-lessons rounded-0">
                  {module.lessons.map((lesson: any) => (
                    <ListGroupItem
                      key={lesson._id}
                      className="wd-lesson p-3 ps-1 d-flex align-items-center justify-content-between"
                    >
                      <div className="d-flex align-items-center">
                        <BsGripVertical size={24} color="black" className="me-2" />

                        {lesson.name}
                      </div>
                      <LessonControlButtons />
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
            </ListGroupItem>
          ))}
        </ListGroup>
      )}
    </div>
  );
}
