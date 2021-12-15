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


app.post(`/add_questions/:doc_id`,(req,res)=>{
    var docs_data = req.body;
    var name = req.params.doc_id
    var d = new Date();
    console.log('Printing add questions',docs_data,name, d)
    let data = JSON.stringify(docs_data);
    fs.writeFileSync(`files/${name.trim()}.json`, data, d);
    res.status(200).json({id:name})
})





app.listen(9000,()=>{console.log("express server is running at port number 9000")})