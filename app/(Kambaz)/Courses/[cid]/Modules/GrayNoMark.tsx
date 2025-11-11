import { FaBan, FaCircle } from "react-icons/fa";

export default function GrayNoMark() {
  return (
    <span className="me-1 position-relative">
      <FaBan
        className="text-secondary position-absolute fs-5"
        style={{ top: "2px" }}
      />
      <FaCircle className="text-white fs-6" />
    </span>
  );
}