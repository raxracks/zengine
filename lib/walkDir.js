const { readdirSync, statSync } = require("fs");

module.exports.walk = function (dir) {
  let results = [];
  let list = readdirSync(dir);
  list.forEach(function (file) {
    file = dir + "/" + file;
    let stat = statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(module.exports.walk(file));
    } else {
      results.push(file);
    }
  });
  return results;
};
