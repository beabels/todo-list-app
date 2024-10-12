import express from "express"
import router from './routes/todos.js';

const app = express();

const port = 3000;

app.get("/", (req, res) => {
    res.send("Hello Todo App!!!");
});

app.use('/api', router);

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});