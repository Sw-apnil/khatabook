const express = require('express');
const app = express();
app.set('view engine','ejs');

const path = require('path');
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static("public"));
const fs=require('fs');

app.get('/',(req,res)=>{
    fs.readdir("hisaab",(err,files)=>{
        if(err) return res.status(500).send(err);
        res.render('index',{files});
    });
});
app.get("/create", (req, res) => {
  res.render("create");
});


app.get("/edit/:filename",(req,res)=>{
    fs.readFile(`./hisaab/${req.params.filename}`,'utf-8',(err,data)=>{
        if(err) return res.status(500).send("Error reading file");
        res.render("edit",{filename:req.params.filename,data});
    });
});
app.post("/update/:filename",(req,res)=>{
    fs.writeFile(`./hisaab/${req.params.filename}`,req.body.content,(err)=>{
        if(err) return res.status(500).send("Error writing file");
        res.redirect("/");
    })
})
app.get("/view/:filename",(req,res)=>{
    fs.readFile(`./hisaab/${req.params.filename}`,'utf-8',(err,data)=>{
        if(err) return res.status(500).send("Error reading file");
        res.render("view",{filename:req.params.filename,data});
    })
})
app.post("/createhisaab", (req, res) => {
  const { title, content } = req.body;
  const currentDate = new Date();
  const date=`${currentDate.getDate()}-${currentDate.getMonth()+1}-${currentDate.getFullYear()}`;
  const fileData = `Title: ${title}\n\n${content}`;



  function getUniqueFilename(dir, baseName) {
  let filename = `${baseName}.txt`;
  let filePath = path.join(dir, filename);
  let count = 1;

  while (fs.existsSync(filePath)) {
    count++;
    filename = `${baseName}(${count}).txt`;
    filePath = path.join(dir, filename);
  }

  return filename;
}

const dir = path.join(__dirname, 'hisaab');

const filename = getUniqueFilename(dir,date);
const filePath = path.join(dir, filename);

  if (!title || !content) {
    return res.status(400).send("Title and content required");
  }
  fs.writeFile(filePath, fileData, (err) => {
    if (err) {
      return res.status(500).send("Error creating hisaab");
    }
    res.redirect("/");
  });
});

app.get("/delete/:filename",(req,res)=>{
    fs.unlink(`./hisaab/${req.params.filename}`,(err)=>{
        if(err) return res.status(500).send("Error deleting file");
        res.redirect("/");
    })
})

app.listen(3000,()=>{
    console.log('serve is running on localhost:3000');
})