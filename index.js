import { readFile } from "fs";
import { createServer } from "http";

const server = createServer((req, res) => {
  let filePath;
  req.url === "/"
    ? (filePath = "./index.html")
    : (filePath = `.${req.url}.html`);

  readFile(filePath, (err, data) => {
    if (err) {
      readFile("./404.html", (err404, data404) => {
        if (err404) {
          res.writeHead(500, { "Content-Type": "text/html" });
          res.end("<h1>500 Internal Server Error</h1>");
          return;
        }
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end(data404);
      });
      return;
    }
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  });
});

server.listen(8080);
