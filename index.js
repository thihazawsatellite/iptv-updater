const fs = require('fs');

// မိတ်ဆွေရဲ့ Cloudflare Worker Base Link
const workerUrl = "https://oxax-proxy.thihazawsatellite.workers.dev/?id=";

// အလုပ်လုပ်မယ့် Channel ID တွေနဲ့ နာမည်တွေ
const channels = [
    { name: "Ox-Ax HD", id: "oh-ah" },
    { name: "Brazzers TV", id: "brazzers" },
    { name: "Private TV", id: "private" },
    { name: "Kino XXX", id: "kino" }
];

function generateM3U() {
    let m3uContent = "#EXTM3U\n";

    channels.forEach(channel => {
        m3uContent += `#EXTINF:-1,${channel.name}\n`;
        // ဒီနေရာမှာ Worker Link နဲ့ ID ကို ပေါင်းပေးလိုက်တာပါ
        m3uContent += `${workerUrl}${channel.id}\n`;
    });

    fs.writeFileSync('playlist.m3u', m3uContent);
    console.log("M3U Playlist Updated!");
}

generateM3U();
