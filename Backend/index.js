require("dotenv").config();
const connectDb = require('./utils/db');
const cors = require('cors');
const express = require("express");
const http = require('http');
const socketIo = require('socket.io');
const app = express(); 
const server = http.createServer(app);
const auth_router = require("./routes/auth_router");
const student_router = require("./routes/students_router");
const login_router = require("./routes/login_router");
const rectorRoutes = require("./routes/rectorRoutes");
const io = socketIo(server); 

const leaveForm = require("./routes/leaveForm_router");
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
app.use("/api", leaveForm);
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/auth", rectorRoutes);

io.on('connection', (socket) => {
    console.log('a user connected');
  
    socket.on('statusChanged', (applicationId) => {
      LeaveApplication.findById(applicationId, (err, application) => {
        if (err) return console.log(err);
        io.emit('statusUpdate', application);  // Emit status update to all connected clients
      });
    });
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
connectDb().then(() => {

const PORT = 5001;

    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
});
