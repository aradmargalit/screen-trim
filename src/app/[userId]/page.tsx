import { revalidatePath } from 'next/cache';
import { notFound, redirect } from 'next/navigation';

import { supabase } from '@/supabase/client';

import UpdateMinutesLoggedInput from './UpdateMinutesLoggedInput';

async function fetchUserDetail({ userId }: { userId: string }) {
  return supabase.from('users').select('id, name, minutes_logged (minutes_logged)').eq('id', userId).single();
}

export default async function Page({ params }: { params: { userId: string } }) {
  async function updateMinutesLogged(newValue: number) {
    'use server';
    const { error } = await supabase
      .from('minutes_logged')
      .update({ minutes_logged: newValue })
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

  return (
    <div>
      <h1 className="text-xl">Welcome, {data.name}</h1>
      <h2>
        You have logged <strong>{data.minutes_logged?.minutes_logged ?? 0}</strong> minutes in February
      </h2>
      <UpdateMinutesLoggedInput startingValue={minutesLogged} onSubmit={updateMinutesLogged} />
    </div>
  );
}
