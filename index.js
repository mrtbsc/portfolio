const express = require("express");
const app = express();

// to be able to set realtive paths
const path = require("path");

// to be able to convert .md to html
const markdown = require("markdown-js");
const fs = require("fs");

// associate a templating engine to "res.render()"
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/")); // configure where to get the templates

// configure where to get static files
app.use(express.static(path.join(__dirname, "public")));

const projects = require("./projectsInfo");

/** ROUTES  **/

app.use("/markdown", (req, res) => {
  const str = fs.readFileSync("test.md", "utf8");
  const result = markdown.makeHtml(str);
  res.send(result);
});

app.use("/", (req, res) => {
  //   res.sendFile("index.html");
  const str = fs.readFileSync("test.md", "utf8");
  const readme = markdown.makeHtml(str);
  console.log(readme);
  res.render("index.ejs", { projects, readme });
});

// We start the server (start to listen for requests)
app.listen(3000, () => {
  console.log("LISTENING ON PORT 3000");
});
