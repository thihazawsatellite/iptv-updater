const fs = require('fs');
const axios = require('axios');

const channels = [
    { name: "Oh Ah", url: "http://oxax.tv/oh-ah.html" },
    { name: "SL Hot 1", url: "http://oxax.tv/sl-hot1.html" },
    { name: "SL Hot 2", url: "http://oxax.tv/sl-hot2.html" },
    { name: "Brazzers TV Europe", url: "http://oxax.tv/brazzers-tv-europe.html" },
    { name: "Brazzers TV", url: "http://oxax.tv/brazzers-tv.html" },
    { name: "Red Lips", url: "http://oxax.tv/red-lips.html" },
    { name: "Kino XXX", url: "http://oxax.tv/kino-xxx.html" },
    { name: "XY Max HD", url: "http://oxax.tv/xy-max-hd.html" },
    { name: "XY Plus HD", url: "http://oxax.tv/xy-plus-hd.html" },
    { name: "XY Mix HD", url: "http://oxax.tv/xy-mix-hd.html" },
    { name: "Barely Legal", url: "http://oxax.tv/barely-legal.html" },
    { name: "Playboy TV", url: "http://oxax.tv/playboy-tv.html" },
    { name: "Vivid Red", url: "http://oxax.tv/vivid-red.html" },
    { name: "Hot Pleasure", url: "http://oxax.tv/hot-pleasure.html" },
    { name: "Babes TV", url: "http://oxax.tv/babes-tv.html" },
    { name: "Russkaya Noch", url: "http://oxax.tv/russkaya-noch.html" },
    { name: "Pink O", url: "http://oxax.tv/pink-o.html" },
    { name: "Erox HD", url: "http://oxax.tv/erox-hd.html" },
    { name: "Eroxxx HD", url: "http://oxax.tv/eroxxx-hd.html" },
    { name: "Hustler HD", url: "http://oxax.tv/hustler-hd.html" },
    { name: "Private TV", url: "http://oxax.tv/private-tv.html" },
    { name: "Redlight HD", url: "http://oxax.tv/redlight-hd.html" },
    { name: "Penthouse Gold", url: "http://oxax.tv/penthouse-gold.html" },
    { name: "Penthouse 2", url: "http://oxax.tv/penthouse-2.html" },
    { name: "O La La", url: "http://oxax.tv/o-la-la.html" },
    { name: "Blue Hustler", url: "http://oxax.tv/blue-hustler.html" },
    { name: "Shalun", url: "http://oxax.tv/shalun.html" },
    { name: "Dorcel TV", url: "http://oxax.tv/dorcel-tv.html" },
    { name: "Extasy HD", url: "http://oxax.tv/extasyhd.html" },
    { name: "XXL", url: "http://oxax.tv/xxl.html" },
    { name: "Fap TV 2", url: "http://oxax.tv/fap-tv-2.html" },
    { name: "Fap TV 3", url: "http://oxax.tv/fap-tv-3.html" },
    { name: "Fap TV 4", url: "http://oxax.tv/fap-tv-4.html" },
    { name: "Fap TV Parody", url: "http://oxax.tv/fap-tv-parody.html" },
    { name: "Fap TV Compilation", url: "http://oxax.tv/fap-tv-compilation.html" },
    { name: "Fap TV Anal", url: "http://oxax.tv/fap-tv-anal.html" },
    { name: "Fap TV Teens", url: "http://oxax.tv/fap-tv-teens.html" },
    { name: "Fap TV Lesbian", url: "http://oxax.tv/fap-tv-lesbian.html" },
    { name: "Fap TV BBW", url: "http://oxax.tv/fap-tv-bbw.html" },
    { name: "Fap TV Trans", url: "http://oxax.tv/fap-tv-trans.html" }
];

async function scrapeLinks() {
    let m3uContent = "#EXTM3U\n";
    for (const ch of channels) {
        try {
            const response = await axios.get(ch.url, {
                headers: { 'User-Agent': 'Mozilla/5.0' }
            });
            const match = response.data.match(/var kodk="(.*?)";/);
            if (match && match[1]) {
                const streamLink = "http://oxax.tv/" + match[1];
                // Player က သိအောင် User-Agent နဲ့ Referer ပါ တစ်ခါတည်း တွဲထည့်မယ်
                m3uContent += "#EXTINF:-1 tvg-name=\"" + ch.name + "\"," + ch.name + "|http-user-agent=Mozilla/5.0&http-referer=http://oxax.tv/\n" + streamLink + "\n";
            }
        } catch (e) { }
    }
    fs.writeFileSync('playlist.m3u', m3uContent);
    console.log("Updated with headers for video loading!");
}
scrapeLinks();
