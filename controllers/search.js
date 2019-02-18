const SearchTerm = require("../models/searchTerm");

exports.getSearches = (req, res) => {
  SearchTerm.getAll(searchTerms => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(searchTerms));
  });
};
