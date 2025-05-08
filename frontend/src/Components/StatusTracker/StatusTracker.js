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

  const normalizedStatus = status.toLowerCase();
  
  const getFilteredSteps = (status) => {
    if (status === "accepted by hod") {
      return ["Pending", "Accepted by HOD" , "Leave Granted"];
    } else if (status === "rejected by hod") {
      return ["Pending", "Rejected by HOD"];
    } else if (status === "leave granted") {
      return ["Pending", "Accepted by HOD", "Leave Granted"];
    } else if (status === "rejected by rector-warden") {
      return ["Pending", "Accepted by HOD", "Rejected by Rector-Warden"];
    } else {
      return ["Pending","Accepted by HOD","Leave Granted"];
    }
  };
  const filteredSteps = getFilteredSteps(normalizedStatus);
  const activeStep = filteredSteps.findIndex(step => step.toLowerCase() === normalizedStatus);

  return (
    <Box sx={{ width: "100%", textAlign: "center", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Leave Form Status
      </Typography>

      {activeStep !== -1 ? (
        <Stepper alternativeLabel activeStep={activeStep}>
          {filteredSteps.map((label, index) => {
            let labelColor = "gray";
            if (index < activeStep) {
              labelColor = "green"; // Completed steps
            } else if (index === activeStep) {
              labelColor = status.toLowerCase().includes("rejected") ? "red" : "green"; // Current step
            }

            return (
              <Step key={label}>
                <StepLabel
                  sx={{
                    "& .MuiStepLabel-label": {
                      color: labelColor,
                    },
                    "& .MuiStepConnector-line": {
                      borderColor: labelColor,
                    },
                  }}
                >
                  {label}
                </StepLabel>
              </Step>
            );
          })}
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
