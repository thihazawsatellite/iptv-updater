const fs = require('fs');
const axios = require('axios');

const channels = [
    { name: "Oh Ah", url: "http://oxax.tv/oh-ah.html" },
    { name: "SL Hot 1", url: "http://oxax.tv/sl-hot1.html" },
    { name: "SL Hot 2", url: "http://oxax.tv/sl-hot2.html" },
    { name: "Brazzers TV Europe", url: "http://oxax.tv/brazzers-tv-europe.html" },
    { name: "Brazzers TV", url: "http://oxax.tv/brazzers-tv.html" },
    { name: "Red Lips", url: "http://oxax.tv/red-lips.html" },
    { name: "Hustler HD", url: "http://oxax.tv/hustler-hd.html" },
    { name: "Private TV", url: "http://oxax.tv/private-tv.html" }
];

async function scrapeLinks() {
    let m3uContent = "#EXTM3U\n";
    const agent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36';

    for (const ch of channels) {
        try {
            const response = await axios.get(ch.url, {
                headers: { 'User-Agent': agent }
            });
            
            // kodk variable ကို ရှာတာ ပိုတိကျအောင် ပြင်ထားတယ်
            const match = response.data.match(/var kodk="(.*?)";/);
            if (match && match[1]) {
                const streamPart = match[1]; // ဥပမာ: 1/index.m3u8?k=...
                const finalLink = "https://s.oxax.tv/" + streamPart;
                
                m3uContent += "#EXTINF:-1 tvg-name=\"" + ch.name + "\"," + ch.name + "\n";
                // Header တွေကို Player က သိအောင် format နှစ်မျိုးလုံး တွဲပေးထားတယ်
                m3uContent += "#EXTVLCOPT:http-user-agent=" + agent + "\n";
                m3uContent += "#EXTVLCOPT:http-referer=http://oxax.tv/\n";
                m3uContent += finalLink + "|User-Agent=" + agent + "&Referer=http://oxax.tv/\n";
                
                console.log("✅ " + ch.name + " link updated.");
            }
        } catch (e) {
            console.log("❌ Error fetching " + ch.name);
        }
    }
    fs.writeFileSync('playlist.m3u', m3uContent);
    console.log("Done! Push this to GitHub now.");
}
scrapeLinks();
