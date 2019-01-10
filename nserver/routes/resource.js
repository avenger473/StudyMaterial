const express = require('express');
const router= express.Router();
const fileUpload = require('express-fileupload');
const path = require('path');
const app = express();
const mongo = require('mongoose');
const fs = require('fs');
const mkdirp = require('mkdirp');

const cors = require('cors');

app.use(cors());



var fileSchema = mongo.Schema({
  path: String,
  name: String
});

var Resource= mongo.model("Resource", fileSchema);

// default options
router.use(fileUpload({
  limits: { fileSize: 50*1024*1024},
  abortOnLimit: true,
  createParentPath: false
}));

//**************************************************************************File Request */
router.get('/get-files', (req,res)=>{
  console.log(req.query);
  var dir= path.join('/public/uploads',req.query.branch, req.query.sem, req.query.subject, req.query.material);
  dir= '.'+dir;
  console.log(dir);
  Resource.find({"path": dir},(err, data)=>{
    if(err) 
      throw err;
    console.log(data);
    
    var items= [];
        for(var i=0; i<data.length;i++)
          items.push({
            id: data[i]._id,
            name: data[i].name
          }) ;
        res.json(items);
     
  })
});

//*********************************************************File Download */
router.get('/download/:id', function (req, res) {
 
  console.log(req.params.id);
  Resource.findOne({_id: req.params.id}, (err,data)=>{
    if(err)
      throw err;
      console.log(data);
      res.download(path.join(data.path,data.name)); 
  })
});

//*******************************************************************File Upload */
router.post('/upload', function(req, res) {
  
    console.log(req.body);
    console.log(req.files);
  if (Object.keys(req.files).length == 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "file") is used to retrieve the uploaded file
  let file = req.files.file;

  // Use the mv() method to place the file somewhere on your server
  var dir = path.join('/public/uploads',req.body.branch,req.body.sem,req.body.subject,req.body.material);
  dir= '.'+ dir;
  console.log(dir);

  var filestore = new Promise((resolve, reject)=> {
    // executor (the producing code, "singer")

      if (!fs.existsSync(dir)){
        mkdirp(dir, function (err) {
          if (err) console.reject(err) 
          console.log('folder bana diya') ;
          resolve(dir);
      });
      }
      else
      resolve(dir);
         
  })
  .then((dir)=>{
      console.log('save karne ki koshihs') ;
      file.mv(path.join(dir,file.name), function(err) {
      if (err)
        return res.status(500).send(err);
      
        Resource({path: dir,name: file.name }).save((err,data)=>{
          if(err)
            throw err;
          console.log(data);
          res.end('File Upoaded!')
        }); 
     
    });
  })
  .catch((err)=>{
    console.log(err);
  })
});

module.exports = router
