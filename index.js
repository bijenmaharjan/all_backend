const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');




app.get("/", (req, res) => {
  fs.readdir(`./files`, (err, file) => {
    res.render("index", { files: file });

  })

});
app.post("/create", (req, res) => {
  fs.writeFile(`./files/${req.body.title.split(' ').join(' ')}.txt`, req.body.details, (err) => {

    res.redirect("/");
  })

})


app.get("/file/:filename", (req, res) => {
  fs.readFile(`./files/${req.params.filename}`, "utf-8", (err, filedata) => {
    res.render('show', { filename: req.params.filename, filedata: filedata });

  })
})

app.get('/edit/:filename', (req, res) => {
  res.render('edit', { filename: req.params.filename });
})
app.post('/edit', (req, res) => {
  fs.rename(`./files/${req.body.previous}`, `./files/${req.body.new}`, (req, res) => {
    res.redirect("/");
  })
})


app.get("/profile/:username", (req, res) => {
  res.send(`welcome,${req.params.username}`);
});

app.get("/profile/:username/:age", (req, res) => {
  res.send(`welcome,${req.params.username} of age ${req.params.age}`);
});





app.listen(3000);