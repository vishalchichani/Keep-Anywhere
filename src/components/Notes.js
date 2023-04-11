
import React, {useContext} from 'react'
import noteContext from '../context/notes/noteContext'
import NoteItem from './NoteItem';
const Notes = () => {
    const context = useContext(noteContext);
    const {notes, setNotes} = context;

    return (

        <div className='row my-4'>
            <h2>Your Notes</h2>
            {notes && notes.map((note) => {
                return <NoteItem note= {note} />
            })}

        </div>
    )
}

export default Notes