"use client";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import { ListGroup, ListGroupItem } from "react-bootstrap";

export default function ArrayStateVariable() {
  // Local array state (same as before)
  const [array, setArray] = useState<number[]>([1, 2, 3, 4, 5]);

  const addElement = () => {
    setArray([...array, Math.floor(Math.random() * 100)]);
  };

  const deleteElement = (index: number) => {
    setArray(array.filter((_, i) => i !== index));
  };

  // ✅ Global Redux todos
  const { todos } = useSelector((state: RootState) => state.todosReducer);

  return (
    <div id="wd-array-state-variables" className="mb-3">
      <h2>Array State Variables</h2>

      {/* Local Array Section */}
      <button className="btn btn-success mb-2" onClick={addElement}>
        Add Element
      </button>

      <ul className="list-group">
        {array.map((item, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {item}
            <button
              className="btn btn-danger btn-sm"
              onClick={() => deleteElement(index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

    </div>
  );
}