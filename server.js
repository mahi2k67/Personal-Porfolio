const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/mydb")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const UserSchema = new mongoose.Schema({
  name: String,
  role: String,
  skill: String
});

const User = mongoose.model("User", UserSchema);

app.post("/add", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.send("User added");
});

app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});