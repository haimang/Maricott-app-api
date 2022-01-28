module.exports = app => {
    const UserController = require("../controllers/user.controller.js");
  
    var router = require("express").Router();
  
    // login
    router.post("/login", UserController.login);
    
    app.use('/api', router);
  };
  