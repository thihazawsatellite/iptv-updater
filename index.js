const fs = require('fs');

// မိတ်ဆွေ ဆောက်ထားတဲ့ Cloudflare Worker Link
const workerUrl = "https://oxax-proxy.thihazawsatellite.workers.dev/?id=";

// Channel List များ
const channels = [
    { name: "Ox-Ax HD", id: "oh-ah", logo: "https://i.imgur.com/your-logo-link.png" },
    { name: "Brazzers TV", id: "brazzers", logo: "https://i.imgur.com/your-logo-link.png" },
    { name: "Private TV", id: "private", logo: "https://i.imgur.com/your-logo-link.png" },
    { name: "Kino XXX", id: "kino", logo: "https://i.imgur.com/your-logo-link.png" }
];

// M3U Playlist ဆောက်သည့် Function
function generateM3U() {
    let m3uContent = "#EXTM3U\n";

    channels.forEach(channel => {
        m3uContent += `#EXTINF:-1 tvg-logo="${channel.logo}",${channel.name}\n`;
        // Worker Link နဲ့ Channel ID ကို ပေါင်းပြီး Link ထွက်လာအောင် လုပ်ခြင်း
        m3uContent += `${workerUrl}${channel.id}\n`;
    });

    // playlist.m3u ဆိုတဲ့ ဖိုင်အဖြစ် သိမ်းဆည်းခြင်း
    fs.writeFileSync('playlist.m3u', m3uContent);
    console.log("Playlist has been updated with Cloudflare Proxy!");
}

generateM3U();
