const express = require('express');
const path = require('path');
const { clog } = require('./middleware/clog');
const api = require('./routes/index');

const PORT = process.env.port || 3001;

const app = express();
// Import custom middleware, "cLog"
app.use(clog);
// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));

// GET rouge for landing page 
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'), {
    status: 200,
  });
});
// add route for notes page
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
