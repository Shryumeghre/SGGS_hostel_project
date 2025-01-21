require("dotenv").config();
const connectDb = require('./utils/db');
const express = require("express");
const app = express(); 

const PORT = 5001;

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
});
