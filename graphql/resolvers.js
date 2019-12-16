const path = require("path");
const walkSync = require("walk-sync");

const paths = walkSync(path.join(__dirname));
let dirPathSplit, fileName;
let queries = {
  RootQuery: {},
  RootMutation: {}
};
paths.forEach(p => {
  dirPathSplit = p.split("/");
  dirPathSplit.forEach((item, i) => {
    if (item === "queries" && p.split(".")[1] === "js") {
      fileName = dirPathSplit[2].split(".")[0];
      switch (fileName) {
        case "fields":
          queries = {
            ...queries,
            ...require(`./${p}`)
          };
          break;
        case "mutations":
          queries = {
            ...queries,
            RootMutation: {
              ...queries.RootMutation,
              ...require(`./${p}`)
            }
          };
          break;
        case "root":
          queries = {
            ...queries,
            RootQuery: {
              ...queries.RootQuery,
              ...require(`./${p}`)
            }
          };
          break;
      }
    }
  });
});

module.exports = queries;
