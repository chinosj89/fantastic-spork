const notes = require('express').Router();
const { readAndAppend, readFromFile, writeToFile } = require('../../helpers/fsUtils');
const { v4: uuidv4 } = require("uuid");


// GET Route for retrieving notes information
notes.get('/', (req, res) => {
    readFromFile('db/db.json').then((data) =>
      res.json(JSON.parse(data))
    );
  });
// POST route for creating new notes
notes.post('/', (req, res) => {
    const {title, text} = req.body;
    if (req.body) {
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
// For viewing the created notes 
notes.get('/notes/:id', (req, res) => {
    const id = req.params.id;
});
// For deleting notes - learned from past student's githubs; I also learned that in order to delete notes, you need to specify which one. so having the id created will allow you to delete specific notes. Had to download uuidv4 and pass that in the id. then create the delete method
notes.delete("/:id", (req, res) => {
    const id = req.params.id;
    readFromFile("./db/db.json") // reads the database
      .then((data) => JSON.parse(data)) // parses the contents
      .then((notes) => { 
        console.log(notes);
        let allNotes = notes.filter((note) => note.id !== id); // filters the id
        writeToFile("./db/db.json", allNotes); //writes the new list to the database
        res.json(`Note deleted successfully 🚀`);
      });
  });

module.exports = notes;