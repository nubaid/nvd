const path = require("path");
const walk = require("walk");

const models = require("../models");

const walker = walk.walk(path.join(__dirname));
const loaders = {};

const lowerFirstLetter = str => str.charAt(0).toLowerCase() + str.slice(1);

let dirPath, dirName, dirSplit, fileName, requirePath;
walker.on("file", (root, stats, next) => {
  dirPath = root.substring(root.indexOf(__dirname));
  dirName = dirPath.split("/").slice(-1)[0];
  dirSplit = dirPath.split("/");
  if (dirName === "loaders") {
    fileName = stats.name.split(".")[0];
    requirePath = `./${dirSplit[dirSplit.length - 2]}/${
      dirSplit[dirSplit.length - 1]
    }/${fileName}`;
    loaders[lowerFirstLetter(fileName)] = require(requirePath)(models);
  }
  next();
});

module.exports = loaders;
