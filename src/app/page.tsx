import { fetchTotals } from '@/supabase/fetchTotals';

type TableCell = { data: string | number; textColor?: string };
type TableRow = TableCell[];

const headers = ['Participant', 'Week 1 Total', 'Daily Average', '+/- target'];

export default async function Home() {
  const totals = await fetchTotals();
  const rows: TableRow[] = totals.map((total) => {
    // TODO expand logic to multi-week
    const week1 = total.weekly_totals[0];
    const minutesLogged = week1?.minutes_logged ?? 0;
    const dailyAverageMin = minutesLogged / (week1?.weeks?.days_in_week ?? 1);
    const overUnder = dailyAverageMin - 60; // target 60 minutes per day
    const overUnderColor = overUnder >= 1 ? 'red' : 'green';

    return [
      { data: total.name! },
      { data: minutesLogged },
      { data: dailyAverageMin },
      {
        data: overUnder,
        textColor:
          // Tailwind is insane and doesn't allow for dynamic styles...fix this later
          overUnderColor === 'red' ? 'text-red-600, dark:text-red-600' : 'text-green-600, dark:text-green-600',
      },
    ];
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="shadow-sm overflow-hidden my-8">
        <table className="border-collapse table-auto w-full text-sm">
          <thead>
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-slate-800">
            {rows.map((row) => (
              <tr key={row[0].data}>
                {row.map((datum) => (
                  <td
                    key={datum.data}
                    className={`border-b border-slate-100 dark:border-slate-700 p-4 pl-8 ${
                      datum.textColor ?? 'text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {datum.data}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
