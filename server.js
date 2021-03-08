const express = require('express');
const app = express();
const PORT = process.env.PORT || 3002;
const notes = require('./db/db.json');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

function filterByTitle(query, notesArray) {
  let filteredResults = notesArray;
  if(query.title) {
    filteredResults = filteredResults.filter(note => note.title === query.title);
  };
  return filteredResults
}

app.get('/api/notes', (req, res) => {
  let results = notes
  if (req.query) {
    results = filterByTitle(req.query, results)
  }
  res.json(results);
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});