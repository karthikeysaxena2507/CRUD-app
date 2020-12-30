const express = require("express");
const router = express.Router();
const Person = require("../models/persons");

// get all people in DB
router.get("/all", (req, res) => {
    Person.findAll({})
        .then((person) => {res.send(person)})
        .catch((err) => console.log(err));
  });

// create new person
router.post("/create", (req, res) => {
    Person.create({
      id: req.body.id,
      Name: req.body.name,
      Phone: req.body.phone,
      Address: req.body.address,
      Email: req.body.email
    }).then(submitedPerson => res.send(submitedPerson))
      .catch((err) => console.log(err));
  });

// delete person
router.delete("/delete/:id", (req, res) => {
    Person.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(() => res.send("successfully deleted"))
    .catch((err) => console.log(err));
  });

// edit a person's details
router.put("/edit", (req, res) => {
    Person.update(
      {
        id: req.body.id,
        Name: req.body.name,
        Phone: req.body.phone,
        Address: req.body.address,
        Email: req.body.email
      },
      {
        where: { id: req.body.id }
      }
    )
    .then(() => res.send("successfully edited the person details"))
    .catch((err) => console.log(err));
  });
  
  
// get person from phone number
router.get("/find/:phone", (req, res) => {
  Person.findAll({
    where: {
      Phone: req.params.phone
    }
  })
  .then(person => res.send(person))
  .catch((err) => console.log(err));
});

  module.exports = router;
  

