const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function check() {
  const { data: oData, error: oError } = await supabase.from('orders').select('*').limit(1);
  console.log("Orders:", oError ? oError.message : "Exists");

  const { data: aData, error: aError } = await supabase.from('addresses').select('*').limit(1);
  console.log("Addresses:", aError ? aError.message : "Exists");
  
  const { data: pData, error: pError } = await supabase.from('profiles').select('*').limit(1);
  console.log("Profiles:", pError ? pError.message : "Exists");
}

check();
