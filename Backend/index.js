require("dotenv").config();
const connectDb = require('./utils/db');
const express = require("express");
const cors = require("cors");
const app = express(); 
const auth_router = require("./routes/auth_router");
const student_router = require("./routes/students_router");
const login_router = require("./routes/login_router");

const corsOptions = {
    origin: "*", // Allow all origins for debugging
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", auth_router);
app.use("/api/student", student_router);
app.use("/api", login_router);

const PORT = 5001;
connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
});
