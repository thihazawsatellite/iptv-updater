const fs = require('fs');
const axios = require('axios');

const channels = [
    { name: "Oh Ah", url: "http://oxax.tv/oh-ah.html" },
    { name: "SL Hot 1", url: "http://oxax.tv/sl-hot1.html" },
    { name: "SL Hot 2", url: "http://oxax.tv/sl-hot2.html" },
    { name: "Brazzers TV", url: "http://oxax.tv/brazzers-tv.html" },
    { name: "Hustler HD", url: "http://oxax.tv/hustler-hd.html" },
    { name: "Private TV", url: "http://oxax.tv/private-tv.html" }
];

async function scrapeLinks() {
    let m3uContent = "#EXTM3U\n";
    console.log("Scraping...");
    for (const ch of channels) {
        try {
            const response = await axios.get(ch.url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
            const match = response.data.match(/var kodk="(.*?)";/);
            if (match && match[1]) {
                m3uContent += "#EXTINF:-1 tvg-name=\"" + ch.name + "\"," + ch.name + "\nhttp://oxax.tv/" + match[1] + "\n";
                console.log("✅ " + ch.name);
            }
        } catch (e) { console.log("❌ " + ch.name); }
    }
    fs.writeFileSync('playlist.m3u', m3uContent);
    console.log("Success: playlist.m3u created!");
}
scrapeLinks();
