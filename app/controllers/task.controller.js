const Task = require("../models/task.model.js");

// Create and Save a new Task
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  else {
    // Create a Task
    const task = new Task({
      task_id: req.body.task_id,
      title: req.body.title,
      start_time: req.body.start_time,
      end_time: req.body.end_time,
      real_end_time: req.body.real_end_time,
      lead: req.body.lead,
      project_id: req.body.project_id,
      status: req.body.status,
      parent_task_id: req.body.parent_task_id,
      complete_percent: req.body.complete_percent,
      working_days: req.body.working_days,
      notes: req.body.notes,
      image: req.body.image
    });
  
    // Save Task in the database
    Task.create(task, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Task."
        });
      else res.send(data);
    });
  }
};

// Retrieve all Tasks from the database (with condition).
exports.findAll = (req, res) => {
  const projectId = req.query.project_id;

  Task.getAll(projectId, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tasks."
      });
    else res.send(data);
  });
};

// Find a single Task by Id
exports.findOne = (req, res) => {
  Task.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Task with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Task with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Update a Task identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Task.updateById(
    req.params.id,
    new Task(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Task with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Task with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Task with the specified id in the request
exports.delete = (req, res) => {
  Task.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Task with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Task with id " + req.params.id
        });
      }
    } else  res.send(data);
  });
};

// Upload image file
exports.upload = (req, res) => {
  console.log("upload file");
  try {
    if(!req.files) {
        res.send({
            status: false,
            message: 'No file uploaded'
        });
    } else {
        //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
        let image = req.files.image;
        console.log(image.name);
        var currentTime = new Date().getTime();
        //Use the mv() method to place the file in upload directory (i.e. "uploads")
        image.mv('./uploads/' + currentTime + "." + image.name.split(".")[1]);

        //send response
        res.send({
            status: true,
            message: 'File is uploaded',
            data: {
                name: currentTime + "." + image.name.split(".")[1],
                mimetype: image.mimetype,
                size: image.size
            }
        });
    }
} catch (err) {
    res.status(500).send(err);
}
};

// Delete all Tasks from the database.
exports.deleteAll = (req, res) => {
  Task.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tasks."
      });
    else  res.send(data);
  });
};
