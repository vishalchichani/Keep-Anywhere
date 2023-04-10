const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');



//Route 1 to get all notes
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try{
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    }catch (error) {
        console.error(error.message);
        res.status(501).send("Unknown error occured.");
    }
})

//Route 2 to add new note
router.post('/addnote', fetchuser, [
    body('title', 'Length should atleast be 3 letters').isLength({ min: 3 }),
    body('description', 'Description should atleast be 5 characters long.').isLength({ min: 5 })
],
    async (req, res) => {
        try {
            const { title, description, tag, } = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note = new Notes({ title, description, tag, user: req.user.id });
            const savedNote = await note.save();
            res.json(savedNote);
        } catch (error) {
            console.error(error.message);
            res.status(501).send("Unknown error occured.");
        }
    })

//Route 3 Update the note
router.put('/updatenote/:id', fetchuser, 
    async (req, res) => {
        try {
            const { title, description, tag, } = req.body;
            //Creating new Note object
            const newNote = {};
            if(title){newNote.title = title}
            if(description){newNote.description = description}
            if(tag){newNote.tag = tag}
            
            //Findinf the note and updating it

            let note = await Notes.findById(req.params.id);

            if(!note){
                return res.status(404).send("Not Found");
            }

            if(note.user.toString()!== req.user.id){
                return res.status(401).send("Not Allowed");
            }

            note = await Notes.findByIdAndUpdate(
                req.params.id, {$set: newNote}, {new:true}
            )
            res.json(note);

            
        } catch (error) {
            console.error(error.message);
            res.status(501).send("Unknown error occured.");
        }
    })
module.exports = router;