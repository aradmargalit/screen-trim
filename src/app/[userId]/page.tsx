import { revalidatePath } from 'next/cache';
import { notFound, redirect } from 'next/navigation';

import { supabase } from '@/supabase/client';

import LastUpdated from './LastUpdated';
import UpdateMinutesLoggedInput from './UpdateMinutesLoggedInput';

async function fetchUserDetail({ userId }: { userId: string }) {
  return supabase
    .from('users')
    .select('id, name, minutes_logged (minutes_logged, updated_at)')
    .eq('id', userId)
    .single();
}

export default async function Page({ params }: { params: { userId: string } }) {
  async function updateMinutesLogged(newValue: number) {
    'use server';
    const { error } = await supabase
      .from('minutes_logged')
      .update({ minutes_logged: newValue, updated_at: new Date().toISOString() })
      .eq('user_id', params.userId);

    if (error) {
      console.error(error);
      throw new Error(error.message);
    }

    // cheap way to revalidate all paths, it's a small app, sue me
    revalidatePath('/', 'layout');
    redirect('/');
  }

  const { error, data } = await fetchUserDetail({ userId: params.userId });
  if (error) {
    console.error(error.message);
    return notFound();
  }

  const minutesLogged = data.minutes_logged?.minutes_logged ?? 0;
  const lastUpdate = data.minutes_logged?.updated_at;

  return (
    <div>
      <h1 className="text-xl">Welcome, {data.name}</h1>
      <h2>
        You have logged <strong>{minutesLogged}</strong> minutes in February
      </h2>
      <LastUpdated lastUpdated={lastUpdate} />
      <UpdateMinutesLoggedInput startingValue={minutesLogged} onSubmit={updateMinutesLogged} />
    </div>
  );
}
