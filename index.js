var express = require('express');
var cors = require('cors');
require('dotenv').config()
var multer = require('multer');
var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

const storage = multer.diskStorage({
  destination: (req,file,cb) => {
    cb(null, './uploads');
  },
  filename: (req,file,cb)=>{
    cb(null,file.originalname);
  }
});

const upload = multer({storage});

app.post("/api/fileanalyse", upload.single('upfile'), (req,res)=>{
  if (req.file){
    res.json({
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size
    })
  } else {
    res.json({error: 'File not uploaded'});
  }
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
