import { createClient } from '@supabase/supabase-js';

import { Database } from '../../database.types';

export async function fetchTotals() {
  // Create a single supabase client for interacting with your database
  const supabase = createClient<Database>(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);

  const { data, error } = await supabase.from('users').select(
    `
    name
    ,weekly_totals (minutes_logged, weeks
       (week_number, days_in_week)
      )
    `
  );

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
}
