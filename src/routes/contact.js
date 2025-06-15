const express = require("express");
const contactRouter = express.Router();
const Contact = require("../models/contact"); 

contactRouter.post("/contact", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const newContact = new Contact({
      name,
      email,
      subject,
      message
    });

    await newContact.save();
    res.send(newContact);
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

module.exports = contactRouter;
