module.exports = app => {
  const taskInfo = require("../controllers/taskinfo.controller.js");

  var router = require("express").Router();

  //get notes and image
  router.get("/taskinfo/getInfo", taskInfo.getinfo);
  
  // Add notes
  router.post("/taskinfo/addnotes", taskInfo.addnotes);

  // Add images
  router.post("/taskinfo/addimage", taskInfo.addimage);

  app.use('/api', router);
};
