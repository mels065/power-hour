const express = require('express');
const fs = require('fs');
const path = require('path');
const parse = require('csv-parse/lib/sync');

require('dotenv').config();

const app = express();

const MILLISECONDS_IN_HOUR = 3600000;

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
  if (!currentDate || new Date() - currentDate >= MILLISECONDS_IN_HOUR) {
    currentDate = new Date();
    getRandomVideoUrl();
  }

  res.send(
    `<p>Get ready...for an hour of power!!</p>
    <script>
      setTimeout(() => window.location.href = "${currentVideoUrl}", 3000);
    </script>`
  );
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`)
});
