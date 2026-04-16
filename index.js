const express = require('express');
const app = express();
const path = require("path");
const fs = require("fs");

const PORT = process.env.PORT || 3000;

// MIDDLEWARE
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// HOME
app.get("/", function(req, res){
    const dirPath = path.join(__dirname, "files");

    fs.readdir(dirPath, function(err, files){
        if(err){
            return res.send("Error reading files: " + err.message);
        }
        res.render("index", { files });
    });
});

// CREATE
app.post("/create", function(req, res){
    const title = req.body.title.trim();
    const details = req.body.details;

    const filePath = path.join(__dirname, "files", title + ".txt");

    fs.writeFile(filePath, details || "", function(err){
        if(err) return res.send(err.message);
        res.redirect("/");
    });
});

// READ
app.get("/file/:filename", function(req, res){
    const filePath = path.join(__dirname, "files", req.params.filename);

    fs.readFile(filePath, "utf-8", function(err, data){
        if(err) return res.send(err.message);
        res.render("read", { fileName: req.params.filename, data });
    });
});

// EDIT PAGE
app.get("/edit/:filename", function(req, res){
    const filePath = path.join(__dirname, "files", req.params.filename);

    fs.readFile(filePath, "utf-8", function(err, data){
        if(err) return res.send(err.message);
        res.render("edit", { fileName: req.params.filename, data });
    });
});

// UPDATE
app.post("/update/:filename", function(req, res){
    const filePath = path.join(__dirname, "files", req.params.filename);

    fs.writeFile(filePath, req.body.details, function(err){
        if(err) return res.send(err.message);
        res.redirect("/file/" + req.params.filename);
    });
});

// START SERVER
app.listen(PORT, () => console.log("Server running on port " + PORT));