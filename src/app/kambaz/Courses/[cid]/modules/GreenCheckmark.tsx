import { FaCheckCircle, FaCircle } from "react-icons/fa";
export default function GreenCheckmark() {
  return (
    <span className="me-1 position-relative">
      <FaCheckCircle style={{ top: "1px" }} className="text-success me-1 position-absolute fs-6" />
      <FaCircle className="text-white me-1 mb-1"style={{fontSize: '0.75rem'}} />
    </span>
    );
}