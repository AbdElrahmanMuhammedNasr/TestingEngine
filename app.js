const express = require('express');

const  test = require('./routes/test');

const  app = express();
app.use(express.json());
app.use(express.static('public')); // To serve static HTML files


app.use('/', test);

app.post('/submit-scenario', (req, res) => {
  const data = req.body;
  console.log('Received data:', data);
  res.status(200).json({ message: 'Data received successfully', data });
});


app.listen(3001,()=>{
  console.log("888888")
})