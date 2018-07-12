const express = require('express');
const fs = require('fs');
const path = require('path');
const parse = require('csv-parse/lib/sync');

require('dotenv').config();

const app = express();

const MILLISECONDS_IN_DAY = 86400000;

let currentVideoUrl;
let currentDate;

function getRandomNumber(size) {
  return Math.floor(Math.random() * size);
}

function getRandomVideoUrl() {
  const videos = parse(fs.readFileSync(path.join(__dirname, 'videos.csv')));
  currentVideoUrl = videos[getRandomNumber(videos.length)];
}

app.get('/', (req, res) => {
  getRandomVideoUrl()
  res.send(currentVideoUrl)
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`)
});
