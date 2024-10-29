import express from "express";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import connect from "./database/mongodb-connect.js";
 
import router from "./routes/todos.js";
import usersRouter from "./routes/users.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = path.resolve(__dirname, ".."); 

const app = express();
const port = 3000;
 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
 
app.use(express.static(path.join(projectRoot, "frontend")));
 
app.use("/api", router);
app.use("/api", usersRouter);
 
app.get("/login", (req, res) => {
  res.sendFile(join(projectRoot, "frontend", "login.html"));
});

app.get("/edit-todo", (req, res) => {
  res.sendFile(join(projectRoot, "frontend", "edit-todo.html"));
});

app.get("/todo-list", (req, res) => {
  res.sendFile(join(projectRoot, "frontend", "todo-list.html"));
});


app.get("*", (req, res) => {
  res.status(404).sendFile(join(projectRoot, "frontend", "404.html"));
});

connect();

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
