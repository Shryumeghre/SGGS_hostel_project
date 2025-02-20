import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Stepper, Step, StepLabel, Typography, Box } from "@mui/material";

const StatusTracker = () => {
  const [status, setStatus] = useState("pending"); 
  const { formId } = useParams();  

  useEffect(() => {
    const token = localStorage.getItem("token");  
    const fetchStatus = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/statuses/${formId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch status");
        }

        const data = await response.json();
        if (data.status) {
          setStatus(data.status);  
        }
      } catch (error) {
        console.error("Error fetching status:", error);
      }
    };

    if (formId) {
      fetchStatus();
    }
  }, [formId]);

  const steps = [
    "Pending",
    "Accepted by HOD",
    "Rejected by HOD",
    "Leave Granted",
    "Rejected by Rector-Warden"
  ];

 
  const statusIndexMap = {
    "pending": 0,
    "accepted by HOD": 1,
    "Rejected by HOD": 2,
    "leave granted": 3,
    "Rejected by Rector-Warden": 4
  };

  const statusIndex = statusIndexMap[status] ?? -1;  

  return (
    <Box sx={{ width: "100%", textAlign: "center", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Leave Form Status
      </Typography>

      {statusIndex !== -1 ? (
        <Stepper alternativeLabel>
          {steps.map((label, index) => (
            <Step key={label} active={index <= statusIndex}>
              <StepLabel
                sx={{
                  "& .MuiStepLabel-label": {
                    color:
                      index < statusIndex
                        ? "green"  // Completed steps in green
                        : index === statusIndex
                        ? status.includes("Rejected")
                          ? "red"  // Rejected step in red
                          : "green"  // Current accepted step in green
                        : "gray", // Future steps in gray
                  },
                  "& .MuiStepConnector-line": {
                    borderColor:
                      index < statusIndex
                        ? "green"  // Green line for completed steps
                        : index === statusIndex
                        ? status.includes("Rejected")
                          ? "red"  // Red line if rejected
                          : "green"  // Green line if accepted
                        : "gray", // Gray for pending steps
                  },
                }}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      ) : (
        <Typography variant="body1" color="error">
          No status found for this user.
        </Typography>
      )}
    </Box>
  );
};

export default StatusTracker;
