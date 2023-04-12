import React, {useState} from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
const host = "http://localhost:3001";


  const[notes, setNotes] = useState([])



  //Get all Notes
  const getAllNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET", 
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      }
    })
    const json =  await response.json();
    console.log(json)
    setNotes(json)
      
    }
  //Add a Note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title,description,tag}), 
    });
    
      const note = await response.json();
      setNotes(notes.concat(note));
  }

  //Delete a Note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`,
    {
      method: "DELETE", 
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    });
     
    const newNotes = notes.filter((note)=> {
      return note._id!==id
    } )
    setNotes(newNotes);
  }

  //Edit a Note
  const editNote = async (id,title,description,tag) => {
  const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
    method: "PUT", 
    headers: {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem('token')
    },
    body: JSON.stringify({title,description,tag}), 
  });
   
    const newNotes = JSON.parse(JSON.stringify(notes));
    for(let i=0;i<newNotes.length; i++){
      const element = newNotes[i];
      if(element._id===id){
        newNotes[i].title = title
        newNotes[i].description = description
        newNotes[i].tag = tag
        break;
      }
      
    }
    setNotes(newNotes)
  }
    
    return (
        <noteContext.Provider value={{notes, addNote, deleteNote, editNote, getAllNotes}} >
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;
