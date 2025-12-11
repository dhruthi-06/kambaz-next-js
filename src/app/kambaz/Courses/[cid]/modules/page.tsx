"use client";

import { ListGroup, ListGroupItem, FormControl } from "react-bootstrap";
import { useParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import ModulesControls from "./ModulesControls";
import { BsGripVertical } from "react-icons/bs";
import LessonControlButtons from "./LessonControlButtons";
import ModulesControlsButton from "./ModuleControlsButton";
import { setModule } from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import * as client from "../../client";

interface Lesson {
  _id: string;
  name: string;
}

interface ModuleType {
  _id: string;
  name: string;
  description?: string;
  course: string;
  editing?: boolean;
  lessons?: Lesson[];
}

export default function Modules() {
  const params = useParams();
  const cid = Array.isArray(params.cid) ? params.cid[0] : params.cid;
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const { modules, loading, error } = useSelector((state: RootState) => state.modulesReducer);

  const [moduleName, setModuleName] = useState("");
  const [editingValues, setEditingValues] = useState<Record<string, string>>({});

  const isFaculty = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  const fetchModules = useCallback(async () => {
    if (!cid) return;
    try {
      const fetchedModules: ModuleType[] = await client.findModulesForCourse(cid);
      dispatch(setModule(fetchedModules));
    } catch (err) {
      console.error("Error fetching modules:", err);
    }
  }, [cid, dispatch]);

  useEffect(() => {
    fetchModules();
  }, [fetchModules]);

  const onCreateModuleForCourse = async () => {
    if (!cid || !moduleName.trim()) return;

    const newModule = { name: moduleName.trim(), description: "", course: cid };

    try {
      const created: ModuleType = await client.createModuleForCourse(cid, newModule);
      dispatch(setModule([...modules, created]));
      setModuleName("");
    } catch (err) {
      console.error("Create module error:", err);
      alert("Failed to create module");
    }
  };

  const onRemoveModule = async (moduleId: string) => {
    try {
      await client.deleteModule(cid!, moduleId);
      dispatch(setModule(modules.filter((m) => m._id !== moduleId)));
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete module");
    }
  };

  const handleEditModule = useCallback(
    (moduleId: string) => {
      const updatedModules = modules.map((m) =>
        m._id === moduleId ? { ...m, editing: true } : { ...m, editing: false }
      );
      dispatch(setModule(updatedModules));
    },
    [modules, dispatch]
  );

  const onUpdateModule = useCallback(
    async (moduleId: string) => {
      const newName = editingValues[moduleId];
      if (!newName) return;

      const foundModule = modules.find((m) => m._id === moduleId);
      if (!foundModule) {
        alert("Update failed: Module not found!");
        return;
      }

      const body = {
        name: newName.trim(),
        description: foundModule.description || "",
        course: foundModule.course,
      };

      try {
        const updated: ModuleType = await client.updateModule(cid!, moduleId, body);
        const updatedModules = modules.map((m) =>
          m._id === moduleId ? { ...m, ...updated, editing: false } : m
        );
        dispatch(setModule(updatedModules));

        setEditingValues((prev) => {
          const newValues = { ...prev };
          delete newValues[moduleId];
          return newValues;
        });
      } catch (err) {
        console.error("Update error:", err);
        alert("Failed to update module");
      }
    },
    [modules, cid, dispatch, editingValues]
  );

  if (!cid) return <div className="text-center p-5">Invalid course ID</div>;

  return (
    <div>
      {loading && modules.length === 0 && <div className="text-center p-5">Loading modules...</div>}
      {error && <div className="alert alert-danger">Error: {error}</div>}

      <ListGroup id="wd-modules" className="rounded-0">
        {isFaculty && (
          <ModulesControls setModuleName={setModuleName} moduleName={moduleName} addModule={onCreateModuleForCourse} />
        )}

        {modules.length > 0 ? (
          modules.map((moduleItem) => {
            const moduleId = moduleItem._id;

            return (
              <ListGroupItem key={moduleId} className="wd-module p-0 mb-5 fs-5 border-gray">
                <div className="wd-title p-3 ps-2 bg-secondary">
                  <BsGripVertical className="me-2 fs-3" />
                  {!moduleItem.editing && moduleItem.name}

                  {moduleItem.editing && isFaculty && (
                    <FormControl
                      className="w-50 d-inline-block"
                      autoFocus
                      defaultValue={moduleItem.name}
                      onChange={(e) => setEditingValues((prev) => ({ ...prev, [moduleId]: e.target.value }))}
                      onKeyDown={(e) => e.key === "Enter" && onUpdateModule(moduleId)}
                    />
                  )}

                  {isFaculty && (
                    <ModulesControlsButton
                      moduleId={moduleId}
                      deleteModule={onRemoveModule}
                      editModule={() => handleEditModule(moduleId)}
                    />
                  )}
                </div>

               {moduleItem.lessons && moduleItem.lessons.length > 0 && (
                <ListGroup className="wd-lessons rounded-0">
                  {moduleItem.lessons.map((lesson) => {
                    const lessonId = lesson._id;
                    return (
                      <ListGroupItem key={lessonId} className="wd-lesson p-3 ps-1">
                        <BsGripVertical className="me-2 fs-3" />
                        {lesson.name}
                        {isFaculty && <LessonControlButtons />}
                      </ListGroupItem>
                    );
                  })}
                </ListGroup>
                )}
              </ListGroupItem>
            );
          })
        ) : (
          <ListGroupItem className="text-center p-4 text-muted">
            No modules yet. Click &quot;Add Module&quot; to create one.
          </ListGroupItem>
        )}
      </ListGroup>
    </div>
  );
}
