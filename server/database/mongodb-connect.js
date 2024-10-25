import mongoose from "mongoose";

export default function connect() {
  const database = "mongodb+srv://bea:H52I1t50zCuku6AI@todocluster.okwn6.mongodb.net/?retryWrites=true&w=majority&appName=TodoCluster";
  
  mongoose
    .connect(database)
    .then(() => {
      console.log("Connected to database");
    })
    .catch((error) => {
      console.log(error);
    });
}
