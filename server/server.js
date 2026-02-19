const express = require("express");
const app = express();
const db = require("./database.js");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const PORT = 3000;

// Get all articles
app.get("/api/articles", (req, res, next) => {
    let sql = "SELECT * FROM articles WHERE 1=1";
    let params = [];

    // Filter by name (partial match)
    if (req.query.search) {
        sql += " AND name LIKE ?";
        params.push('%' + req.query.search + '%');
    }

    // Filter by category
    if (req.query.category) {
        sql += " AND category = ?";
        params.push(req.query.category);
    }

    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        });
    });
});

// Get article by ID
app.get("/api/articles/:id", (req, res, next) => {
    const sql = "select * from articles where id = ?";
    const params = [req.params.id];
    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": row
        });
    });
});

// Default response for any other request
app.use(function (req, res) {
    res.status(404);
});

// Export app for serverless
module.exports = app;

// Only listen if run directly
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}
