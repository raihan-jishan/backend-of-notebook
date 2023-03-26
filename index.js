const connectToMongo = require("./db"); // import db file
const express = require("express"); // imp express
// require cors origin
var cors = require("cors");
const app = express(); // app scafholding
const port = 5000; //initailze port name
app.use(cors());
app.use(express.json());
//  routes methods | Available routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));
//  app listen
app.listen(port, () => {
  console.log(`app listening on http://localhost:${port}`);
});

connectToMongo();
