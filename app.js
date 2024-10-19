const express = require('express');

const  test = require('./routes/test');

const  app = express();
app.use(express.json());


app.use('/', test);



app.listen(3001,()=>{
  console.log("888888")
})