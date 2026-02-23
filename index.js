const fs = require('fs');
const axios = require('axios');
const admin = require('firebase-admin');

if (!admin.apps.length) {
    try {
        const serviceAccount = require('./serviceAccountKey.json');
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
    } catch (e) {
        admin.initializeApp();
    }
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
            const docRef = db.collection('channels').doc(String(docId));
            batch.set(docRef, {
                name: ch.name,
                stream_url: ch.stream_url,
                updated_at: admin.firestore.FieldValue.serverTimestamp()
            }, { merge: true });
        });

        fs.writeFileSync('playlist.m3u', m3uContent);
        await batch.commit();
        console.log("Success: playlist.m3u created!");
    } catch (error) {
        console.error("Error:", error.message);
    }
}
updateIPTV();
