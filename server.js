const express = require("express");
const mongoose = require("mongoose");
const app = express();
const person = require("./mongoose/mongoose_sett");
require("dotenv").config();
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => app.listen(3000))
  .catch((err) => console.log(err));

/* ------------------------------------Create and Save a Record of a Model:*/
function save() {
  const newperson = new person({
    name: "bilel manai",
    age: 23,
    favoriteFoods: ["pizza", "hamburger"],
  });
  newperson.save((err) => {
    err ? console.log(err) : console.log("done");
  });
}
// save();

/* ------------------------------------Create Many Records with model.create()*/
const manypersons = require("./manyperson");
function create() {
  person.create(manypersons).then((result) => {
    result ? console.log("done creating") : console.log("there is an err");
  });
}
// create();
/* ------------------------------------Use model.find() to Search Your Database*/
function find(Name) {
  person
    .find({ name: Name })
    .then((result) => console.log(result))
    .catch((err) => console.log(err));
}
// find("bilel manai");
/* ------------------------------------Use model.findOne() to Return a Single Matching Document from Your Database*/
function findone(food) {
  person
    .findOne({ favoriteFoods: food })
    .then((result) => console.log(result))
    .catch((err) => console.log(err));
}
// findone("toxic");
/* ------------------------------------Use model.findById() to Search Your Database By _id*/
function findonebyid(personId) {
  person
    .findById(personId)
    .then((result) => console.log(result))
    .catch((err) => console.log(err));
}
// findonebyid("60dcaed165c41c36885f276b");
/* ------------------------------------Perform Classic Updates by Running Find, Edit, then Save*/
function Updatebyid(personId, foodName) {
  person
    .findById(personId)
    .then((result) => {
      result.favoriteFoods.indexOf(foodName) === -1
        ? result.favoriteFoods.push(foodName)
        : console.log("already exist");
      result.save();
    })
    .catch((err) => console.log(err));
}
// Updatebyid("60dcb03e339fa93dc8f56b61");
/* ------------------------------------Perform New Updates on a Document Using model.findOneAndUpdate()*/
function findoneAndUpdate(personName) {
  person
    .findOneAndUpdate(
      { name: personName },
      { $set: { age: 20 } },
      { new: true }
    )
    .then((result) => console.log(result))
    .catch((err) => console.log(err));
}
// findoneAndUpdate("bilel manai");
/* ------------------------------------Delete One Document Using model.findByIdAndRemove*/
function findByIdAndRemov(personid) {
  person
    .findByIdAndRemove({ _id: personid })
    .then((result) => console.log(result))
    .catch((err) => console.log(err));
}
// findByIdAndRemov("60dcaed165c41c36885f2768");
/* ------------------------------------MongoDB and Mongoose - Delete Many Documents with model.remove()*/
function remove(personName) {
  person
    .remove({ name: personName })
    .then((result) => console.log(result))
    .catch((err) => console.log(err));
}
// remove("zeus");
/* ------------------------------------Chain Search Query Helpers to Narrow Search Results*/
function chain(foodpref) {
  person
    .find({ favoriteFoods: foodpref })
    .sort({ name: -1 })
    .limit(2)
    .select({ name: true })
    .exec()
    .then((result) => console.log(result))
    .catch((err) => console.log(err));
}
chain("pizza");
