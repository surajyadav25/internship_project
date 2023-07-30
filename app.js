const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Require the index.js file to set up the routes
const routes = require('./index');
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
