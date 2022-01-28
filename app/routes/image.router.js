module.exports = app => {
    const ImageController = require("../controllers/image.controller.js");
  
    var router = require("express").Router();
  
    router.get("/:url", ImageController.getImage);
    
    app.use('/image', router);
  };
  