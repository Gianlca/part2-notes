import React, { useEffect, useState } from "react";
import noteService from "../services/notes";
import Note from "./Note";
import { Notification } from "./Notification";

const Notes = () => {
  const [notes, setnotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [error, setError] = useState(null);

  const toggleImportanceOf = (id) => {
    const note = notes.filter((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .updateNote(id, changedNote)
      .then((data) => {
        setnotes(notes.map((note) => (note.id !== id ? note : data)));
      })
      .catch((error) => {
        setError(`This note ${error} was already delete`);
        setTimeout(() => {
          setError(null);
        }, 5000);
        setnotes(notes.filter((n) => n.id !== id));
      });
  };

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      data: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1,
    };

    noteService.createNote(noteObject).then((response) => {
      setnotes(notes.concat(noteObject));
      setNewNote("");
    });
  };

  const handleNoteChange = (event) => setNewNote(event.target.value);

  useEffect(() => {
    noteService.getAll().then((data) => {
      const nonExisting = {
        id: 10000,
        content: "This note is not saved to server",
        date: "2019-05-30T17:30:31.098Z",
        important: true,
      };
      setnotes(data.concat(nonExisting));
    });
  }, []);

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  return (
    <div>
      <Notification message={error} type={"error"} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default Notes;
