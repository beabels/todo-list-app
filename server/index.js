import express from "express";
import connect from "./database/mongodb-connect.js";
 
import router from "./routes/todos.js";
import usersRouter from "./routes/users.js";
 
const app = express();
const port = 3000;
 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
 
app.use(express.static("public"));
 
app.use("/api", router);
app.use("/api", usersRouter);
 
app.get("/", (req, res) => {
  res.send("Hello Todo App!!!");
});
 
connect();
 
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});