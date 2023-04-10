import React, {useState} from "react";
import noteContext from "./noteContext";

const NoteState = () => {

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
    
    return (
        <noteContext.Provider value={{notes, setNotes}} >

        </noteContext.Provider>
    )
}

export default NoteState;