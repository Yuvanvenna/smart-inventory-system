// const fs = require("fs");
// const path = require("path");

// const readJSON = (fileName) => {
//   const filePath = path.join(__dirname, "..", "data", fileName);
//   const data = fs.readFileSync(filePath, "utf-8");
//   return JSON.parse(data);
// };

// const writeJSON = (fileName, data) => {
//   const filePath = path.join(__dirname, "..", "data", fileName);
//   fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
// };

// module.exports = { readJSON, writeJSON };
const fs = require("fs");
const path = require("path");

const readJSON = (fileName) => {
  const filePath = path.join(__dirname, "..", "data", fileName);

  if (!fs.existsSync(filePath)) {
    return [];
  }

  const data = fs.readFileSync(filePath, "utf-8");

  if (!data) {
    return [];
  }

  return JSON.parse(data);
};

const writeJSON = (fileName, data) => {
  const filePath = path.join(__dirname, "..", "data", fileName);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

module.exports = { readJSON, writeJSON };
