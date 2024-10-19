import express from "express";
import path from 'path'

const __dirname = import.meta.dirname;

function pathMaker(string){
  return path.join(__dirname, string);
}

const app = express();
const port = 8080;

app.get("/", (req, res) => {
  res.sendFile(pathMaker("index.html"));
});

app.get("*", (req, res) => {
  res.sendFile(pathMaker(`${req.path}.html`), (err) => {
    if (err) {
      res.status(404).sendFile(pathMaker("404.html"), (err) => {
        if (err) {
          res.status(500).send("<h1>500 Internal Server Error</h1>");
        }
      });
    }
  });
});

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
