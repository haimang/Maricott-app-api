const User = require("../models/user.model.js");

// login
exports.login = (req, res) => {
  // Validate request
  if (!req.body.email || !req.body.password) {
    
    res.status(400).send({
      message: "Email or password incorrect!"
    });
  }
  else {
    // Create a Project
    const user = new User({
      email: req.body.email,
      password: req.body.password,
    });
  
    // Save Project in the database
    User.login(user, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Project."
        });
      else res.send(data);
    });
  }

  
};
