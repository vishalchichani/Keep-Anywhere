import React from 'react'

const NoteItem = (props) => {
    const { note } = props
    return (
        <div classNameName="col-md-3">    
            <div className="card my-4"  >
                    <div className="card-body">
                        <h5 className="card-title">{note.title}</h5>
                        <p className="card-text">{note.description}</p>
                        <i className="fa-sharp fa-solid fa-trash mx-3"></i>
                        <i className="fa-regular fa-pen-to-square"></i>
                    </div>
            </div>
        </div>
    )
}

export default NoteItem