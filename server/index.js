const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
var bodyParser = require('body-parser');
var ObjectID = require('mongodb').ObjectID;
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ts_scheduler', { useNewUrlParser: true });
var db = mongoose.connection;

app.use(bodyParser.json())
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

app.get('/api/reservation_item/:propertyId', (req, res) => {
  db.collection('reservation_items').find({"_id": ObjectID(req.params.propertyId)}).toArray((err, result) => {
    if(err) {
      console.log(err);
      return;
    }
    res.send(result);
  });
})

app.get('/api/reservation_times/:propertyId', (req, res) => {
  db.collection('reservation_times').find({"propertyId": req.params.propertyId}).toArray((err, result) => {
    if(err) {
      console.log(err);
      return;
    }
    res.send(result);
  });
})

  app.put('/api/reservation_items', (req, res) => {
    var {id, name, available, capacity} = req.body;
    db.collection('reservation_items').updateOne(
      {"_id": ObjectID(id)},
      {"$set": {"name": name, "capacity": capacity, "available": available}}
    )
})

app.post('/api/reservation_items', (req, res) => {
  var {name, available, capacity} = req.body;
  db.collection('reservation_items').insertOne(
    {"name": name, "capacity": capacity, "available": available}, (err, results) => {
      res.send(results.ops)
    }
  )
})

app.delete('/api/reservation_items', (req, res) => {
  var id = req.body.id;
  db.collection('reservation_items').deleteOne(
    {"_id": ObjectID(id)}
  );
  res.send('deleted');
})

app.listen(port, () => console.log(`Timeslot-Scheduler listening on port ${port}!`))