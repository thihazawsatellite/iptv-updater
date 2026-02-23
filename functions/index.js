const { onSchedule } = require("firebase-functions/v2/scheduler");
const admin = require("firebase-admin");
const axios = require("axios");

admin.initializeApp();

exports.syncOxaxChannels = onSchedule("every 1 hours", async (event) => {
  const db = admin.firestore();
  
  try {
    // oxax.tv ရဲ့ data source (JSON) ကို ဒီမှာယူပါမယ်
    const response = await axios.get("https://oxax.tv/api/links"); 
    const channels = response.data; 

    const batch = db.batch();

    channels.forEach((ch) => {
      // Channel တစ်ခုချင်းစီကို Database ထဲမှာ Update လုပ်မယ်
      // ID မရှိရင် နာမည်ကို ID အဖြစ် ပြောင်းသုံးပါမယ်
      const docId = ch.id || ch.name.replace(/\s+/g, '-').toLowerCase();
      const docRef = db.collection("channels").doc(docId);
      
      batch.set(docRef, {
        name: ch.name,
        stream_url: ch.url,
        updated_at: admin.firestore.FieldValue.serverTimestamp()
      }, { merge: true });
    });

    await batch.commit();
    console.log("Channels synced successfully to Firebase!");
  } catch (error) {
    console.error("Sync Error:", error);
  }
});
