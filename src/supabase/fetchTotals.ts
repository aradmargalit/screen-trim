import { createClient } from '@supabase/supabase-js';

import { Database } from '../../database.types';

export async function fetchTotals() {
  // Create a single supabase client for interacting with your database
  const supabase = createClient<Database>(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);

  const { data, error } = await supabase.from('users').select(
    `
    name, minutes_logged (minutes_logged)
    `
  );

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
}
