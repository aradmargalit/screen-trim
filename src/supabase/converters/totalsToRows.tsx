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
  const dailyAverageMin = minutesLogged / daysSinceChallengeStart;
  const overUnder = dailyAverageMin - 60; // target 60 minutes per day
  const overUnderColor = overUnder >= 1 ? 'red' : 'green';

  return [
    { data: total.name },
    { data: minutesLogged, renderFn: () => <NumberTransition end={minutesLogged} duration={10} /> },
    { data: dailyAverageMin },
    {
      data: overUnder,
      textColor:
        // Tailwind is insane and doesn't allow for dynamic styles...fix this later
        overUnderColor === 'red' ? 'text-red-600, dark:text-red-600' : 'text-green-600, dark:text-green-600',
    },
  ];
}
