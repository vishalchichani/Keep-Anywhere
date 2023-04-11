import React, {useContext, useState} from 'react'
import noteContext from '../context/notes/noteContext'
const AddNote = () => {

  const context = useContext(noteContext)
  const {addNote}  = context;
  
  const [note, setNote] = useState({title:"", description:"", tag:""});

  const handleChange = (e) => {
        setNote( {...note, [e.target.name]: e.target.value})
  }
 
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
  }
  return (
    <div className="container my-4">
    <h1>Add a Note</h1>
    <form>
        <div className="mb-3">
            <label for="title" className="form-label">Title</label>
            <input type="text" class="form-control" id="title" name="title" aria-describedby="emailHelp" />
                
        </div>
        <div className="mb-3">
            <label for="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" name="description" onChange={handleChange}/>
        </div>
        <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" onChange={handleChange} />
                <label className="form-check-label" for="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
    </form>
    </div>
  )
}

export default AddNote