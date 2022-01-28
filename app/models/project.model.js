const sql = require("./db.js");
const utils = require("./utils.js")
// constructor
const Project = function(project) {
    this.id = project.id
    this.title = project.title;
    this.start_time = project.start_time;
    this.end_time = project.end_time;
    this.type = project.type;
    this.address = project.address;
    this.manager = project.manager;
    this.status = project.status;
    this.contact_number = project.contact_number;
    this.updated_at =  utils.getCurrentTime();
};

Project.create = (newProject, result) => {
  console.log("create project:" + newProject);
  sql.query("INSERT INTO tbl_project SET ?", newProject, (err, res) => {
    if (err) {
      console.log("error: ", err);
      var result_data = {
        "message":err,
        "code":"-1"
      };
      result(null, JSON.stringify(result_data));
      return;
    }

  console.log("created project: ", { id: res.insertId, ...newProject });

  let query = "select *, (select count(*) from tbl_task where project_id = tbl_project.id) as task_cnt, (select count(*) from tbl_task where status='Complete' and project_id = tbl_project.id) as complete_task_cnt FROM tbl_project   ";

  query += ` WHERE id =${res.insertId}`;

  sql.query(query, (err, subres) => {
    if (err) {
      console.log("error: ", err);
      var result_data = {
        "message":err,
        "code":"-1"
      };
      var result_data = {
        "message":"success",
        "code":0,
        "data":{ id: res.insertId, ...newProject }
      };
      result(null, JSON.stringify(result_data));
    }

    console.log("tbl_project: ", subres);
    var result_data = {
      "message":"success",
      "code":0,
      "data":{ subres}
    };
    result(null, JSON.stringify(result_data));
  });

    
  });
};

Project.findById = (id, result) => {
  sql.query(`SELECT * FROM tbl_project WHERE id = ${id}`, (err, res) => {
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
      console.log("found project: ", res[0]);
      var result_data = {
        "message":"success",
        "code":0,
        "data":res[0]
      };
      result(null, JSON.stringify(result_data));
      return;
    }

    var result_data = {
      "message":"Project Not Found",
      "code":"-2"
    };
    result(null, JSON.stringify(result_data));
  });
};

Project.getAll = (title, sortType,result) => {
  let query = "SELECT tbl_project.*, (select count(*) from tbl_task where project_id = tbl_project.id) as task_cnt, (select count(*) from tbl_task where status='Completed' and project_id = tbl_project.id) as complete_task_cnt FROM tbl_project   ";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  if(sortType == 1) {   // sort by update date latest
    query += ' order by updated_at desc'
  } else if(sortType == 2) {  //sort by update date oldest
    query += ' order by updated_at asc' 
  }

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

    console.log("tbl_project: ", res);
    var result_data = {
      "message":"success",
      "code":0,
      "data":res
    };
    result(null, JSON.stringify(result_data));
  });
};

Project.updateById = (id, project, result) => {
  sql.query(
    "UPDATE tbl_project SET title = ?, start_time = ?, end_time = ?, type = ?, address = ?, manager = ?, contact_number = ? , status = ? WHERE id = ?",
    [project.title, project.start_time, project.end_time, project.type, project.address, project.manager, project.contact_number, project.status, id],
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
        // not found Project with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated project: ", { id: id, ...project });

      //get complete task count and count of this project
      let query = "select *, (select count(*) from tbl_task where project_id = tbl_project.id) as task_cnt, (select count(*) from tbl_task where status='Complete' and project_id = tbl_project.id) as complete_task_cnt FROM tbl_project   ";

      query += ` WHERE id =${id}`;

      sql.query(query, (err, subres) => {
        if (err) {
          console.log("error: ", err);
          var result_data = {
            "message":err,
            "code":"-1"
          };
          var result_data = {
            "message":"success",
            "code":0,
            "data":{ id: id, ...project }
          };
          result(null, JSON.stringify(result_data));
        }

        console.log("tbl_project: ", subres);
        var result_data = {
          "message":"success",
          "code":0,
          "data":{ subres }
        };
        result(null, JSON.stringify(result_data));
      });

    }
  );
};

Project.remove = (id, result) => {
  sql.query("DELETE FROM tbl_project WHERE id = ?", id, (err, res) => {
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
      // not found Project with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted project with id: ", id);
    var result_data = {
      "message":"success",
      "code":0
    };
    result(null, JSON.stringify(result_data));
  });
};

Project.removeAll = result => {
  sql.query("DELETE FROM tbl_project", (err, res) => {
    if (err) {
      console.log("error: ", err);
      var result_data = {
        "message":err,
        "code":"-1"
      };
      result(null, JSON.stringify(result_data));
      return;
    }

    console.log(`deleted ${res.affectedRows} tbl_project`);
    var result_data = {
      "message":"success",
      "code":0
    };
    result(null, JSON.stringify(result_data));
  });
};

module.exports = Project;
