import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

const RejectPage = () => {
    const { formId } = useParams();
    const [searchParams] = useSearchParams();
    const role = searchParams.get("role"); // Get role from query params
    const [message, setMessage] = useState("Rejecting leave request...");

    useEffect(() => {
        const rejectLeaveForm = async () => {
            if (!role || !["HOD", "Rector-Warden"].includes(role)) {
                setMessage("Invalid rejection request. Role not specified correctly.");
                return;
            }

            try {
                const response = await fetch(`http://localhost:5001/api/reject/${formId}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ role }), // Send role in request body
                });

                const data = await response.json();
                if (response.ok) {
                    setMessage(`Leave request rejected successfully by ${role}.`);
                } else {
                    setMessage(data.message || "Failed to reject leave request.");
                }
            } catch (error) {
                console.error("Error rejecting form:", error);
                setMessage("An error occurred while rejecting the leave request.");
            }
        };

        if (formId) rejectLeaveForm();
    }, [formId, role]);

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2>{message}</h2>
            <a href="/">Go back to home</a>
        </div>
    );
};

export default RejectPage;
