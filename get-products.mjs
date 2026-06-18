import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

// Read .env.local for Supabase keys
const envFile = fs.readFileSync('.env.local', 'utf8');
const env = envFile.split('\n').reduce((acc, line) => {
  const [key, ...value] = line.split('=');
  if (key) acc[key.trim()] = value.join('=').trim().replace(/"/g, '');
  return acc;
}, {});

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function checkProducts() {
  const { data, error } = await supabase.from('products').select('*');
  if (error) console.error(error);
  console.log(JSON.stringify(data, null, 2));
}

checkProducts();
