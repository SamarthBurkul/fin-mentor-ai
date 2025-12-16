const express=require('express')
const cors = require("cors");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/chat", async (req, res) => {
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
