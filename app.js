const express = require("express"),
  mediaController = require("./controllers/media"),
  searchController = require("./controllers/search"),
  bodyParser = require("body-parser");

const app = express();
let port = process.env.PORT;

if (port == null || port == "") {
  port = 3000;
}

app.set("view engine", "pug");
app.use(bodyParser.urlencoded({ extended: true }));

//===================================
//                  ROUTES
//===================================
app.get("/", (req, res) => res.render("home"));

app.get("/result", mediaController.getMedia);
app.get("/searches", searchController.getSearches);

app.listen(port, () => console.log(`Movie API App listening on port ${port}!`));
