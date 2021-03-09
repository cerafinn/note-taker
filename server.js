const express = require('express');
const app = express();
const PORT = process.env.PORT || 3002;
const routes = require('./routes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(routes);

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});