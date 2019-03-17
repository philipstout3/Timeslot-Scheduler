const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ts_scheduler');
var db = mongoose.connection;

app.use(express.static(path.join(__dirname, '../public')))

app.get('/api/reservation_items', (req, res) => {
  db.collection('reservation_items').find().toArray((err, result) => {
    if(err) {
      console.log(err);
      return;
    }
    res.send(result);
  });
  
})

app.listen(port, () => console.log(`Timeslot-Scheduler listening on port ${port}!`))