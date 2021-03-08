const express = require('express');
const app = express();
const PORT = process.env.PORT || 3002;
const notes = require('./db/db.json');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Use routes
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

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