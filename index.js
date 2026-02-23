const fs = require('fs');
const axios = require('axios');

async function updateIPTV() {
    console.log("Starting process...");
    try {
        const response = await axios.get('https://oxax.tv/api/links');
        const channels = response.data;
        console.log("Fetched " + channels.length + " channels.");
        
        let m3uContent = '#EXTM3U\n';
        channels.forEach((ch) => {
            m3uContent += "#EXTINF:-1 tvg-name=\"" + ch.name + "\"," + ch.name + "\n" + ch.stream_url + "\n";
        });

        fs.writeFileSync('playlist.m3u', m3uContent);
        console.log("Success: playlist.m3u created!");
    } catch (error) {
        console.error("Error:", error.message);
    }
}

updateIPTV();
