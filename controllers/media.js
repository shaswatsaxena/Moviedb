const request = require("request");
const SearchTerm = require("../models/searchTerm");

exports.getMedia = (req, res) => {
  const searchTerm = req.query.search;
  const page = Number(req.query.page) ? Number(req.query.page) : 1;
  const apiURL = `http://www.omdbapi.com/?apikey=thewdb&s=${searchTerm}&page=${page}`;
  request.get(
    {
      url: apiURL,
      time: true
    },
    function(error, response, body) {
      if (error) res.send("ERROR:", error);
      else {
        console.log(
          `Status Code: ${response.statusCode} | Time: ${Math.round(
            response.timings.end
          ) / 1000} seconds`
        );
        const search = new SearchTerm(searchTerm);
        if (page === 1) {
          search.save();
        }
        const allMedia = JSON.parse(body);
        if (allMedia.Response === "True")
          res.render("results", { allMedia, searchTerm, page });
        else res.render("noResult", { searchTerm });
      }
    }
  );
};
