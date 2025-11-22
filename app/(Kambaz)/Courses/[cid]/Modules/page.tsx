"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ListGroup, ListGroupItem, FormControl } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { setModules, editModule } from "./reducer";

import * as client from "../../client";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";

export default function Modules() {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const { modules } = useSelector((state: RootState) => state.modulesReducer);

  const [moduleName, setModuleName] = useState("");

  // LOAD MODULES FROM SERVER
  const fetchModules = async () => {
    const serverModules = await client.findModulesForCourse(cid as string);
    dispatch(setModules(serverModules));
  };

  useEffect(() => {
    fetchModules();
  }, [cid]);

  // CREATE MODULE
  const onCreateModule = async () => {
    if (!moduleName.trim()) return;

    const newMod = await client.createModuleForCourse(cid as string, {
      name: moduleName,
    });

    dispatch(setModules([...modules, newMod]));
    setModuleName("");
  };

  // DELETE MODULE
  const onRemoveModule = async (moduleId: string) => {
    await client.deleteModule(moduleId);
    dispatch(setModules(modules.filter((m: any) => m._id !== moduleId)));
  };

  // UPDATE MODULE
  const onUpdateModule = async (module: any) => {
    await client.updateModule(module);
    dispatch(
      setModules(
        modules.map((m: any) => (m._id === module._id ? module : m))
      )
    );
  };

  return (
    <div>
      <ModulesControls
        moduleName={moduleName}
        setModuleName={setModuleName}
        addModule={onCreateModule}
      />

      <ListGroup className="rounded-0 mt-4" id="wd-modules">
        {modules.map((module: any) => (
          <ListGroupItem key={module._id} className="p-0 mb-4 fs-5">
            <div className="p-3 bg-secondary d-flex justify-content-between">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2" />

                {!module.editing && module.name}

                {module.editing && (
                  <FormControl
                    className="w-50 d-inline-block"
                    defaultValue={module.name}
                    onChange={(e) =>
                      dispatch(
                        setModules(
                          modules.map((m) =>
                            m._id === module._id
                              ? { ...m, name: e.target.value }
                              : m
                          )
                        )
                      )
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        onUpdateModule({ ...module, editing: false });
                      }
                    }}
                  />
                )}
              </div>

              <ModuleControlButtons
                moduleId={module._id}
                deleteModule={onRemoveModule}
                editModule={() => dispatch(editModule(module._id))}
              />
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}
