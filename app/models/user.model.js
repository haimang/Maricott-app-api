const sql = require("./db.js");
const utils = require("./utils.js")
const md5 = require('md5');

// constructor
const User = function(user) {
    this.id = user.id
    this.email = user.email;
    this.password = user.password;
    this.updated_at =  utils.getCurrentTime();
};

User.login = (user, result) => {
  console.log("login user:" + user);
  let query = "select count(*) as cnt from tbl_user";

  query += ` WHERE email like "${user.email}" and password like"${md5(user.password)}"`;

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      var result_data = {
        "message":"Email or password incorrect!",
        "code":-1
      };
      result(null, JSON.stringify(result_data));
      return;
    }

    console.log("user login result: ", res[0].cnt);
    var result_data;
    if( res[0].cnt > 0) {
      result_data = {
        "message":"success",
        "code":0,
      };
    }
    else {
      result_data = {
        "message":"Email or password incorrect!",
        "code":-1
      };
    }
    
    result(null, JSON.stringify(result_data));
  });
};


module.exports = User;
