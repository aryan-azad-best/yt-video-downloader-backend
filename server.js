const express = require('express');
const youtubedl = require('youtube-dl-exec'); // For downloading videos/audio
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));

app.get("/download", (req, res) => {
    const url = req.query.url;
    const format = req.query.format || "mp4";
    const resolution = req.query.resolution || "1080p";

    if (!url) {
        return res.status(400).send("URL is required");
    }

    const options = {
        format: format,
        output: path.join(__dirname, 'downloads', '%(title)s.%(ext)s'),
    };

    youtubedl(url, options)
        .then(output => {
            res.send(output);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send("Error downloading the video");
        });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
