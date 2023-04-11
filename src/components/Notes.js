
import React, {useContext} from 'react'
import noteContext from '../context/notes/noteContext'
import NoteItem from './NoteItem';
import AddNote from './AddNote';
const Notes = () => {
    const context = useContext(noteContext);
    const {notes, setNotes} = context;

    return (
        <div className="container my-4">
        <AddNote />
        <div className="row my-3">
            <h2>Your Notes</h2>
            
            <div className='d-flex flex-wrap gap-3'>
            {notes && notes.map((note) => {
                return <NoteItem note= {note} />
            })}
            </div>
            

        </div>
        </div>
    )
}

export default Notes