const fs = require("fs");
const path = require("path");

const dataFile = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "searchTerms.json"
);

const getSearchTermsFromFile = cb => {
  fs.readFile(dataFile, (err, fileContent) => {
    if (err) {
      cb([]);
      console.log(err);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class SearchTerm {
  constructor(search) {
    this.search = search;
    this.count = 1;
  }

  save() {
    getSearchTermsFromFile(searchTerms => {
      let flag = true;
      searchTerms.forEach(term => {
        if (term.search === this.search) {
          term.count++;
          flag = false;
        }
      });
      if (flag) {
        searchTerms.push(this);
      }
      fs.writeFile(dataFile, JSON.stringify(searchTerms), err =>
        console.log(err)
      );
    });
  }

  static getAll(cb) {
    getSearchTermsFromFile(cb);
  }
};
