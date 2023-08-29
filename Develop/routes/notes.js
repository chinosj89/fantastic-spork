const notes = require('express').Router();
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require("uuid");
// GET Route for retrieving diagnostic information
notes.get('/', (req, res) => {
    readFromFile('db/db.json').then((data) =>
      res.json(JSON.parse(data))
    );
  });

notes.post('/', (req, res) => {
    const {title, text} = req.body;
    if (title && text) {
        const newNotes = {
            title,
            text,
            id: uuidv4(),
        };
        readAndAppend(newNotes, 'db/db.json');
        const response = {
            status: 'Success!',
            body: newNotes,
        };
        res.json(response);
    } else {
        res.json('Error in posting the note');
    }
});

module.exports = notes;