const fs = require("fs");

module.exports = (router) => {
  fs.readdirSync(__dirname).forEach((file) => {
    if (file === "index.js") return;
    router.use(`/${file}`.replace(".js", ""), require(`./${file}`).routes());
  });
};
