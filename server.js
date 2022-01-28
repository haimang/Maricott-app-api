const express = require("express");
const bodyParser = require("body-parser"); /* deprecated */
const fileUpload = require("express-fileupload");
const cors = require("cors");

const app = express();

const multer = require('multer');
const upload = multer();

app.use(fileUpload({
  createParentPath:true,
}));

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require("./app/routes/project.routes.js")(app);
require("./app/routes/task.routes.js")(app);
require("./app/routes/user.router.js")(app);
require("./app/routes/image.router.js")(app);
require("./app/routes/taskinfo.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
