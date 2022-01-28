module.exports = app => {
  const tasks = require("../controllers/task.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/task/create", tasks.create);

  // Retrieve all Tutorials
  router.get("/task/getList", tasks.findAll);

  // Retrieve a single Tutorial with id
  router.get("/task/:id", tasks.findOne);

  // Update a Tutorial with id
  router.post("/task/update/:id", tasks.update);

  // Delete a Tutorial with id
  router.post("/task/delete/:id", tasks.delete);

  // Delete all Tutorials
  router.post("/task/deleteAll", tasks.deleteAll);

  // upload image file
  router.post("/task/upload", tasks.upload);

  app.use('/api', router);
};
