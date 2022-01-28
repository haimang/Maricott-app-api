const User = require("../models/user.model.js");
const path = require('path');
// get image
exports.getImage = (req, res, next) => {
  // Validate request
  if (!req.params.url) {
    
    res.status(400).send({
      message: "Not found image!"
    });
  }
  else {
    var options = {
      root: path.join(__dirname, '../../uploads'),
      dotfiles: 'deny',
      headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
      }
    }
  
    var fileName = req.params.url
    res.sendFile(fileName, options, function (err) {
      if (err) {
        next(err)
      } else {
        console.log('Sent:', fileName)
      }
    })
  }

  
};
