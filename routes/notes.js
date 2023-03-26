const express = require("express"); // require express
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
const Note = require("../models/Note");
//  Route 01 : get  all the notes using GEt : "api/notes/getnotes"
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error !");
  }
});
//  Route 02 : add a new note using POST: "api/notes/addnote" . Login Required !
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      // If there are errors, return Bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();

      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);
//  Route 03 . Update an existing notes . Using PUT '/api/notes/upadtenote   . Login Required !
router.put(
  "/updatenote/:id",
  fetchuser,

  async (req, res) => {
    const { title, description, tag } = req.body;
    try {
      //  create a new note obj
      const newNote = {};
      if (title) {
        newNote.title = title;
      }
      if (description) {
        newNote.description = description;
      }
      if (tag) {
        newNote.tag = tag;
      }
      // find the note will be updated
      let note = await Note.findByIdAndUpdate(req.params.id);
      if (!note) {
        return res.status(404).send("Not Found!");
      }

      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed!");
      }
      note = await Note.findByIdAndUpdate(
        req.params.id,
        { $set: newNote },
        { new: true }
      );
      res.json({ note });
    } catch (error) {
      res.status(500).send("Internal Server Erro!");
    }
  }
);

//  Route 04 . Delete an existing notes . Using DELETE method '/api/notes/deletenote   . Login Required !
router.delete(
  "/deletenote/:id",
  fetchuser,

  async (req, res) => {
    try {
      // find the note will be updated and deleted !
      let note = await Note.findByIdAndUpdate(req.params.id);
      if (!note) {
        return res.status(404).send("Not Found!");
      }
      //   Allow to delete if this user own this note .
      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed!");
      }
      note = await Note.findByIdAndDelete(req.params.id);
      res.json({ Success: "Successful to delete this note", note: note });
    } catch (error) {
      res.status(500).send("Internal Server Erro!");
    }
  }
);

module.exports = router;
