const fs = require("fs");

//Write into a file sync
fs.writeFileSync("./fila.txt", "Hello im here");
//aysnc
// fs.writeFileSync("./fila.txt", "Hello im here", () => {});

//read sync.- not blocking code
const data = fs.readFileSync("./fila.txt", "utf-8");
console.log(data);

//read async.- blocking code
// fs.readFile("./fila.txt", "utf-8", (error, result) => {
//   if (error) {
//     console.log("error", error);
//   } else {
//     console.log(result);
//   }
// });
fs.appendFileSync("./fila.txt", "hello \n");
fs.cpSync("./fila.txt", "./copy");
fs.unlinkSync("./copy.txt");
