require("dotenv").config();
const connectDb = require('./utils/db');
const cors = require('cors');
const express = require("express");
const app = express(); 
const auth_router = require("./routes/auth_router");
const student_router = require("./routes/students_router");
const login_router = require("./routes/login_router");
const rectorRoutes = require("./routes/rectorRoutes");
// const userRoutes = require("./routes/userRoutes");
const path = require('path');

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
app.use("/api/login", login_router);
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/auth", rectorRoutes);
connectDb().then(() => {

const PORT = 5000;

    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
});
