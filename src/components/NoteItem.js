import React, {useContext} from 'react'
import noteContext from '../context/notes/noteContext'
const NoteItem = (props) => {
    const { note } = props
    const context = useContext(noteContext)
    const {deleteNote}  = context;
    return (
        <div classNameName="col-md-3">    
            <div className="card my-4 " style={{"width": "18rem"}} >
                    <div className="card-body">
                        <h5 className="card-title">{note.title}</h5>
                        <p className="card-text">{note.description}</p>
                        <i className="fa-sharp fa-solid fa-trash mx-3" onClick={()=> deleteNote(note._id)}></i>
                        <i className="fa-regular fa-pen-to-square"></i>
                    </div>
            </div>
        </div>
    )
}

export default NoteItem