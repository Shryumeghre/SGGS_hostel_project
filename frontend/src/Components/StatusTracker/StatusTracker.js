import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Stepper, Step, StepLabel, Typography, Box } from "@mui/material";

const StatusTracker = () => {
  const [status, setStatus] = useState("pending");
  const { formId } = useParams();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchStatus = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/statuses/${formId}`,{
          headers: {
            Authorization: `Bearer ${token}` // Pass the token in the request header
          }   
        }); // Fetch user's status
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
  }, []);

  const steps = ["Pending", "Accepted by HOD", "Leave Granted", "Rejected"];
  const statusIndex = steps.indexOf(status);

  return (
    <Box sx={{ width: "100%", textAlign: "center", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Leave Form Status
      </Typography>
      {statusIndex !== -1 ? (
        <Stepper activeStep={statusIndex} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel
                sx={{
                  "& .MuiStepLabel-label": {
                    color: index <= statusIndex ? "green" : "gray",
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
