"use client";
import { FormLabel, Row, Col, FormControl, FormSelect, FormCheck, Button } from "react-bootstrap";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/kambaz/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import * as client from "../../../client"; 
import { addAssignment, updateAssignment } from "../reducer";

interface AssignmentFormData {
    _id: string;
    course: string;
    title: string;
    description: string;
    points: number;
    assignmentGroup: string;
    displayGradeAs: string;
    submissionType: string;
    dueDate: string;
    availableFrom: string;
    availableUntil: string;
    textEntry: boolean;
    websiteUrl: boolean;
    mediaRecordings: boolean;
    studentAnnotation: boolean;
    fileUploads: boolean;
}

export default function AssignmentEditor() {
    const { cid, aid } = useParams();
    const isNew = aid === "new";
    const router = useRouter();
    const dispatch = useDispatch();

    const courseId = Array.isArray(cid) ? cid[0] : cid;
    if (!courseId) {
        throw new Error("Course ID is missing from URL");
    }

    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    const isFaculty = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState<AssignmentFormData>({
        _id: "",
        course: courseId,
        title: "",
        description: "",
        points: 100,
        assignmentGroup: "ASSIGNMENTS",
        displayGradeAs: "Percentage",
        submissionType: "Online",
        dueDate: "",
        availableFrom: "",
        availableUntil: "",
        textEntry: false,
        websiteUrl: true,
        mediaRecordings: false,
        studentAnnotation: false,
        fileUploads: false,
    });

    useEffect(() => {
        const loadAssignment = async () => {
            if (!isNew && aid) {
                try {
                    const assignment = await client.findAssignmentById(aid as string);
                    setFormData((currentFormData) => ({
                        ...currentFormData,
                        ...assignment,
                    }));
                } catch (error) {
                    console.error("Failed to load assignment:", error);
                    alert("Failed to load assignment");
                }
            }
            setLoading(false);
        };
        loadAssignment();
    }, [aid, isNew]);

    useEffect(() => {
        if (currentUser && !isFaculty) {
            alert("Only faculty can create or edit assignments");
            router.push(`/kambaz/Courses/${cid}/assignments`);
        }
    }, [currentUser, isFaculty, cid, router]);

    const handleSave = async () => {
        if (!cid) return;
        try {
            if (isNew) {
                const newAssignment = await client.createAssignmentForCourse(courseId, { ...formData, course: courseId });
                dispatch(addAssignment(newAssignment));
                alert("Assignment created successfully!");
            } else {
                const updatedAssignment = await client.updateAssignment({ ...formData });
                dispatch(updateAssignment(updatedAssignment));
                alert("Assignment updated successfully!");
            }
            router.push(`/kambaz/Courses/${cid}/assignments`);
        } catch (err) {
            alert(`Failed to ${isNew ? 'create' : 'update'} assignment. Please try again.`);
            console.error(err);
        }
    };

    if (loading) {
        return <div>Loading assignment...</div>;
    }

    if (!isFaculty) {
        return <div className="alert alert-danger">Access Denied: Only faculty can edit assignments</div>;
    }

    return (
        <div id="wd-assignment-editor">
            <Row className="mb-3">
                <FormLabel>Assignment Name</FormLabel>
                <Col style={{ maxWidth: "50%" }}>
                    <FormControl 
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                </Col>
            </Row>

            <Row className="mb-3">
                <Col style={{ maxWidth: "50%" }}>
                    <FormControl
                        as="textarea"
                        rows={8}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                </Col>
            </Row>

            <Row className="mb-3">
                <FormLabel className="col-2 text-end">Points</FormLabel>
                <Col className="col-8">
                    <FormControl
                        type="number"
                        value={formData.points}
                        onChange={(e) => setFormData({ ...formData, points: Number(e.target.value) })}
                        style={{ maxWidth: "49%" }}
                    />
                </Col>
            </Row>

            <Row className="mb-3">
                <FormLabel className="col-2 text-end">Assignment Group</FormLabel>
                <Col className="col-8">
                    <FormSelect
                        value={formData.assignmentGroup}
                        onChange={(e) => setFormData({ ...formData, assignmentGroup: e.target.value })}
                        style={{ maxWidth: "49%" }}
                    >
                        <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                        <option value="QUIZZES">QUIZZES</option>
                        <option value="EXAMS">EXAMS</option>
                        <option value="PROJECTS">PROJECTS</option>
                    </FormSelect>
                </Col>
            </Row>

            <Row className="mb-3">
                <FormLabel className="col-2 text-end">Display Grade as</FormLabel>
                <Col className="col-8">
                    <FormSelect
                        value={formData.displayGradeAs}
                        onChange={(e) => setFormData({ ...formData, displayGradeAs: e.target.value })}
                        style={{ maxWidth: "49%" }}
                    >
                        <option value="Percentage">Percentage</option>
                        <option value="Points">Points</option>
                    </FormSelect>
                </Col>
            </Row>

            <Row className="mb-3">
                <FormLabel className="col-2 text-end">Submission Type</FormLabel>
                <Col className="col-8">
                    <div className="border p-3" style={{ maxWidth: "49%" }}>
                        <FormSelect
                            value={formData.submissionType}
                            onChange={(e) => setFormData({ ...formData, submissionType: e.target.value })}
                            className="mb-3"
                        >
                            <option value="Online">Online</option>
                            <option value="Offline">Offline</option>
                        </FormSelect>

                        <div>
                            <strong>Online Entry Options</strong>
                            <FormCheck
                                type="checkbox"
                                label="Text Entry"
                                className="mt-2"
                                checked={formData.textEntry}
                                onChange={(e) => setFormData({ ...formData, textEntry: e.target.checked })}
                            />
                            <FormCheck
                                type="checkbox"
                                label="Website URL"
                                checked={formData.websiteUrl}
                                onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.checked })}
                            />
                            <FormCheck
                                type="checkbox"
                                label="Media Recordings"
                                checked={formData.mediaRecordings}
                                onChange={(e) => setFormData({ ...formData, mediaRecordings: e.target.checked })}
                            />
                            <FormCheck
                                type="checkbox"
                                label="Student Annotation"
                                checked={formData.studentAnnotation}
                                onChange={(e) => setFormData({ ...formData, studentAnnotation: e.target.checked })}
                            />
                            <FormCheck
                                type="checkbox"
                                label="File Uploads"
                                checked={formData.fileUploads}
                                onChange={(e) => setFormData({ ...formData, fileUploads: e.target.checked })}
                            />
                        </div>
                    </div>
                </Col>
            </Row>

            <Row className="mb-3">
                <FormLabel className="col-2 text-end">Due Date</FormLabel>
                <Col className="col-8">
                    <FormControl
                        type="date"
                        value={formData.dueDate}
                        onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                        style={{ maxWidth: "49%" }}
                    />
                </Col>
            </Row>

            <Row className="mb-3">
                <FormLabel className="col-2 text-end">Available From</FormLabel>
                <Col className="col-8">
                    <FormControl
                        type="date"
                        value={formData.availableFrom}
                        onChange={(e) => setFormData({ ...formData, availableFrom: e.target.value })}
                        style={{ maxWidth: "49%" }}
                    />
                </Col>
            </Row>

            <Row className="mb-3">
                <FormLabel className="col-2 text-end">Available Until</FormLabel>
                <Col className="col-8">
                    <FormControl
                        type="date"
                        value={formData.availableUntil}
                        onChange={(e) => setFormData({ ...formData, availableUntil: e.target.value })}
                        style={{ maxWidth: "49%" }}
                    />
                </Col>
            </Row>

            <hr />

            <div className="float-end">
                <Button variant="secondary" className="me-2" onClick={() => router.push(`/kambaz/Courses/${cid}/assignments`)}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={handleSave}>
                    Save
                </Button>
            </div>
        </div>
    );
}