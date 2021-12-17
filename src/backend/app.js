const fs = require('fs');
const express =require("express");


var app =express()
var cors = require('cors')
var bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(cors())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });



app.get("/data/:doc_id",(req,res)=>{
    
   
    var docId=req.params.doc_id;
    fs.readFile(`files/${docId}.json`, (err, data) => {
        if (err) throw err;
        let ques_data = JSON.parse(data);
        console.log(req.params.doc_id)       
    res.send(ques_data);
    });
})

const path = require('path');



app.get("/get_all_files", (req, res) => {
  const directoryPath = path.join(__dirname, '/files');
  const resArray = [];
  fs.readdir(directoryPath, function (err, files) {
    if (files) {
      files.forEach((file) => {
        const data = fs.readFileSync(`${directoryPath}\\${file}`,{encoding:'utf8', flag:'r'})
          if (data) {
            console.log('data',data)
            let ques_data = JSON.parse(data);
            const {document_name,createdAt} = ques_data;
            const payload = {
             FileName:document_name,
             FileURL: `localhost:9000/${file.split('.')[0]}`,
             createdAt
            }
            resArray.push(JSON.stringify(payload));
          }
      })
    }
    res.send(resArray);
  });

});

var moment = require('moment');

app.post(`/add_questions/:doc_id`,(req,res)=>{
    var docs_data = req.body;
    var name = req.params.doc_id
    docs_data.createdAt = moment().format("YYYY-MM-DD");
    let data = JSON.stringify(docs_data);
    fs.writeFileSync(`files/${name.trim()}.json`, data);
    res.status(200).json({id:name})
})





app.listen(9000,()=>{console.log("express server is running at port number 9000")})