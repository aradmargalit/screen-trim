import { supabase } from './client';

export async function fetchTotals() {
  const { data, error } = await supabase.from('users').select(
    `
    id, name, minutes_logged (minutes_logged)
    `
  );

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
}
