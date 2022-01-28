const sql = require("./db.js");
const utils = require("./utils.js")

// constructor
const TaskInfo = function(taskInfo) {
    this.id = task.id
    this.task_id = taskInfo.task_id
    this.date = taskInfo.date;
    this.notes = taskInfo.notes;
    this.image = taskInfo.image;
    this.updated_at =  utils.getCurrentTime();

};

TaskInfo.addnotes = (task_id, date, notes, result) => {
  console.log("add notes:" + task_id + " "  + date + " " + notes);

  sql.query(`SELECT * FROM tbl_task_info WHERE task_id = ${task_id} and date = '${date}'`, (err, res) => {
    console.log("res result:" + res.length);
    if (res.length > 0) {
      sql.query("UPDATE tbl_task_info SET  notes = ? where task_id = ? and date = ?", [notes, task_id, date], (err, res) => {
        if (err) {
          console.log("error: ", err);
          var result_data = {
            "message":err,
            "code":"-1"
          };
          result(null, JSON.stringify(result_data));
          return;
        }
    
        var result_data = {
          "message":"success",
          "code":0
        };
        result(null, JSON.stringify(result_data));
      });
    }
    else {
      sql.query("INSERT INTO tbl_task_info SET task_id = ?, date = ?, notes = ?", [task_id, date, notes], (err, res) => {
        if (err) {
          console.log("error: ", err);
          var result_data = {
            "message":err,
            "code":"-1"
          };
          result(null, JSON.stringify(result_data));
          return;
        }
    
        var result_data = {
          "message":"success",
          "code":0,
          "data":{ id: res.insertId}
        };
        result(null, JSON.stringify(result_data));
        return;
      });
    }

    // var result_data = {
    //   "message":"Task Not Found",
    //   "code":"-2"
    // };
    // result(null, JSON.stringify(result_data));
  });
};

TaskInfo.addimage = (task_id, date, file,result) => {
  try {
    let image = file.image;
    
    //Use the mv() method to place the file in upload directory (i.e. "uploads")
    image.mv('./uploads/' + image.name);
    console.log("sql:" + `SELECT * FROM tbl_task_info WHERE task_id = ${task_id} and date = '${date}'`);
    sql.query(`SELECT * FROM tbl_task_info WHERE task_id = ${task_id} and date = '${date}'`, (err, res) => {
      console.log("result length:" + res.length);
      if (res.length > 0) {
        var imageData = "";
        if(res[0].image != "" && res[0].image != null) {
          imageData = res[0].image + "," + image.name;
        }
        else {
          imageData = image.name;
        }
        
        sql.query("UPDATE tbl_task_info SET  image = ? where task_id = ? and date = ?", [imageData, task_id, date], (err, res) => {
          if (err) {
            console.log("error: ", err);
            var result_data = {
              "message":err,
              "code":"-1"
            };
            result(null, JSON.stringify(result_data));
            return;
          }
      
          var result_data = {
            "message":"success",
            "code":0,
            "data":{ image:image.name}
          };
          result(null, JSON.stringify(result_data));
        });
      }
      else {
        sql.query("INSERT INTO tbl_task_info SET task_id = ?, date = ?, image = ?", [task_id, date, image.name], (err, res) => {
          if (err) {
            console.log("error: ", err);
            var result_data = {
              "message":err,
              "code":"-1"
            };
            result(null, JSON.stringify(result_data));
            return;
          }
      
          var result_data = {
            "message":"success",
            "code":0,
            "data":{ image:image.name}
          };
          result(null, JSON.stringify(result_data));
          return;
        });
      }
    });
  } catch (err) {
      res.status(500).send(err);
  }
};

TaskInfo.getinfo = (task_id, result) => {
  sql.query(`SELECT * FROM tbl_task_info WHERE task_id = ${task_id} order by date asc`, (err, res) => {
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
        "data":res
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

module.exports = TaskInfo;
