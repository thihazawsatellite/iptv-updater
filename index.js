const fs = require('fs');
const axios = require('axios');
const admin = require('firebase-admin');

if (!admin.apps.length) {
    admin.initializeApp();
}
const db = admin.firestore();

async function updateIPTV() {
    try {
        const response = await axios.get('https://oxax.tv/api/links');
        const channels = response.data;
        
        let m3uContent = '#EXTM3U\n';
        const batch = db.batch();

        channels.forEach((ch) => {
            m3uContent += "#EXTINF:-1 tvg-name=\"" + ch.name + "\"," + ch.name + "\n" + ch.stream_url + "\n";
            
            const docId = ch.id || ch.name.replace(/\s+/g, '-').toLowerCase();
            const docRef = db.collection('channels').doc(docId);
            batch.set(docRef, {
                name: ch.name,
                stream_url: ch.stream_url,
                updated_at: admin.firestore.FieldValue.serverTimestamp()
            }, { merge: true });
        });

        // ဤနေရာတွင် ဖိုင်ကို သိမ်းဆည်းခြင်း ဖြစ်သည်
        fs.writeFileSync('playlist.m3u', m3uContent);
        await batch.commit();
        
        console.log("Successfully updated Firebase and playlist.m3u!");
    } catch (error) {
        console.error("Update Error:", error);
    }
}

updateIPTV();
