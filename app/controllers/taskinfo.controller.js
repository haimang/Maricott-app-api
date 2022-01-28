const TaskInfo = require("../models/taskinfo.model.js");

// Create and Save a new Task
exports.addnotes = (req, res) => {
  // Validate request
  if (!req.body) {
    
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  else {
    TaskInfo.addnotes(req.body.task_id, req.body.date, req.body.notes , (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Task."
        });
      else res.send(data);
    });
  }
};

// Upload image file
exports.addimage = (req, res) => {
  console.log("upload file");
  try {
    if(!req.files) {
        res.send({
            status: false,
            message: 'No file uploaded'
        });
    } else {
      console.log("task_id:" + req.body.task_id);
      console.log("date:" + req.body.date);
      TaskInfo.addimage(req.body.task_id, req.body.date, req.files , (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Task."
          });
        else res.send(data);
      });
    }
} catch (err) {
    res.status(500).send(err);
}
};

// get notes and image infor
exports.getinfo = (req, res) => {
  try {
    // Validate request
      if (!req.query.task_id) {
        
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
      else {
        TaskInfo.getinfo(req.query.task_id , (err, data) => {
          if (err)
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the Task."
            });
          else res.send(data);
        });
      }
} catch (err) {
    res.status(500).send(err);
}
};
