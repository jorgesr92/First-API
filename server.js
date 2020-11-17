const express = require("express");
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
const fs = require('fs');



const albumsData = require("./albums-data.json");
  
  app.get("/albums", (req, res) => {
    res.send(albumsData);
  });

  app.get("/albums/:albumid", (req, res) => {
    const id = req.params.albumid;
    const album = albumsData.filter(el => el.albumId === id);
    res.json(album);
  });

  app.post("/albums", (req, res) => {
    const newAlbum = req.body;
    albumsData.push(newAlbum);
    res.send("POST /albums route");
    fs.writeFile("./albums-data.json", JSON.stringify(albumsData), ()=>{});
    console.log("POST /albums route");
  });

  app.delete("/albums/:albumid", (req, res) => {
    const id = req.params.albumid;
    const album = albumsData.filter(el => el.albumId === id);
    const index = albumsData.indexOf(album[0]);
    albumsData.splice(index, 1);
    fs.writeFile("./albums-data.json", JSON.stringify(albumsData), ()=>{});
    console.log("DELETE /albums route");
    res.status(200).json({succes: true});
  });

  /* app.get("/songs", function (req, res) {
    res.json(albumsData);
  });
 */



//Start our server so that it listens for HTTP requests!
const listener = app.listen(4000, function () {
    console.log("Your app is listening on port " + listener.address().port);
  });