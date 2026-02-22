import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  // Supabase နဲ့ ချိတ်ဆက်ဖို့ ပြင်ဆင်ခြင်း
  const supabaseUrl = Deno.env.get('SUPABASE_URL')!
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  const supabase = createClient(supabaseUrl, supabaseKey)

  const targetUrl = "http://oxax.tv/oh-ah.html";
  
  try {
    const response = await fetch(targetUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0' }
    });
    const html = await response.text();
    
    // HTML ထဲက Link ကို ရှာဖွေခြင်း
    const match = html.match(/var kodk="(.*?)";/);

    if (match && match[1]) {
      const finalUrl = `https://s.oxax.tv/${match[1]}`;
      
      // Database ထဲမှာ Link သွားအပ်ဒိတ်လုပ်ခြင်း
      const { error } = await supabase
        .from('channels')
        .update({ stream_url: finalUrl, updated_at: new Date() })
        .eq('name', 'OX-AX HD');

      if (error) throw error;
      return new Response(`Updated: ${finalUrl}`, { status: 200 });
    }
    
    return new Response("Link not found in HTML", { status: 404 });
  } catch (err) {
    return new Response(err.message, { status: 500 });
  }
})
