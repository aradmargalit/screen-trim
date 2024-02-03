import { Participant } from '@/types/participant';

// TODO: move to dynamic:
const participants: Participant[] = [
  { name: 'Amber', week1: 0 },
  { name: 'Anya', week1: 0 },
  { name: 'Arad', week1: 99 },
  { name: 'Eshed', week1: 0 },
  { name: 'Yotam', week1: 0 },
];

type TableCell = { data: string | number; textColor?: string };
type TableRow = TableCell[];

const headers = ['Participant', 'Week 1 Total', 'Daily Average', '+/- target'];
const rows: TableRow[] = participants.map((p) => {
  const dailyAverageMin = p.week1 / 4; // 4 days in first week of Feb
  const overUnder = dailyAverageMin - 60; // target 60 minutes per day
  const overUnderColor = overUnder >= 1 ? 'red' : 'green';

  return [
    { data: p.name },
    { data: p.week1 },
    { data: dailyAverageMin },
    {
      data: overUnder,
      textColor:
        // Tailwind is insane and doesn't allow for dynamic styles...fix this later
        overUnderColor === 'red' ? 'text-red-600, dark:text-red-600' : 'text-green-600, dark:text-green-600',
    },
  ];
});

export default function Home() {
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
