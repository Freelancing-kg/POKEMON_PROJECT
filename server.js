const express = require("express");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(__dirname));

// Home page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Home details page
app.get("/home", (req, res) => {
    res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/error",(req, res)=>{
    res.status(404).sendFile(path.join(__dirname, "error.html"));
})
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});