import { totalsToRows } from '@/supabase/converters/totalsToRows';
import { fetchTotals } from '@/supabase/fetchTotals';

type TotalsTableProps = {
  totals: Awaited<ReturnType<typeof fetchTotals>>;
};

const headers = ['Participant', 'Week 1 Total', 'Daily Average', '+/- target'];

export default function TotalsTable({ totals }: TotalsTableProps) {
  const rows = totalsToRows(totals);

  return (
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
            {row.map((datum, i) => (
              <td
                key={`${row[0].data}${datum.data}${i}`}
                className={`border-b border-slate-100 dark:border-slate-700 p-4 pl-8 ${
                  datum.textColor ?? 'text-slate-500 dark:text-slate-400'
                }`}
              >
                {datum.renderFn ? datum.renderFn() : datum.data}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
