// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Get all comments
app.get('/comments', (req, res) => {
  const comments = fs.readFileSync(path.join(__dirname, 'comments.json'), 'utf8');
  res.send(comments);
});

// Add a new comment
app.post('/comments', (req, res) => {
  const comments = JSON.parse(fs.readFileSync(path.join(__dirname, 'comments.json'), 'utf8'));
  comments.push(req.body);
  fs.writeFileSync(path.join(__dirname, 'comments.json'), JSON.stringify(comments));
  res.send(req.body);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});