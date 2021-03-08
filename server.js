const express = require('express');
const app = express();
const PORT = process.env.PORT || 3002;
const notes = require('./db/db.json')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
  res.json(notes)
})

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});