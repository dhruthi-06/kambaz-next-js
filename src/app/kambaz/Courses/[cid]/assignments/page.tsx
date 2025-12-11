"use client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { ListGroup, ListGroupItem, Button, FormControl } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import LessonControlButtons from "../modules/LessonControlButtons";
import { FaEllipsisV, FaPlus, FaSearch } from "react-icons/fa";
import { SlBookOpen } from "react-icons/sl";
import { useSelector } from "react-redux";
import { RootState } from "@/app/kambaz/store";
import * as client from "../../client";

interface Assignment {
    _id?: string;
    title: string;
    availableFrom: string;
    dueDate: string;
    points: number;
}

export default function AssignmentsPage() {
    const { cid } = useParams();
    const courseid = cid as string;
    const router = useRouter();

    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [loading, setLoading] = useState(true);

    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    const isFaculty = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

    const loadAssignments = useCallback(async () => {
        try {
            setLoading(true);
            const data = await client.findAssignmentsForCourse(courseid);
            console.log("Fetched assignments:", data);
            setAssignments(data);
        } catch (error) {
            console.error("Failed to fetch assignments:", error);
        } finally {
            setLoading(false);
        }
    }, [courseid]);

    useEffect(() => {
        if (courseid) {
            loadAssignments();
        }
    }, [courseid, loadAssignments]);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this assignment?")) return;

        try {
            await client.deleteAssignment(id);
            loadAssignments();
        } catch (error) {
            console.error("Failed to delete assignment:", error);
            alert("Failed to delete assignment");
        }
    };

    const firstAssignmentId = assignments.length > 0 ? assignments[0]._id : null;

    if (loading) 
        return <div>Loading assignments...</div>;
    
    return (
        <div>
            <div className="d-flex align-items-center gap-2 mb-3">
                <div className="position-relative" style={{width: "300px"}}>
                    <FaSearch className="position-absolute" style={{left: "10px", top: "50%", transform: "translateY(-50%)", color: "#999"}} />
                    <FormControl type="text" placeholder="Search..." style={{paddingLeft: "35px"}} />
                </div>
                
                {isFaculty && (
                    <div className="ms-auto gap-2 mb-3 d-flex">
                        <Button variant="secondary" size="sm" id="wd-add-group-btn" className="text-nowrap">
                            <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                            Group
                        </Button>
                        <Button 
                            variant="danger" 
                            size="sm" 
                            onClick={() => router.push(`/kambaz/Courses/${cid}/assignments/new`)} 
                            id="wd-add-assignment-btn" 
                            className="text-nowrap"
                        >
                            <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                            Assignment
                        </Button>
                    </div>
                )}
            </div>
            
            <ListGroup className="rounded-0" id="wd-assignments">                
                <ListGroupItem className="wd-module p-0 mb-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary">
                        <BsGripVertical className="me-2 fs-5"/> Assignments 
                        <div className="d-flex align-items-center float-end">
                            <span className="text-gray bg-transparent rounded-pill px-3 py-1 me-2" style={{ fontSize: "0.9rem" }}>
                                40% of Total
                            </span>
                            {isFaculty && (
                                <>
                                    <Button variant="link" size="sm" className="me-1 p-0">
                                        <FaPlus color="#F5F5F5" />
                                    </Button>
                                    <Button variant="link" size="sm" className="p-0">
                                        <FaEllipsisV color="#F5F5F5" />
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>  
                    
                    {assignments.length === 0 ? (
                        <ListGroupItem className="text-center p-4 text-muted">
                            No assignments yet. Click &quot;Assignment&quot; to create one.
                        </ListGroupItem>
                    ) : (
                        assignments.map((assignment: Assignment) => (
                            <ListGroupItem key={assignment._id} className="wd-lesson p-3 ps-6">
                                <div className="d-flex align-items-start">
                                    <BsGripVertical className="me-2 fs-5"/>
                                    <SlBookOpen className="me-2 fs-5 text-success"/>
                                    <div className="flex-fill">
                                        <Link 
                                            href={`/kambaz/Courses/${cid}/assignments/${assignment._id}`} 
                                            className="wd-assignment-link"
                                        >
                                            {assignment.title}
                                        </Link>
                                        
                                        {isFaculty && (
                                            <>
                                                <LessonControlButtons/>
                                                <Button 
                                                    variant="link" 
                                                    className="text-danger ms-2 p-0" 
                                                    onClick={() => handleDelete(assignment._id!)}
                                                >
                                                    Delete
                                                </Button>
                                            </>
                                        )}
                                        
                                        <p className="small mb-0">
                                            <span className="text-danger">Multiple Modules </span>
                                            | Not available until {assignment.availableFrom} at 00:00 |
                                        </p>                      
                                        <p>
                                            Due {assignment.dueDate} 23:59 | -/{assignment.points} pts
                                        </p>
                                    </div>
                                </div>
                            </ListGroupItem>
                        ))
                    )}
                </ListGroupItem>                
            
                <ListGroupItem className="wd-module p-0 mb-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary">
                        <BsGripVertical className="me-2 fs-5"/> Quizzes
                        {isFaculty && (
                            <span className="float-end">
                                <Button variant="link" size="sm" className="me-1">
                                    <FaPlus color="#F5F5F5"/>
                                </Button>
                                <Button variant="link" size="sm">
                                    <FaEllipsisV color="#F5F5F5" />
                                </Button>
                            </span>
                        )}
                    </div>
                    <ListGroupItem className="wd-lesson p-3 ps-6">
                        <div className="d-flex align-items-start">
                            <BsGripVertical className="me-2 fs-5"/>
                            <SlBookOpen className="me-2 fs-5 text-success"/>
                            <div className="flex-fill">
                                {firstAssignmentId ? (
                                    <Link href={`/kambaz/Courses/${cid}/assignments/${firstAssignmentId}`} className="wd-quiz-link">Q1</Link>
                                ) : (
                                    <span className="text-muted">Q1</span>
                                )}
                                {isFaculty && <LessonControlButtons/>}
                                <p>Not available until 22 Sep at 0:00 | Due 29 Sep at 23:59 | -/29 pts</p>
                            </div>
                        </div>
                    </ListGroupItem>
                    <ListGroupItem className="wd-lesson p-3 ps-6">
                        <div className="d-flex align-items-start">
                            <BsGripVertical className="me-2 fs-5"/>
                            <SlBookOpen className="me-2 fs-5 text-success"/>
                            <div className="flex-fill">
                            {firstAssignmentId ? (
                                    <Link href={`/kambaz/Courses/${cid}/assignments/${firstAssignmentId}`} className="wd-quiz-link">Q2</Link>
                                ) : (
                                    <span className="text-muted">Q2</span>
                                )}
                                {isFaculty && <LessonControlButtons/>}
                                <p>Not available until 29 Sep at 0:00 | Due 06 Oct at 23:59 | -/29 pts</p>
                            </div>
                        </div>
                    </ListGroupItem>
                </ListGroupItem>
                
                <ListGroupItem className="wd-module p-0 mb-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary">
                        <BsGripVertical className="me-2 fs-5"/> Exams 
                        {isFaculty && (
                            <span className="float-end">
                                <Button variant="link" size="sm" className="me-1">
                                    <FaPlus color="#F5F5F5"/>
                                </Button>
                                <Button variant="link" size="sm">
                                    <FaEllipsisV color="#F5F5F5" />
                                </Button>
                            </span>
                        )}
                    </div>
                    <ListGroupItem className="wd-lesson p-3 ps-6">
                        <div className="d-flex align-items-start">
                            <BsGripVertical className="me-2 fs-5"/>
                            <SlBookOpen className="me-2 fs-5 text-success"/>
                            <div className="flex-fill">
                                {firstAssignmentId ? (
                                    <Link href={`/kambaz/Courses/${cid}/assignments/${firstAssignmentId}`} className="wd-exam-link">X1</Link>
                                ) : (
                                    <span className="text-muted">X1</span>
                                )}
                                {isFaculty && <LessonControlButtons/>}
                                <p>Due 3 Nov at 23:59 | -/100 pts</p>
                            </div>
                        </div>
                    </ListGroupItem>
                    <ListGroupItem className="wd-lesson p-3 ps-6">
                        <div className="d-flex align-items-start">
                            <BsGripVertical className="me-2 fs-5"/>
                            <SlBookOpen className="me-2 fs-5 text-success"/>
                            <div className="flex-fill">
                                {firstAssignmentId ? (
                                    <Link href={`/kambaz/Courses/${cid}/assignments/${firstAssignmentId}`} className="wd-exam-link">X2</Link>
                                ) : (
                                    <span className="text-muted">X2</span>
                                )}
                                {isFaculty && <LessonControlButtons/>}
                                <p>Due 7 Dec at 23:59 | -/100 pts</p>
                            </div>
                        </div>
                    </ListGroupItem>
                </ListGroupItem>
                
                <ListGroupItem className="wd-module p-0 mb-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary">
                        <BsGripVertical className="me-2 fs-5"/> Projects 
                        {isFaculty && (
                            <span className="float-end">
                                <Button variant="link" size="sm" className="me-1">
                                    <FaPlus color="#F5F5F5"/>
                                </Button>
                                <Button variant="link" size="sm">
                                    <FaEllipsisV color="#F5F5F5" />
                                </Button>
                            </span>
                        )}
                    </div>
                    <ListGroupItem className="wd-lesson p-3 ps-6">
                        <div className="d-flex align-items-start">
                            <BsGripVertical className="me-2 fs-5"/>
                            <SlBookOpen className="me-2 fs-5 text-success"/>
                            <div className="flex-fill">
                                {firstAssignmentId ? (
                                    <Link href={`/kambaz/Courses/${cid}/assignments/${firstAssignmentId}`} className="wd-project-link">
                                        Project - Kambaz Quizzes
                                    </Link>
                                ) : (
                                    <span className="text-muted">Project - Kambaz Quizzes</span>
                                )}
                                {isFaculty && <LessonControlButtons/>}
                                <p>Due 7 Dec at 23:59 | -/100 pts</p>
                            </div>
                        </div>
                    </ListGroupItem>
                    <ListGroupItem className="wd-lesson p-3 ps-6">
                        <div className="d-flex align-items-start">
                            <BsGripVertical className="me-2 fs-5"/>
                            <SlBookOpen className="me-2 fs-5 text-success"/>
                            <div className="flex-fill">
                                {firstAssignmentId ? (
                                    <Link href={`/kambaz/Courses/${cid}/assignments/${firstAssignmentId}`} className="wd-project-link">
                                        Project - Kambaz Piazza
                                    </Link>
                                ) : (
                                    <span className="text-muted">Project - Kambaz Piazza</span>
                                )}
                                {isFaculty && <LessonControlButtons/>}
                                <p>Due 7 Dec at 23:59 | -/100 pts</p>
                            </div>
                        </div>
                    </ListGroupItem>
                    <ListGroupItem className="wd-lesson p-3 ps-6">
                        <div className="d-flex align-items-start">
                            <BsGripVertical className="me-2 fs-5"/>
                            <SlBookOpen className="me-2 fs-5 text-success"/>
                            <div className="flex-fill">
                               {firstAssignmentId ? (
                                    <Link href={`/kambaz/Courses/${cid}/assignments/${firstAssignmentId}`} className="wd-project-link">
                                        Project - Kambaz Social Network
                                    </Link>
                                ) : (
                                    <span className="text-muted">Project - Kambaz Network</span>
                                )}
                                {isFaculty && <LessonControlButtons/>}
                                <p>Due 7 Dec at 23:59 | -/100 pts</p>
                            </div>
                        </div>
                    </ListGroupItem>
                </ListGroupItem>
            </ListGroup>
        </div>
    );
}