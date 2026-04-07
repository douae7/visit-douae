const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

const FILE = path.join(__dirname, "visits.json");

function readCounter() {
    if (!fs.existsSync(FILE)) {
        fs.writeFileSync(FILE, JSON.stringify({ count: 0 }));
    }
    return JSON.parse(fs.readFileSync(FILE)).count;
}

function writeCounter(count) {
    fs.writeFileSync(FILE, JSON.stringify({ count }));
}

app.get("/", (req, res) => {
    let count = readCounter();
    count++;
    writeCounter(count);

    res.send(`Nombre de visites : ${count}`);
});

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});