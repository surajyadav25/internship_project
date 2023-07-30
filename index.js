const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Require and use the route files
const signupRoute = require('./routes/signup');
const loginRoute = require('./routes/login');
const protectedRoute = require('./routes/protected');

app.use(signupRoute);
app.use(loginRoute);
app.use(protectedRoute);

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
