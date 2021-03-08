const fs = require('fs');
const path = require('path');

function filterByTitle(query, notesArray) {
  let filteredResults = notesArray;
  if(query.title) {
    filteredResults = filteredResults.filter(note => note.title === query.title);
  };
  return filteredResults
};

function findById(id, notesArray) {
  const result = notesArray.filter(note => note.id === id)[0];
  return result;
};

function createNewNote(body, notesArray) {
  const note = body;
  notesArray.push(note);
  fs.writeFileSync(
    path.join(__dirname, '../db/db.json'),
    JSON.stringify({notesArray}, null, 2)
  );
  return note;
}

function validateNote(note) {
  if (!note.title || typeof note.title !== 'string') {
    return false;
  }
  return true;
};

module.exports = {
  filterByTitle,
  findById,
  createNewNote,
  validateNote
};


// function that displays all notes on click
// function that displays selected note on click
// function that shows save button and saves note on click
// function that reloads the page to display newly saved note
// function that creates a new note to enter
