const express = require("express");
const app = express();
app.use(express.json());

let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true,
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

app.get("/", (req, res) => {
  console.log(req.url);
  res.send("<h1>hello world</h1>");
});

//route for all the resource
app.get("/api/notes", (req, res) => {
  res.json(notes);
});

//route for fetching a single resource
app.get("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  const note = notes.find((note) => note.id === id);
  if (note) {
    res.json(note);
  } else {
    res.status(404).end();
  }
});

//route for deleting a single resource
app.delete("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  notes = notes.filter((note) => {
    note.id !== id;
  });
  res.status(204).end();
});

//route for adding resource
app.post("/api/notes", (req, res) => {
  const note = req.body;
  console.log(note);
  res.json(note);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
