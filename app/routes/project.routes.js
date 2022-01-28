module.exports = app => {
  const projects = require("../controllers/project.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/project/create", projects.create);

  // Retrieve all Tutorials
  router.get("/project/getList", projects.findAll);

  // Retrieve a single Tutorial with id
  router.get("/project/:id", projects.findOne);

  // Update a Tutorial with id
  router.post("/project/update/:id", projects.update);

  // Delete a Tutorial with id
  router.post("/project/delete/:id", projects.delete);

  // Delete all Tutorials
  router.post("/project/deleteAll", projects.deleteAll);

  app.use('/api', router);
};
