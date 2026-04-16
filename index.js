const path = require("path");

app.set("views", path.join(__dirname, "views"));

const express = require('express');
const app = express();
const path = require("path");
const fs = require("fs");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// HOME
app.get("/", function(req, res){
    fs.readdir(path.join(__dirname, "files"), function(err, files){
        if(err){
            return res.send("Error");
        }
        res.render("index", { files });
    });
});

// CREATE
app.post("/create", function(req, res){
    const title = req.body.title.trim();
    const details = req.body.details;

    const filePath = path.join(__dirname, "files", title + ".txt");

    fs.writeFile(filePath, details || "", function(){
        res.redirect("/");
    });
});

// READ
app.get("/file/:filename", function(req, res){
    const filePath = path.join(__dirname, "files", req.params.filename);

    fs.readFile(filePath, "utf-8", function(err, data){
        res.render("read", { fileName: req.params.filename, data });
    });
});

// EDIT PAGE
app.get("/edit/:filename", function(req, res){
    const filePath = path.join(__dirname, "files", req.params.filename);

    fs.readFile(filePath, "utf-8", function(err, data){
        res.render("edit", { fileName: req.params.filename, data });
    });
});

// UPDATE
app.post("/update/:filename", function(req, res){
    const filePath = path.join(__dirname, "files", req.params.filename);

    fs.writeFile(filePath, req.body.details, function(){
        res.redirect("/file/" + req.params.filename);
    });
});

app.listen(3000, () => console.log("server running"));