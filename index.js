const fs = require('fs');

const workerUrl = "https://oxax-proxy.thihazawsatellite.workers.dev/?id=";

const channels = [
    { name: "Oh Ah", id: "oh-ah" },
    { name: "Brazzers TV", id: "brazzers" },
    { name: "Private TV", id: "private" },
    { name: "Kino XXX", id: "kino" }
];

function generateM3U() {
    let m3uContent = "#EXTM3U\n";
    channels.forEach(ch => {
        m3uContent += `#EXTINF:-1,${ch.name}\n${workerUrl}${ch.id}\n`;
    });
    fs.writeFileSync('playlist.m3u', m3uContent);
}

generateM3U();
