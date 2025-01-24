require("dotenv").config();
const connectDb = require('./utils/db');
const cors = require('cors');
const express = require("express");
const authRoutes = require("./routes/auth");
const path = require('path');

const app = express(); 
const PORT = 5001;
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/auth", authRoutes);

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
});
