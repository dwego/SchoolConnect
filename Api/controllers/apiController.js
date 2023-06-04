const express = require("express");
const path = require("path");
const app = express();

const port = 8000;
const apiController = () => {
  app.get("/api/data.json", async (req, res) => {
    const data = await path.join(__dirname, "../api/data.json");

    res.sendFile(data);
  });

  app.listen(port, () => {
    console.log("Server running in port", port);
  });
};

module.exports = apiController;
