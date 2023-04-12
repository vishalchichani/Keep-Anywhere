import React, {useState} from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {

const notesInitial = [
    {
      "_id": "6433d89a97718312ef850c01",
      "user": "6427135880c8a347786ac5a0",
      "title": "My title",
      "description": "do ur work on time",
      "label": "General",
      "timestamp": "2023-04-10T09:36:26.145Z",
      "__v": 0
    },
    {
      "_id": "6433d8c92c7445db6e26b3e3",
      "user": "6427135880c8a347786ac5a0",
      "title": "My title",
      "description": "do ur work on time",
      "label": "General",
      "timestamp": "2023-04-10T09:37:13.322Z",
      "__v": 0
    }
]

  const[notes, setNotes] = useState(notesInitial)

  //Add a Note
  const addNote = (title, description, tag) => {
      const note = {
        "_id": "6433d89a97718312ef850c01",
        "user": "6427135880c8a347786ac5a0",
        "title": title,
        "description": description,
        "tag": tag,
        "label": "General",
        "timestamp": "2023-04-10T09:36:26.145Z",
        "__v": 0
      }

      setNotes(notes.concat(note));
  }

  //Delete a Note
  const deleteNote = (id) => {
    const newNotes = notes.filter((note)=> {
      return note._id!==id
    } )
    setNotes(newNotes);
  }

  //Edit a Note
  const editNote = () => {

  }
    
    return (
        <noteContext.Provider value={{notes, addNote, deleteNote, editNote}} >
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;
