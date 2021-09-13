import { useState } from 'react'
import Note from './components/Note'
import Phonebook from './components/Phonebook';

const App = ({notex}) => {
  const [notes, setnotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      data: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1,
    }
    setnotes(notes.concat(noteObject));
    setNewNote('')
  }

  const handleNoteChange = (event) => setNewNote(event.target.value);

  const notesToShow = showAll ? notes : notes.filter(note => note.important);

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
            <Note key={note.id} note={note} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input 
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">submit</button>
      </form>
      <div>
        <Phonebook />    
      </div>
    </div>
  )
}

export default App