const sql = require("./db.js");
const utils = require("./utils.js")

// constructor
const Task = function(task) {
    this.id = task.id
    this.project_id = task.project_id
    this.title = task.title;
    this.lead = task.lead;
    this.start_time = task.start_time;
    this.end_time = task.end_time;
    this.status = task.status;
    this.parent_task_id = task.parent_task_id;
    this.complete_percent = task.complete_percent;
    this.real_end_time = task.real_end_time;
    this.working_days = task.working_days;
    this.task_id = task.task_id;
    this.updated_at =  utils.getCurrentTime();

};

Task.create = (newTask, result) => {
  console.log("create task:" + newTask);
  sql.query("INSERT INTO tbl_task SET ?", newTask, (err, res) => {
    if (err) {
      console.log("error: ", err);
      var result_data = {
        "message":err,
        "code":"-1"
      };
      result(null, JSON.stringify(result_data));
      return;
    }

    console.log("created task: ", { id: res.insertId, ...newTask });
    var result_data = {
      "message":"success",
      "code":0,
      "data":{ id: res.insertId, ...newTask }
    };
    result(null, JSON.stringify(result_data));
  });
};

Task.findById = (id, result) => {
  sql.query(`SELECT * FROM tbl_task WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      var result_data = {
        "message":err,
        "code":"-1"
      };
      result(null, JSON.stringify(result_data));
      return;
    }

    if (res.length) {
      console.log("found task: ", res[0]);
      var result_data = {
        "message":"success",
        "code":0,
        "data":res[0]
      };
      result(null, JSON.stringify(result_data));
      return;
    }

    var result_data = {
      "message":"Task Not Found",
      "code":"-2"
    };
    result(null, JSON.stringify(result_data));
  });
};

Task.getAll = (project_id, result) => {
  let query = "SELECT * FROM tbl_task as task";

  if (project_id) {
    query += ` WHERE project_id = ${project_id}`;
  }

  query += " order by task_id asc"

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      var result_data = {
        "message":err,
        "code":"-1"
      };
      result(null, JSON.stringify(result_data));
      return;
    }

    console.log("tbl_task: ", res);
    var result_data = {
      "message":"success",
      "code":0,
      "data":res
    };
    result(null, JSON.stringify(result_data));
  });
};

Task.updateById = (id, task, result) => {
  sql.query(
    "UPDATE tbl_task SET title = ?, task_id=? ,start_time = ?, end_time = ?, real_end_time = ?, tbl_task.lead = ?, status = ?, parent_task_id = ?, complete_percent = ?, working_days = ?  WHERE id = ?",
    [task.title, task.task_id,task.start_time, task.end_time, task.real_end_time, task.lead, task.status, task.parent_task_id, task.complete_percent, task.working_days, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        var result_data = {
          "message":err,
          "code":"-1"
        };
        result(null, JSON.stringify(result_data));
        return;
      }

      if (res.affectedRows == 0) {
        // not found Task with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated task: ", { id: id, ...task });

      var result_data = {
        "message":"success",
        "code":0,
        "data":{ id: id, ...task }
      };
      result(null, JSON.stringify(result_data));
    }
  );
};

Task.remove = (id, result) => {
  sql.query("DELETE FROM tbl_task WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      var result_data = {
        "message":err,
        "code":"-1"
      };
      result(null, JSON.stringify(result_data));
      return;
    }

    if (res.affectedRows == 0) {
      // not found Task with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted task with id: ", id);
    var result_data = {
      "message":"success",
      "code":0
    };
    result(null, JSON.stringify(result_data));
  });
};

Task.removeAll = result => {
  sql.query("DELETE FROM tbl_task", (err, res) => {
    if (err) {
      console.log("error: ", err);
      var result_data = {
        "message":err,
        "code":"-1"
      };
      result(null, JSON.stringify(result_data));
      return;
    }

    console.log(`deleted ${res.affectedRows} tbl_task`);
    var result_data = {
      "message":"success",
      "code":0
    };
    result(null, JSON.stringify(result_data));
  });
};

Task.upload = (file,result) => {
  try {
    let image = req.files.image;
    
    //Use the mv() method to place the file in upload directory (i.e. "uploads")
    image.mv('./uploads/' + image.name);

    var result_data = {
      "message":"success",
      "code":0,
      "data": {
          name: image.name,
          mimetype: image.mimetype,
          size: image.size
      }
    };
    result(null, JSON.stringify(result_data));
    
  } catch (err) {
      res.status(500).send(err);
  }
};

module.exports = Task;
