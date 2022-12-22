const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config2.env" });
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(require("./routes/record-1"));
// get driver connection
const dbo = require("./db/conn-1");

app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);

  });
  console.log(`Server is running on port: ${port}`);
});