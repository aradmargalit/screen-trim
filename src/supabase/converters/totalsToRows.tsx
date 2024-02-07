import Link from 'next/link';

import NumberTransition from '@/components/NumberTransition';
import { TableRow } from '@/types/tableTypes';

import { fetchTotals } from '../fetchTotals';

type Totals = Awaited<ReturnType<typeof fetchTotals>>;

export function totalsToRows(totals: Totals): TableRow[] {
  return totals.map(totalToRow);
}

const daysSinceChallengeStart = Math.floor((Date.now() - Date.parse('2024-02-01')) / 86400000) + 1;

function totalToRow(total: Totals[number]): TableRow {
  const minutesLogged = total.minutes_logged?.minutes_logged ?? 0;
  const dailyAverage = minutesLogged / daysSinceChallengeStart;
  const overUnder = dailyAverage - 60; // target 60 minutes per day
  const overUnderColor = overUnder >= 1 ? 'red' : 'green';
  const maxRemainingDailyAverage = getMaxRemainingDailyAverage(minutesLogged, daysSinceChallengeStart);

  return [
    {
      data: total.name,
      renderFn: () => (
        <Link href={`/${total.id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
          {total.name}
        </Link>
      ),
    },
    {
      data: minutesLogged,
      renderFn: () => <NumberTransition end={minutesLogged} duration={5} />,
    },
    { data: dailyAverage, renderFn: () => dailyAverage.toFixed(2) },
    {
      data: overUnder,
      renderFn: () => overUnder.toFixed(2),
      textColor:
        // Tailwind is insane and doesn't allow for dynamic styles...fix this later
        overUnderColor === 'red' ? 'text-red-600, dark:text-red-600' : 'text-green-600, dark:text-green-600',
    },
    {
      data: maxRemainingDailyAverage,
    },
  ];
}

function getMaxRemainingDailyAverage(minutesLogged: number, daysSinceChallengeStart: number): number {
  const totalChallengeDays = 29;
  const remainingChallengeDays = totalChallengeDays - daysSinceChallengeStart;

  const targetFinalMinutes = 60 * totalChallengeDays;

  const remainingMinutesBudget = targetFinalMinutes - minutesLogged;
  return Math.floor(remainingMinutesBudget / remainingChallengeDays);
}
