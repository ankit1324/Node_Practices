const fs = require("fs");

function logReqRes(filename) {
  return (req, res, next) => {
    fs.appendFile(
      filename,
      `\n ${Date.now()}:${req.ip} - ${req.method}: ${req.path} \n`,
      (err) => {
        if (err) {
          console.error("Error appending to file:", err);
        }
        next();
      }
    );
  };
}

module.exports = {
  logReqRes,
};
