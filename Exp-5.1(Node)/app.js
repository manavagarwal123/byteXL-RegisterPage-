const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
const mongoose = require('mongoose');  // <--- added
const app = express();

app.use(bodyParser.json());

// ✅ MongoDB connection
mongoose.connect("mongodb://localhost:27017/productsDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.error("❌ MongoDB connection failed:", err));

const routes = require('./routes'); // Import the routes

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/ping', (req, res) => {
    res.send('pong');
});

app.use('/api', routes); // Use the routes

const port = 3000;
app.listen(port, () => {
    console.log(`🚀 Server is running on port ${port}`);
});