const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();

app.use(express.static(__dirname));
app.get('/api/posts',(req,res)=>{
  res.send([{id:1,name:'Juan Emmanuel',last:'Diaz'}]);
});
app.get('*',(req,res)=>{
  res.sendFile(path.resolve(__dirname,'index.html'));
});
app.listen(port);
console.log('Server started');
